'use strict';

// Router
const router = require('express').Router();
const regions = require('./index');

// Tasks
router.get('/', regions.getAll);
router.get('/:id', regions.getDevelopers)

// Export the router
module.exports = router;
