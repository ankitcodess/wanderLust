# wanderLust
WanderLust is a full-stack property rental web application inspired by Airbnb.

It allows users to register, log in, create and manage property listings, upload images, add reviews, and view locations on a map.

🚀 Features
User authentication and authorization
Create, update, and delete property listings
Image upload using Cloudinary
Add reviews and ratings
Location display using Mapbox
MVC architecture for clean and scalable code
🛠️ Tech Stack
Frontend: HTML, CSS, Bootstrap, EJS
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: Passport.js, Sessions
Cloud Services: Cloudinary
Tools: Git, GitHub, npm

    STEPS:::::
⚙️ How to Run the Project Locally (Step-by-Step)
Step 1: Clone the Repository
Step 2: Install Dependencies  (already mentioned in package.json) =>cloudinary": "^1.41.3",
    "connect-flash": "^0.1.1",
    "dotenv": "^17.2.3",
    "ejs": "^3.1.10",
    "ejs-mate": "^4.0.0",
    "express": "^5.1.0",
    "express-session": "^1.18.2",
    "joi": "^18.0.1",
    "method-override": "^3.0.0",
    "mongoose": "^8.19.3",
    "multer": "^2.0.2",
    "multer-storage-cloudinary": "^4.0.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^8.0.0"
npm install

Step 3: Create a .env File
The .env file is not included for security reasons. You must create it manually.

📁 Create a file named .env in the root directory and add:

CLOUD_NAME=your_cloudinary_cloud_name CLOUD_API_KEY=your_cloudinary_api_key CLOUD_API_SECRET=your_cloudinary_api_secret

Step 4: Start the Server
nodemon app.js

Step 5: Open in Browser
http://localhost:3000
