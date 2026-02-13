🛒 Tech Shop

A modern e-commerce web application built with React and Firebase that allows users to browse tech products, add them to a cart, and place orders.

This project was built for educational and portfolio purposes to practice modern React development, Redux state management, and integration with Firebase (Firestore).

🚀 Live Demo

👉 (ovdje ubaci Vercel / Netlify link ako ga deployaš)

✨ Features

Browse tech products

Add products to cart

Remove products from cart

Cart subtotal & quantity calculation

Order placement

Orders history page

Data persistence using Local Storage

Firebase Firestore integration

Responsive layout

Basic discount tier logic

🛠 Tech Stack
Frontend

React (Functional Components + Hooks)

React Router DOM

Redux (State Management)

JavaScript (ES6+)

HTML5

CSS3

Backend / Database

Firebase

Firestore

Other

Local Storage API

Git & GitHub

📦 Run Locally

Clone the repository:

git clone https://github.com/mvukalov/Tech-shop.git


Navigate into the project folder:

cd Tech-shop


Install dependencies:

npm install


Start development server:

npm start

⚙️ How It Works

Products are fetched from Firebase Firestore.

Users can add products to the cart.

Cart state is managed globally using Redux.

Cart data is persisted in Local Storage.

When an order is placed:

Order data is sent to Firestore.

Cart is cleared.

Orders page fetches previously stored orders from Firestore.

📁 Project Structure
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

📡 External Services

Firebase — https://firebase.google.com/

Firestore Database

React Router — https://reactrouter.com/

🧠 Key Concepts Practiced

React Hooks (useState, useEffect)

Global State Management (Redux)

Data persistence

Firestore CRUD operations

Component architecture

Clean project structure

Git workflow

👤 Author

Mateo Vukalović
GitHub: https://github.com/mvukalov

📄 License

This project is intended for educational and portfolio purposes.

🔥 Ako želiš da ovo izgleda JOŠ profesionalnije

Mogu ti dodati:

🖼️ Screenshot sekciju

🏗️ Architecture diagram

🧠 Advanced technical explanation (kao junior → mid dev)

🎯 CV-ready professional summary

🚀 Deployment section (Vercel / Netlify)

🛡️ Environment variables setup section

📊 Performance improvements section

Ako želiš, mogu ti odmah napraviti ultra polished README verziju (portfolio ready za posao) 💼🔥
