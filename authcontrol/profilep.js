const multer = require('multer');
const { verifyEmail } = require('./auth');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('profilePicture'), (req, res) => {
  const { filename } = req.file
})


User.findById(email, (err, user) => {
    if (err) throw err;
    user.profilePicture = filename;
    user.save((err) => {
      if (err) throw err;
      res.send('Profile picture updated!');
    });
  });