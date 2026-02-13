import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import techDB from "../fireConfig";
import { serverTimestamp } from "firebase/firestore";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [subAmount, setSubAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const isCartEmpty = cartItems.length === 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const discountTiers = [
    { min: 159, off: 20 },
    { min: 79, off: 10 },
    { min: 49, off: 6 },
    { min: 15, off: 2 },
  ];

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubAmount(subtotal);
  }, [cartItems]);

  const increaseQuantity = (product) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: product });
  };

  const decreaseQuantity = (product) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  useEffect(() => {
    const tier = discountTiers.find((t) => subAmount >= t.min);
    const discount = tier ? tier.off : 0;

    setDiscountAmount(discount);

    const total = subAmount - discount;
    setTotalAmount(total > 0 ? total : 0);
  }, [subAmount]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeOrder = async () => {
    const orderInfo = {
      cartItems,
      totalAmount: Number(totalAmount),
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(techDB, "orders"), orderInfo);
      dispatch({ type: "CLEAR_CART" });
      setOrderSuccess(true);
    } catch (error) {
      console.error(`order failed: ${error}`);
    }
  };

  const getNextTier = () => {
    const sorted = [...discountTiers].sort((a, b) => a.min - b.min);
    return sorted.find((tier) => subAmount < tier.min);
  };

  const nextTier = getNextTier();

  return (
    <Layout>
      {isCartEmpty ? (
        <div className="empty-cart">
          <h2>Cart is empty</h2>
          <p>Add some products to your cart to see them here.</p>
        </div>
      ) : (
        <>
          <div className="block_container">
            <div className="bloc1">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="imageCard">
                          <img src={item.imageURL} height="90" width="90" alt={item.name} />
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => decreaseQuantity(item)}>
                            -
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button className="qty-btn" onClick={() => increaseQuantity(item)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>{item.price}€</td>
                      <td>{(item.price * item.quantity).toFixed(2)}€</td>
                      <td>
                        <FaTrash size={22} className="trash-icon" onClick={() => deleteFromCart(item)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bloc2">
              <h2>CART TOTAL</h2>
              <div className="discount-info">
                <div className="discount-list">
                  <div>
                    over €159 <span>€20 off</span>
                  </div>
                  <div>
                    over €79 <span>€10 off</span>
                  </div>
                  <div>
                    over €49 <span>€6 off</span>
                  </div>
                  <div>
                    over €15 <span>€2 off</span>
                  </div>
                </div>
                {nextTier ? (
                  <div className="discount-next">
                    Add {(nextTier.min - subAmount).toFixed(2)}€ more to unlock <span>{nextTier.off}€ off</span>
                  </div>
                ) : (
                  <div className="discount-next"> Maximum discount applied</div>
                )}
              </div>

              <div>
                <b>Subtotal:&nbsp;</b>
                {subAmount.toFixed(2)}€
              </div>

              <div>
                <b>Discount:&nbsp;</b>
                {discountAmount.toFixed(2)}€
              </div>

              <div>
                <b>Total:&nbsp;</b>
                {totalAmount.toFixed(2)}€
              </div>

              <div className="check">
                <button onClick={handleShow}>CHECKOUT</button>
              </div>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>ORDER SUMMARY</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {!orderSuccess ? (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between">
                    <b>Subtotal:</b>
                    <b>{subAmount.toFixed(2)}€</b>
                  </div>

                  <div className="d-flex justify-content-between">
                    <b>Discount:</b>
                    <b style={{ color: "#d7263d" }}>-{discountAmount.toFixed(2)}€</b>
                  </div>

                  <div className="d-flex justify-content-between">
                    <b>Total:</b>
                    <b>{totalAmount.toFixed(2)}€</b>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h3>Order placed successfully!</h3>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              {!orderSuccess ? (
                <>
                  <button onClick={handleClose}>CANCEL</button>
                  <button onClick={placeOrder}>CONFIRM ORDER</button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    handleClose();
                  }}
                >
                  CLOSE
                </button>
              )}
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Layout>
  );
}

export default CartPage;
