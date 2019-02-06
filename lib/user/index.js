'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);
router.post('/', controller.create);

module.exports = router;