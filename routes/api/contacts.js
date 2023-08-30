const express = require('express');

const router = express.Router();

const contactsController = require('../../contorllers/contacts');

// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require('../../models/contacts');


router.get('/', contactsController.getContacts);

router.get('/:contactId', contactsController.getContact);

router.post('/', contactsController.createContact);

router.delete('/:contactId', contactsController.deleteContact);

router.put('/:contactId', contactsController.editContact);

router.patch('/:contactId/favorite', contactsController.updateStatusContact);

module.exports = router;
