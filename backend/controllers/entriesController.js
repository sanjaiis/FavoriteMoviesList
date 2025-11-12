const mongoose = require('mongoose');
const Entry = require('../models/Entry');

/**
 * Create a new entry
 * POST /api/entries
 */
exports.createEntry = async (req, res, next) => {
  try {
    const payload = req.body;
    const entry = new Entry(payload);
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single entry by id
 * GET /api/entries/:id
 */
exports.getEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const entry = await Entry.findById(id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    res.json(entry);
  } catch (err) {
    next(err);
  }
};

/**
 * Update an entry
 * PUT /api/entries/:id
 */
exports.updateEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const updated = await Entry.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Entry not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete an entry
 * DELETE /api/entries/:id
 */
exports.deleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const deleted = await Entry.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Deleted', id: deleted._id });
  } catch (err) {
    next(err);
  }
};

/**
 * List entries — supports infinite scroll via cursor (lastId) or page/limit fallback.
 * GET /api/entries?limit=20&lastId=<ObjectId>&sort=desc&search=...
 *
 * Behavior:
 * - If lastId provided => returns entries created before that id (descending createdAt)
 * - If no lastId => returns newest entries
 *
 * Response:
 *  {
 *    entries: [...],
 *    nextCursor: "<last entry _id or null>"
 *  }
 */
exports.listEntries = async (req, res, next) => {
  console.log('Listing entries with query:', req.query);
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    console.log('Using limit:', limit);
    const sortDir = req.query.sort === 'asc' ? 1 : -1; // default desc
    const lastId = req.query.lastId;
    const search = req.query.search ? String(req.query.search).trim() : null;
    const type = req.query.type; // optional filter: movie/tv/other

    const filter = {};

    if (type) filter.type = type;

    if (search) {
      // basic text-like search across some fields
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { title: regex },
        { director: regex },
        { genre: regex },
        { notes: regex },
        { userTags: regex },
      ];
    }

    if (lastId && mongoose.isValidObjectId(lastId)) {
      // sorting by createdAt descending by default; use _id as cursor
      // For descending: fetch items with _id < lastId
      if (sortDir === -1) {
        filter._id = { $lt: mongoose.Types.ObjectId(lastId) };
      } else {
        filter._id = { $gt: mongoose.Types.ObjectId(lastId) };
      }
    }

    const entries = await Entry.find(filter)
      .sort({ _id: sortDir })
      .limit(limit + 1); // fetch one extra to see if there's more

    let hasMore = false;
    let sliced = entries;
    if (entries.length > limit) {
      hasMore = true;
      sliced = entries.slice(0, limit);
    }

    const nextCursor = hasMore ? String(sliced[sliced.length - 1]._id) : null;

    res.json({
      entries: sliced,
      nextCursor,
      hasMore,
    });
  } catch (err) {
    next(err);
  }
};
