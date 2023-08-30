const { listContacts } = require('../../models/contacts');

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

module.exports = getContacts;