import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';
import itemsData from '../../data/items.json';

const getItemPrice = (itemName) => {
  const item = itemsData.find((i) => i.name === itemName);
  return item ? item.pricePerKg : 0;
};

function Order() {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('currentCart') || '[]');
    const withEstimates = stored.map((item) => {
      const price = getItemPrice(item.item);
      const qty = parseInt(item.quantity) || 1;
      const wt = parseFloat(item.weight) || 1;
      const estimate = price * qty * wt;
      return { ...item, priceEstimate: estimate };
    });
    setCartItems(withEstimates);
  }, []);

  const grandTotal = cartItems.reduce((sum, i) => sum + (i.priceEstimate || 0), 0);

  const validatePhone = (value) => /^(?:\+?254|0)(7|1)\d{8}$/.test(value);
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleOrder = () => {
    let valid = true;

    if (!validatePhone(phone)) {
      setPhoneError("Invalid Kenyan phone.");
      valid = false;
    } else setPhoneError('');

    if (!validateEmail(email)) {
      setEmailError("Invalid email.");
      valid = false;
    } else setEmailError('');

    if (valid) setShowModal(true);
  };

  const confirmOrder = () => {
    const summary = cartItems.map(
      (item) => `- ${item.quantity} x ${item.item} (${item.weight}kg)`
    ).join('\n');

    const msg = `Hello, my name is ${name}.\nI want to order:\n${summary}\nDropoff: ${dropoff}\nTotal: KES ${grandTotal.toLocaleString()}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/254712345678?text=${encoded}`, '_blank');

    const orderObj = {
      name,
      email,
      phone,
      dropoff,
      items: cartItems,
      totalPrice: grandTotal,
      date: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem('orders') || '[]');
    prev.push(orderObj);
    localStorage.setItem('orders', JSON.stringify(prev));
    localStorage.removeItem('currentCart');

    navigate('/order-summary');
  };

  return (
    <div className="order-page">
      <h2>Confirm Your Order</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleOrder(); }}>
        <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {emailError && <p className="error">{emailError}</p>}
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        {phoneError && <p className="error">{phoneError}</p>}
        <input placeholder="Dropoff Location" value={dropoff} onChange={(e) => setDropoff(e.target.value)} required />

        <h3>🛒 Items</h3>
        <ul className="cart-list">
          {cartItems.map((item, i) => (
            <li key={i}>
              {item.quantity} x {item.item} ({item.weight}kg) — KES {item.priceEstimate.toLocaleString()}
            </li>
          ))}
        </ul>

        <p className="price-estimate">💰 Total: <strong>KES {grandTotal.toLocaleString()}</strong></p>
        <button type="submit">Send Order via WhatsApp</button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Review & Confirm</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Dropoff:</strong> {dropoff}</p>

            <ul>
              {cartItems.map((item, i) => (
                <li key={i}>
                  {item.quantity} x {item.item} ({item.weight}kg) = KES {item.priceEstimate.toLocaleString()}
                </li>
              ))}
            </ul>

            <p>💰 Total: KES {grandTotal.toLocaleString()}</p>
            <div className="modal-actions">
              <button onClick={confirmOrder}>Confirm & Send</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
