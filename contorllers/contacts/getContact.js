const { getContactById } = require('../../models/contacts');

const getContact = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const contact = await getContactById(req, req.params.contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    const ownerIdAsString = contact.ownerId.toString();

    if (ownerIdAsString !== userId) {
      return res.status(401).send({ message: "You don't have permission to get this contact" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContact;