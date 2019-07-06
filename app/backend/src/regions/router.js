'use strict';

// Router
const router = require('express').Router();
const regions = require('./index');

// Tasks
router.get('/', regions.getAll);

// Export the router
module.exports = router;
