const gravatar = require('gravatar');

function generateAvatar(email) {
    const avatar = gravatar.url(email, {s: '200', r: 'g', d: 'wavatar'});
    return avatar;
};

module.exports = generateAvatar;