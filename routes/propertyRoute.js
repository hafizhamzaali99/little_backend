const express = require("express")
const { createProperty } = require("../controllers/propertyController")
const router = express.Router()

router.route('/property/').post(createProperty)
router.route('/property/').get()

module.exports = router