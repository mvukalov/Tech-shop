import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaProductHunt, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import techDB from "../fireConfig";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [totalAmount, setTotalAmount] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCardNumber] = useState("");
  const [promoText, setPromo] = useState("");
  const [promoDiscount1, setPromoDiscount1] = useState("");
  const [promoDiscount2, setPromoDiscount2] = useState("");
  const [promoDiscount3, setPromoDiscount3] = useState("");
  const [promoDiscount4, setPromoDiscount4] = useState("");
  const [promoDiscount5, setPromoDiscount5] = useState("");
  const [discount, setDiscount] = useState("");
  const [subAmount, setSubAmount] = useState("");

  const [globalCounter, setGlobalCounter] = useState("");
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");
  const [counter3, setCounter3] = useState("");
  const [counter4, setCounter4] = useState("");
  const [counter5, setCounter5] = useState("");

  const promoObj = {
    first: "U9TfPPDOYV6z",
    second: "59H49FyXiPf3",
    third: "MEoFx3c51F0D",
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setSubAmount(temp.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    setTotalAmount(
      (
        subAmount -
        promoDiscount1 -
        promoDiscount2 -
        promoDiscount3 -
        promoDiscount4 -
        promoDiscount5
      ).toFixed(2)
    );
  }, [globalCounter]);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setTotalAmount(temp.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    setDiscount((subAmount - totalAmount).toFixed(2));
  }, [totalAmount]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeOrder = async () => {
    const UserInfo = {
      email,
      address,
      card,
    };

    const orderInfo = {
      cartItems,
      UserInfo,
    };

    try {
      const result = await addDoc(collection(techDB, "orders"), orderInfo);
      handleClose();
    } catch (error) {
      console.error(`order failed:${error}`);
    }
  };
  const solvePromo = () => {
    if (promoObj.first === promoText) {
      if (!counter5 && !counter3 && !counter1) {
        setGlobalCounter(1);
        const discount1 = subAmount * 0.05;
        setPromoDiscount1(discount1);
        setCounter1(1);
      }
      if (counter3 && !counter5 && !counter1 && !counter2) {
        setGlobalCounter(2);
        const discount2 = totalAmount * 0.05;
        setPromoDiscount2(discount2);
        setCounter2(1);
      }
    }
    if (promoObj.second === promoText) {
      if (!counter5 && !counter1 && !counter3) {
        setGlobalCounter(3);
        const discount3 = subAmount * 0.2;
        setPromoDiscount3(discount3);
        setCounter3(1);
      }
      if (counter1 && !counter5 && !counter4 && !counter3) {
        setGlobalCounter(4);
        const discount4 = totalAmount * 0.2;
        setPromoDiscount4(discount4);
        setCounter4(1);
      }
    }
    if (promoObj.third === promoText) {
      if (!counter1 && !counter2 && !counter5) {
        setGlobalCounter(5);
        const discount5 = 20;
        setPromoDiscount5(discount5);
        setCounter5(1);
      }
    }
  };

  return (
    <Layout>
      <div className=" block_container">
        <div className="bloc1">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr>
                    <div className="imageCard">
                      <td>
                        <img src={item.imageURL} height="90" width="90"></img>
                      </td>
                    </div>

                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}.</td>
                    <td>
                      <FaTrash size={22} onClick={() => deleteFromCart(item)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bloc2">
          <h2>CART TOTAL</h2>

          <div>
            <b> Subtotal:&nbsp;</b>
            {subAmount}€
          </div>
          <div>
            <b> Quantity Discount:&nbsp;</b>€
          </div>
          <div>
            <b> Promo Discount:&nbsp;</b>
            {discount}€
          </div>
          <div>
            <b> Total:&nbsp;</b> {totalAmount}€
          </div>
          <div className="promo">
            <button
              className="btnPromo"
              onClick={() => {
                solvePromo();
              }}
            >
              PROMO
            </button>
            <input
              type="text"
              className="inputPromo"
              value={promoText}
              onChange={(e) => {
                setPromo(e.target.value);
              }}
            ></input>
          </div>
          <div className="check">
            <button onClick={handleShow}> CHECKOUT</button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ENTER YOUR DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <textarea
            type="text"
            className="form-control"
            placeholder="adress"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <input
            type="number"
            className="form-control"
            placeholder="card number"
            value={card}
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>CLOSE</button>
          <button onClick={placeOrder}>ORDER</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
