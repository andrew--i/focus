'use strict';

// Router
const router = require('express').Router();
const regions = require('./index');

// Tasks
router.get('/', regions.findDevelopers)

// Export the router
module.exports = router;
