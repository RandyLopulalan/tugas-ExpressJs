const router = require('express').Router();
const multer = require('multer')
const upload = multer({dest: "uploads"})
const productControllerV2 = require('./controllerV2')

router.post('/product/', upload.single("image"),  productControllerV2.store)

module.exports = router;