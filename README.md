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
⚙️ How to Run the Project Locally (Step-by-Step)
Step 1: Clone the Repository
Step 2: Install Dependencies
npm install

Step 3: Create a .env File
The .env file is not included for security reasons. You must create it manually.

📁 Create a file named .env in the root directory and add:

CLOUD_NAME=your_cloudinary_cloud_name CLOUD_API_KEY=your_cloudinary_api_key CLOUD_API_SECRET=your_cloudinary_api_secret

Step 4: Start the Server
nodemon app.js

Step 5: Open in Browser
http://localhost:3000
