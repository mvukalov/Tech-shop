import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import techDB from "../fireConfig";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const final = await getDocs(collection(techDB, "orders"));
      const ordersArray = [];

      final.forEach((doc) => {
        ordersArray.push(doc.data());
      });

      setOrders(ordersArray);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      {orders.map((order) => {
        return (
          <div className="p2">
            <table className="orderTable">
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
                {order.cartItems.map((item) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={item.imageURL}
                          height="90"
                          width="90"
                          alt=""
                        ></img>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </Layout>
  );
}

export default OrdersPage;
