const express = require("express");
const contactsController = require("../../controllers/contactsController");
const router = express.Router();

router
  .get("/", contactsController.listContacts)
  .get("/:contactId", contactsController.getById)
  .post("/", contactsController.addContact);

module.exports = router;
