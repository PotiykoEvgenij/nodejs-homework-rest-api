const contactSchema = require('../../schemas/contactSchema');

const { addContact } = require('../../models/contacts');

const createContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = createContact;