const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('profilePicture'), (req, res) => {
  // handle the uploaded file here
});