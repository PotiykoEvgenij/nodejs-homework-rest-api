const { listContacts } = require('../../models/contacts');

const getContacts = async (req, res, next) => {
  const userId = req.user.id;
  try {
    // const contacts = await listContacts.find({ ownerId: userId }).exec();
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