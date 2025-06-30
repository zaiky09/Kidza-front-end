import React, { useState, useEffect } from 'react';
import './Catalog.css';
import itemsData from '../../data/items.json';
import { useNavigate } from 'react-router-dom';

function Catalog() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState('');
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(itemsData);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleView = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setWeight('');
    setShowModal(true);
  };

  const addToCart = () => {
    if (!weight) {
      alert("Please enter weight.");
      return;
    }

    const newCartItem = {
      item: selectedItem.name,
      quantity: parseInt(quantity),
      weight: parseFloat(weight),
    };

    setCart([...cart, newCartItem]);
    setShowModal(false);
  };

  const proceedToOrder = () => {
    if (cart.length === 0) return;
    localStorage.setItem('currentCart', JSON.stringify(cart));
    navigate('/order');
  };

  return (
    <section className="catalog">
      <h2>Our Products</h2>
      <div className="catalog-grid">
        {items.map((item) => (
          <div className="catalog-card" key={item.id}>
            <img src={require(`../../assets/${item.image}`)} alt={item.name} />
            <h3>{item.name}</h3>
            <button onClick={() => handleView(item)}>View</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <p>🛒 Items in cart: <strong>{cart.length}</strong></p>
          <button onClick={proceedToOrder}>Proceed to Order</button>
        </div>
      )}

      {showModal && selectedItem && (
        <div className="modal-overlay">
  <div className="modal">
    <h3>{selectedItem.name}</h3>
    <img
      src={require(`../../assets/${selectedItem.image}`)}
      alt={selectedItem.name}
    />
    <p>{selectedItem.description}</p>
    <p><strong>Price:</strong> KES {selectedItem.pricePerKg} per kg</p>

    <div className="input-stack">
      <div className="input-group">
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
    </div>

    <div className="modal-actions">
      <button className="add-btn" onClick={addToCart}>Add to Cart</button>
      <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
    </div>
  </div>
</div>

      )}
    </section>
  );
}

export default Catalog;
