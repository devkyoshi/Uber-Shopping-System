const multer = require('multer');
//For images

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images'); // Specify the directory for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep the original file name
    }
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload;