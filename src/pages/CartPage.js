import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
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
  const [subAmount, setSubAmount] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCardNumber] = useState("");
  const [promoText, setPromo] = useState("");
  const [counter1, setCounter1] = useState("");
  const [counter2, setCounter2] = useState("");
  const [counter3, setCounter3] = useState("");
  const [counter4, setCounter4] = useState("");
  const [globalCounter, setGlobalCounter] = useState("");
  const [promoDiscount1, setPromoDiscount1] = useState("");
  const [promoDiscount2, setPromoDiscount2] = useState("");
  const [promoDiscount3, setPromoDiscount3] = useState("");
  const [promoDiscount4, setPromoDiscount4] = useState("");
  const [promodiscountTotal, setPromoDiscountTotal] = useState("");
  const [quantityDiscount, setQuantityDiscount] = useState(0);

  const promoObj = {
    first: "U9TfPPDOYV6z",
    second: "59H49FyXiPf3",
    third: "MEoFx3c51F0D",
  };

  let smokeQuantity = 0;
  let motionQuantity = 0;
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
    cartItems.forEach((item) => {
      if (item.quantity === 2 && item.name === "Smoke Sensor X-Sense") {
        smokeQuantity = 4.98;
        setQuantityDiscount(smokeQuantity);
      }
      if (item.quantity === 3 && item.name === "Motion Sensor Guardline") {
        motionQuantity = 9.97;
        setQuantityDiscount(motionQuantity);
      } else {
        setQuantityDiscount(motionQuantity + smokeQuantity);
      }
    });
  }, [cartItems]);

  useEffect(() => {
    if (promoDiscount1) {
      setTotalAmount(totalAmount - promoDiscount1);
      setPromoDiscountTotal(promoDiscount1 + promoDiscount3);
    }
    if (promoDiscount3) {
      setTotalAmount(totalAmount - promoDiscount3);
      setPromoDiscountTotal(promoDiscount3 + promoDiscount1);
    }
    if (promoDiscount4) {
      setTotalAmount(totalAmount - promoDiscount4);
      setPromoDiscountTotal(promoDiscount4);
    }
    if (promoDiscount2) {
      setTotalAmount(totalAmount - promoDiscount2);
      setPromoDiscountTotal(promoDiscount2 + promoDiscount3);
    }
  }, [globalCounter]);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setTotalAmount(temp - smokeQuantity - motionQuantity);
  }, [cartItems]);

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
      if (!counter4 && !counter3 && !counter1) {
        setCounter1(1);
        setGlobalCounter(1);
        setPromoDiscount1(totalAmount * 0.05).toFixed(2);
      }
      if (counter3 && !counter4 && !counter1 && !counter2) {
        setCounter2(1);
        setGlobalCounter(2);
        setPromoDiscount2(totalAmount * 0.05).toFixed(2);
      }
    }
    if (promoObj.second === promoText) {
      if (!counter4 && !counter3) {
        setCounter3(1);
        setGlobalCounter(3);
        setPromoDiscount3(20);
      }
    }
    if (promoObj.third === promoText) {
      if (!counter1 && !counter2 && !counter3 && !counter4) {
        setCounter4(1);
        setGlobalCounter(4);
        setPromoDiscount4(totalAmount * 0.2).toFixed(2);
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
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr>
                    <div className="imageCard">
                      <td>
                        <img
                          src={item.imageURL}
                          height="90"
                          width="90"
                          alt=""
                        ></img>
                      </td>
                    </div>

                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}.</td>
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
            {Number(subAmount).toFixed(2)}€
          </div>
          <div>
            <b> Quantity Discount:&nbsp;</b>
            {Number(quantityDiscount).toFixed(2)}€
          </div>
          <div>
            <b> Promo Discount:&nbsp;</b>
            {Number(promodiscountTotal).toFixed(2)}€
          </div>
          <div>
            <b> Total:&nbsp;</b> {Number(totalAmount).toFixed(2)}€
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
