import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import itemsData from '../../data/items.json';

const getItemPrice = (itemName) => {
  const found = itemsData.find((itm) => itm.name === itemName);
  return found ? found.pricePerKg : 0;
};

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartWithPrices = stored.map((item) => {
      const price = getItemPrice(item.item);
      const est = price * parseFloat(item.weight || 1) * parseInt(item.quantity || 1);
      return { ...item, priceEstimate: est };
    });

    setCart(cartWithPrices);
    localStorage.setItem('cart', JSON.stringify(cartWithPrices));
  }, []);

  const updateItem = (index, key, value) => {
    const updated = [...cart];
    updated[index][key] = value;

    const price = getItemPrice(updated[index].item);
    const qty = parseInt(updated[index].quantity) || 1;
    const wt = parseFloat(updated[index].weight) || 1;
    updated[index].priceEstimate = price * qty * wt;

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const proceedToOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    localStorage.setItem('currentCart', JSON.stringify(cart));
    navigate('/order');
  };

  const total = cart.reduce((sum, i) => sum + (i.priceEstimate || 0), 0);

  return (
    <section className="cart">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="cart-item">
              <h4>{item.item}</h4>
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(i, 'quantity', e.target.value)}
              />

              <label>Weight (kg):</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={item.weight}
                onChange={(e) => updateItem(i, 'weight', e.target.value)}
              />

              <p>💰 Subtotal: KES {item.priceEstimate.toLocaleString()}</p>
              <button className="remove-btn" onClick={() => removeItem(i)}>Remove</button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: KES {total.toLocaleString()}</h3>
            <button className="proceed-btn" onClick={proceedToOrder}>Proceed to Order</button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
