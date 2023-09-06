const path = require('path');
const Jimp = require('jimp');
const fs = require('fs/promises');
const User = require('../../models/user');

async function avatar(req, res, next) {
    try {
        const userId = req.user.id;
        const file = req.file;

        if (!userId) {
            return res.status(401).send({ message: "Not autorized" });
        };

        const user = await User.findById(userId);

        const image = await Jimp.read(file.path);
        await image.resize(250, 250);

        const extname = path.extname(file.originalname);

        const avatarFileName = `${req.user.id}-${Date.now()}${extname}`;
        const avatarPath = path.join(__dirname, '..', '..', 'public', 'avatars', avatarFileName);
        await image.writeAsync(avatarPath);
        
        const avatarURL = `http://localhost:3000/avatars/${avatarFileName}`
        // console.log(avatarPath)

        user.avatar = avatarURL;
        // console.log(user.avatar);
        await User.updateOne({ _id: userId }, { avatar: avatarURL });

        res.status(200).send({ avatarURL: `${avatarURL}` });
    } catch (error) {
        next(error);
    }
};

module.exports = avatar;