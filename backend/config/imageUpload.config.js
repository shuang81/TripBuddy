const ImageKit = require('imagekit');

// configuration for image updload service
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

module.exports = imagekit