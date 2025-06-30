import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';
import itemsData from '../../data/items.json';

// Get price per kg for selected item
const getItemPrice = (items, itemName) => {
  const selectedItem = items.find((itm) => itm.name === itemName);
  return selectedItem ? selectedItem.pricePerKg : 0;
};

function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState('');
  const [priceEstimate, setPriceEstimate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setItems(itemsData);
  }, []);

  useEffect(() => {
    const pricePerKg = getItemPrice(items, item);
    const totalWeight = parseFloat(weight) || 1;
    const qty = parseInt(quantity) || 1;
    const estimated = pricePerKg * totalWeight * qty;
    setPriceEstimate(estimated);
  }, [items, item, weight, quantity]);

  const validatePhone = (value) => {
    const phoneRegex = /^(?:\+?254|0)(7|1)\d{8}$/;
    return phoneRegex.test(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleOrder = () => {
    let valid = true;

    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid Kenyan phone number.');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (valid) {
      setShowModal(true);
    }
  };

  const confirmOrder = () => {
    const message = `Hello, my name is ${name}. I would like to order:\n${quantity} x ${item}\nFrom: ${pickup} to ${dropoff}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254712345678?text=${encodedMessage}`, '_blank');
    setShowModal(false);

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
      name,
      email,
      phone,
      item,
      quantity,
      pickup,
      dropoff,
      weight,
      priceEstimate,
      date: new Date().toISOString()
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    const currentOrder = {
      name,
      email,
      phone,
      item,
      quantity,
      pickup,
      dropoff,
      weight,
      priceEstimate,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('currentOrder', JSON.stringify(currentOrder));

    navigate('/order-summary');
  };

  return (
    <div className="order-page">
      <h2>Place Your Order</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleOrder(); }}>
        <label>Your Name:</label>
        <input type="text" value={name} required onChange={(e) => setName(e.target.value)} />

        <label>Email Address:</label>
        <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        {emailError && <p className="error">{emailError}</p>}

        <label>Phone Number:</label>
        <input type="tel" value={phone} required onChange={(e) => setPhone(e.target.value)} />
        {phoneError && <p className="error">{phoneError}</p>}

        <label>Pickup Location:</label>
        <input type="text" value={pickup} required onChange={(e) => setPickup(e.target.value)} />

        <label>Dropoff Location:</label>
        <input type="text" value={dropoff} required onChange={(e) => setDropoff(e.target.value)} />

        <label>Item:</label>
        <select value={item} required onChange={(e) => setItem(e.target.value)}>
          <option value="">Select an item</option>
          {items.map((itm) => (
            <option key={itm.id} value={itm.name}>{itm.name}</option>
          ))}
        </select>

        <label>Quantity:</label>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

        <label>Weight (in kg):</label>
        <input type="number" min="0.1" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <p className="price-estimate">💰 Estimated Price: KES {priceEstimate || 0}</p>

        <button type="submit">Send Order via WhatsApp</button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Your Order</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Item:</strong> {item}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <p><strong>Pickup:</strong> {pickup}</p>
            <p><strong>Dropoff:</strong> {dropoff}</p>
            <p><strong>Weight:</strong> {weight} kg</p>
            <p className="price-estimate">
              💰 Estimated Price: <strong>KES {priceEstimate ? priceEstimate.toLocaleString() : 0}</strong>
            </p>
            {item && weight && quantity && (
              <p className="price-breakdown">
                Breakdown: KES {getItemPrice(items, item)} x {weight}kg x {quantity} = <strong>KES {priceEstimate.toLocaleString()}</strong>
              </p>
            )}

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
