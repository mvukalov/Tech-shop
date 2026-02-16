import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import techDB from "../fireConfig";
import { query, orderBy } from "firebase/firestore";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const q = query(collection(techDB, "orders"), orderBy("createdAt", "desc"));
      const final = await getDocs(q);

      const ordersArray = [];

      final.forEach((doc) => {
        ordersArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setOrders(ordersArray);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div className="orders-wrapper">
        {orders.map((order) => (
          <div className="p2" key={order.id}>
            <div className="orderCard">
              <div className="orderCard-header">
                <span className="orderCard-date">
                  Order date:{" "}
                  {order.createdAt?.seconds
                    ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                    : "Processing..."}
                </span>
              </div>

              {/* Desktop: table layout */}
              <table className="orderTable orderTable-desktop">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imageURL} height="90" width="90" alt={item.name} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}€</td>
                      <td>{(item.price * item.quantity).toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile: row-based compact layout */}
              <div className="orderItems-mobile">
                {order.cartItems.map((item) => (
                  <div className="orderItem-row" key={item.id}>
                    <img src={item.imageURL} alt={item.name} className="orderItem-img" />
                    <div className="orderItem-details">
                      <span className="orderItem-name">{item.name}</span>
                      <span className="orderItem-meta">
                        {item.quantity} × {item.price}€ = {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default OrdersPage;
