const express = require('express');

const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL, () => {
    console.log('connected to mongoDb');
  });
}
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('file uploaded successfully');
  } catch (err) {
    console.log(err);
  }
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);

const port = process.env.PORT || 8800;

app.use(express.static(path.join(__dirname, '/front-end/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend server is running! at ${port}`);
});
