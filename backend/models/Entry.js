const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['movie', 'tv', 'other'], default: 'movie' },
    director: { type: String, trim: true },
    cast: [{ type: String, trim: true }],
    genre: [{ type: String, trim: true }],
    budget: { type: Number, min: 0 },
    location: { type: String, trim: true }, // e.g., filming or streaming location
    durationMinutes: { type: Number, min: 0 }, // duration in minutes
    yearOrSeason: { type: String, trim: true }, // e.g., "1999" or "S03E01" or "2021-2022"
    rating: { type: Number, min: 0, max: 10 },
    notes: { type: String, trim: true },
    userTags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

// index for efficient cursor queries (sorted by _id or createdAt)
entrySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Entry', entrySchema);
