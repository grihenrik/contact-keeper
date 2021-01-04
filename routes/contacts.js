const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

/**
 * @route       GET api/contacts
 * @description Get all the users contacts
 * @access      Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route       POST api/contacts
 * @description Add new contact
 * @access      Private
 */
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      return res.send(contact);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

/**
 * @route       GET api/contacts/id
 * @description Get one contact with id from the users contacts
 * @access      Private
 */
router.get("/:id", auth, async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ msg: "Contact not found" });
  return res.send(contact);
});

/**
 * @route       PUT api/contacts/id
 * @description Update user's contact with id
 * @access      Private
 */
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const updatedContact = {};
  if (name) updatedContact.name = name;
  if (email) updatedContact.email = email;
  if (phone) updatedContact.phone = phone;
  if (type) updatedContact.type = type;
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Authentication error" });
    }
    newContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updatedContact },
      { new: true }
    );
    return res.send(newContact);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

/**
 * @route       DELETE api/contacts/id
 * @description Delete user's contact with id
 * @access      Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Authentication error" });
    }
    deletedContact = await Contact.findByIdAndRemove(req.params.id);
    return res.send(deletedContact);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
