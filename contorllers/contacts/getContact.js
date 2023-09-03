const { getContactById } = require('../../models/contacts');

const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req, req.params.contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContact;