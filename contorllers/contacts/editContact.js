const contactSchema = require('../../schemas/contactSchema');

const { updateContact } = require('../../models/contacts');

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
};

module.exports = editContact;