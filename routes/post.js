var express = require('express'),
    router = express.Router(),
    PostController = require('../controllers/postController');

// Create
router.post('/inicio',PostController.create);

// Read
router.get('/',PostController.getAll);
router.get('/:id', PostController.get);

// Update
router.put('/:id',PostController.update);

// Delete
router.delete('/:id',PostController.delete);
module.exports = router; 