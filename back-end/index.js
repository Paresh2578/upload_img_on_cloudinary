const express = require("express");
const cloudinary = require("cloudinary").v2;
const upload = require("./middleware/multer"); // Ensure multer is correctly set up
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());    

// Cloudinary configuration (use environment variables in a real application)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Get file path
    const filePath = path.join(__dirname, req.file.path);

    // Delete file from local storage
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });

    // Send response
    res.status(200).json({
      message: "File uploaded successfully",
      data: result.secure_url,
    });

  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
