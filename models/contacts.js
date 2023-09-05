const Contact = require('./mongoosSchema');
// const userId = req.user.id;

const listContacts = async (req) => {
  const userId = req.user.id;
  console.log(userId);
  return await Contact.find({ ownerId: userId });
};

const getContactById = async (req, contactId) => {
  const userId = req.user.id;
  return await Contact.findById(contactId).where({ ownerId: userId });
};

const removeContact = async (req, contactId) => {
  const userId = req.user.id;
  return await Contact.findByIdAndRemove(contactId).where({ ownerId: userId });
};

const addContact = async (req, body) => {
  const userId = req.user.id;
  return await Contact.create({...body, ownerId: userId});
};

const updateContact = async (req, contactId, body) => {
  const userId = req.user.id;
  return await Contact.findByIdAndUpdate(contactId, body, { new: true }).where({ ownerId: userId });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
