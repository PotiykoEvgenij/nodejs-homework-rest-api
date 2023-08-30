const contactSchema = require('../schemas/contactSchema');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');


const getContacts =  async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'succes',
      code: 200,
        data: {
          contacts,
        },
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

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

const deleteContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
  
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    
    await removeContact(req.params.contactId);

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const editContact = async (req, res, next) => {
    try {
        const contactId = req.params.contactId;
        const { error } = contactSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: "missing fields" });
        }
        const updatedContact = await updateContact(contactId, req.body);

        if (!updatedContact) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
    // res.json({ message: 'template message' })
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    console.log(req.body);

    if (favorite === undefined) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    const updatedContact = await updateContact(contactId, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    editContact,
    updateStatusContact,
};