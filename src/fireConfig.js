import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuDMw7d-qAdcmeePL5529FRVOFULLT6sQ",
  authDomain: "tech-shop-404ba.firebaseapp.com",
  projectId: "tech-shop-404ba",
  storageBucket: "tech-shop-404ba.appspot.com",
  messagingSenderId: "1042103985990",
  appId: "1:1042103985990:web:bfe5b68dfd8e0fc5166747",
  measurementId: "G-45NF52F1DW",
};

const app = initializeApp(firebaseConfig);

const techDB = getFirestore(app);

export default techDB;
