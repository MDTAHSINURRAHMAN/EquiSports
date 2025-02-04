# EquiSports: Backend API 🏀⚽🏓

This is the server-side repository for **EquiSports**, a sports equipment e-commerce platform. It handles user authentication, database management, and API endpoints for managing sports equipment data. Built with **Node.js**, **Express.js**, and **MongoDB**, this backend ensures secure and efficient data handling.

## 🌐 Live API
[EquiSports Server Live URL](https://equis-sports-server-project.vercel.app/)

---

## 📋 Features

### 🔑 **User Authentication**
- **JWT Authentication**:
  - Generates secure tokens for authenticated users.
  - Ensures private routes are accessible only to logged-in users.
  
- **Google Authentication**:
  - Facilitates easy login through Google accounts.

---

### 🛍️ **Product Management**
1. **Add Equipment**:
   - Handles form submissions from the client to store product data in the database.

2. **Retrieve Equipment**:
   - Fetches all equipment or specific items from the database.

3. **Update Equipment**:
   - Allows logged-in users to update their previously added products.

4. **Delete Equipment**:
   - Enables users to delete their products with confirmation.

5. **Sorting & Filtering**:
   - Supports sorting equipment by price and filtering by categories.

---

### 🔐 **Private Routes**
- Ensures that sensitive operations (add, update, delete) are restricted to authorized users using **JWT**.

---

### 📚 Technologies Used
- **Node.js**: Server-side runtime environment.
- **Express.js**: Backend framework for creating RESTful APIs.
- **MongoDB (with Mongoose)**: NoSQL database for efficient data storage and management.
- **JWT**: Secure user authentication.
- **Dotenv**: Environment variable management.
- **Cors**: Handles cross-origin requests.
- **Vercel**: Deployment of the server.

---

