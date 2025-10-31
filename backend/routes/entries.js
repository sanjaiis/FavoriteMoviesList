const express = require('express');
const router = express.Router();
const controller = require('../controllers/entriesController');

router.post('/', controller.createEntry);
router.get('/', controller.listEntries);
router.get('/:id', controller.getEntry);
router.put('/:id', controller.updateEntry);
router.delete('/:id', controller.deleteEntry);

module.exports = router;
