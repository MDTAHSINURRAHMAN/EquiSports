# EquiSports: A Sports Equipment Store 🏀⚽🏓

Welcome to **EquiSports**, a fully responsive and dynamic sports equipment e-commerce platform. Designed to provide a seamless user experience, this platform allows users to browse, purchase, and manage a variety of sports equipment and accessories.

## 🌐 Live Site
[EquiSports Live Website](https://equisports-13647.web.app/)

---

## 📋 Features

### 🌟 **General Features**
1. **Fully Responsive Design**:
   - Optimized for mobile, tablet, and desktop devices.

2. **Dynamic User Interface**:
   - Intuitive and visually appealing design with interactive animations.
   - Dark/Light mode toggle for personalized user experience.

3. **Error Handling**:
   - Customized 404 page for non-existing routes.
   - No default alerts; uses interactive Toast and SweetAlert notifications.

---

### 👤 **User Authentication**
- **Login & Registration**:
  - Secure login via Email/Password or Google Authentication.
  - Shows user `photoURL` and `displayName` upon login.
- **Conditional Navbar**:
  - Displays "Login" and "Register" for guests, "Log Out" for logged-in users.
- **Private Routes**:
  - Secures pages like Add Equipment, View Details, and My Equipment List.

---

### 🛍️ **Product Management**
1. **Home Page**:
   - Features a banner slider with meaningful content.
   - Displays product categories and a product showcase (6 products displayed dynamically).

2. **All Sports Equipment**:
   - Shows all products in a table format with sorting functionality based on price.
   - Includes "View Details" buttons for in-depth product information.

3. **Add Equipment**:
   - A private route with a form to add equipment (image, name, category, description, price, and more).

4. **My Equipment List**:
   - Displays equipment added by the logged-in user with options to update or delete items.

5. **View Details**:
   - A visually appealing product details page with all equipment attributes displayed.

6. **Update Page**:
   - A private route for editing existing equipment details.

---

### 🎨 **Interactive Elements**
- **Animations**:
  - Implemented using `Lottie React` and `React Awesome Reveal`.
- **Sorting Functionality**:
  - Easily sort products by ascending or descending price.

---

## 📚 Technologies Used
- **React**: Front-end library for building user interfaces.
- **React Router**: For seamless navigation and private routes.
- **Firebase**: Authentication and secure user management.
- **Tailwind CSS**: For modern, responsive styling.
- **Axios**: For connecting to the backend APIs.
- **Lottie React & React Awesome Reveal**: For animation.
- **Toastify & SweetAlert**: For success/error notifications.

---