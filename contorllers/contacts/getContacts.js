const { listContacts } = require('../../models/contacts');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts(req);
    res.json({
      status: 'succes',
      code: 200,
        data: {
          contacts,
        },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = getContacts;