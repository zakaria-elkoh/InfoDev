const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/articles/'));  // Save images to the correct folder
    },
    filename: (req, file, cb) => {
        // Correcting 'file.originoriginalname' to 'file.originalname'
        cb(null, 'article-' + Date.now() + path.extname(file.originalname));  // Name format: 'article-timestamp.ext'
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;  // Allow only image files
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
}).single('articleImage');

module.exports = { upload };