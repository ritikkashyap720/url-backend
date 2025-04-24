const express = require("express")
const { getUrl, createUrl, getAllUrl, deleteUrl } = require("../controllers/url.controller")
const { restrictedToLoginUserOnly } = require("../middleware/authorization")
const urlRouter = express.Router()

urlRouter.get("/allurl", restrictedToLoginUserOnly, getAllUrl)
urlRouter.get("/:shortID", getUrl)
urlRouter.post("/newurl", restrictedToLoginUserOnly, createUrl)
urlRouter.delete("/deleteUrl", restrictedToLoginUserOnly, deleteUrl)

module.exports = urlRouter