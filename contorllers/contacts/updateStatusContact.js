const { updateContact } = require('../../models/contacts');

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    // console.log(req.body);

    if (favorite === undefined) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    const updatedContact = await updateContact(req, contactId, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;