const express = require('express');
const { userMiddleware } = require('../middlewares');
const { read, create, updateById, update, deleteMe } = require('../services');

const router = express.Router();

router.get('/read', read);

router.post('/create', create);

router.patch('/update/:id', userMiddleware, updateById);

router.put('/update', userMiddleware, update);

router.delete('/delete', userMiddleware, deleteMe);

module.exports = router;
