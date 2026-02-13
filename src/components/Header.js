import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const [isBumping, setIsBumping] = useState(false);
  const prevTotalRef = useRef(totalItems);

  useEffect(() => {
    if (prevTotalRef.current === totalItems || totalItems === 0) {
      prevTotalRef.current = totalItems;
      return;
    }

    setIsBumping(true);
    prevTotalRef.current = totalItems;

    const timer = setTimeout(() => {
      setIsBumping(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div>
          <img src="/images/logo.png" height="68" width="68" alt="Logo" />
        </div>

        <Link className="navbar-brand" to="/">
          TECH SHOP
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars size={27} />
        </button>

        {/* Mobile cart icon always visible */}
        <div className="d-lg-none ms-2">
          <Link className="cart-nav-link" to="/cart">
            <div className={`cart-icon-wrapper ${isBumping ? "cart-bump" : ""}`}>
              <FaShoppingCart size={26} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Homepage
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>

            <li className="nav-item d-none d-lg-block">
              <Link className="nav-link cart-nav-link" to="/cart">
                <div className={`cart-icon-wrapper ${isBumping ? "cart-bump" : ""}`}>
                  <FaShoppingCart size={30} />
                  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </div>
                <span className="cart-label">Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
