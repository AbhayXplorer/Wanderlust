# 🌍 Wanderlust – Travel Listing Web Application

Wanderlust is a **full-stack travel listing web application** inspired by platforms like **Airbnb**.  
It allows users to explore travel destinations, create and manage listings, add reviews, and securely manage user accounts.

This project is built to practice **real-world backend development**, authentication, authorization, image uploads, and database relationships using Node.js and MongoDB.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User Register / Login / Logout
- Password hashing using **bcrypt**
- Authentication with **Passport.js**
- Protected routes for listings & reviews

### 🏡 Listings
- Create new travel listings
- Edit & delete listings (only by owner)
- Upload images using **Cloudinary**
- Store location & price details

### 📝 Reviews & Ratings
- Add reviews with ratings
- Delete reviews (only review owner)
- MongoDB relationships between listings & reviews

### 🖼️ Image Upload
- Image upload using **Multer**
- Cloudinary cloud storage integration

### 💾 Database & Sessions
- **MongoDB Atlas** cloud database
- Sessions stored using **Connect-Mongo**
- Persistent login sessions

### ⚠️ Error Handling
- Centralized error handling middleware
- Custom error pages
- Async error handling with wrapper functions

### 📱 UI & UX
- Server-side rendering using **EJS**
- Responsive UI with **Bootstrap**
- Flash messages for success & errors

---

## 🛠️ Tech Stack

### Frontend
- EJS (Embedded JavaScript Templates)
- CSS3
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- Passport.js
- Express-Session
- Connect-Mongo
- bcrypt

### Cloud & Tools
- MongoDB Atlas
- Cloudinary
- dotenv
- Git & GitHub

---

## 📂 Project Structure

```bash
wanderlust/
│── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
│── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
│── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
│── public/
│   ├── css/
│   └── js/
│
│── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
│── middleware.js
│── app.js
│── cloudConfig.js
│── .env
│── package.json
│── README.md
