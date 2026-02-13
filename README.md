# 🛒 Tech Shop

A modern e-commerce web application built with React and Firebase that allows users to browse tech products, add them to a cart, and place orders.

This project was built for educational and portfolio purposes to practice modern React development, state management with Redux, and integration with Firebase Firestore.

---

## 🚀 Live Demo

👉 https://techshop-app-mv.netlify.app/

---

## ✨ Features

- Browse tech products
- Add products to cart
- Remove products from cart
- Cart subtotal and quantity calculation
- Basic discount tier logic
- Order placement system
- Orders history page
- Firebase Firestore integration
- Data persistence using Local Storage
- Responsive layout

---

## 🛠 Tech Stack

### Frontend
- React (Functional Components + Hooks)
- React Router DOM
- Redux (State Management)
- JavaScript (ES6+)
- HTML5
- CSS3

### Backend / Database
- Firebase
- Firestore Database

### Other Tools
- Local Storage API
- Git
- GitHub

---

## 📦 Run Locally

Clone the repository:

```bash
git clone https://github.com/mvukalov/Tech-shop.git
```

Navigate into the project folder:

```bash
cd Tech-shop
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

The app will run on:
```
http://localhost:3000
```

---

## ⚙️ How It Works

1. Products are fetched from Firebase Firestore.
2. Users can browse available tech products.
3. Products can be added to the cart.
4. Cart state is managed globally using Redux.
5. Cart data is persisted in Local Storage.
6. When an order is placed:
   - Order data is sent to Firestore.
   - Cart is cleared.
7. Orders page fetches and displays previous orders.

---

## 📁 Project Structure

```
Tech-shop/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.js
│   │   ├── CartPage.js
│   │   ├── OrdersPage.js
│   │   └── Layout.js
│   ├── redux/
│   │   ├── reducers/
│   │   └── store.js
│   ├── firebase/
│   │   └── fireConfig.js
│   ├── hooks/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## 📡 External Services

- Firebase — https://firebase.google.com/
- React Router — https://reactrouter.com/

---

## 🧠 Key Concepts Practiced

- React Hooks (useState, useEffect)
- Global State Management (Redux)
- Firestore CRUD operations
- Component-based architecture
- Data persistence strategies
- Clean project structuring
- Git & GitHub workflow

---

## 👤 Author

Martin Vukalović  
GitHub: https://github.com/mvukalov

---

## 📄 License

This project is intended for educational and portfolio purposes.
