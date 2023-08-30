const { getContactById, removeContact } = require('../../models/contacts');

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

module.exports = deleteContact;