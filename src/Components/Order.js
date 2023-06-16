import React, { useState, useEffect } from 'react';
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Order() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({});
  const [updatedOrder, setUpdatedOrder] = useState({});
  let history=useHistory();

  

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://pizza-express-rho.vercel.app/orders/all');
      const data = await response.json();
      setOrders(data.data);
      localStorage.setItem('orders', JSON.stringify(data.data)); // Store orders in localStorage
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch('https://pizza-express-rho.vercel.app/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });
      const data = await response.json();
      console.log(data);
      fetchOrders();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`https://pizza-express-rho.vercel.app/orders/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      fetchOrders();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const updateOrder = async (id) => {
    try {
      const response = await fetch(`https://pizza-express-rho.vercel.app/orders/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
      const data = await response.json();
      console.log(data);
      fetchOrders();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchOrders();

    // event listener for storage event
    const handleStorageChange = (event) => {
      if (event.key === 'orders') {
        const updatedOrders = JSON.parse(event.newValue);
        setOrders(updatedOrders);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (!isAuthenticated || role!=='admin') {
    history.push('/login');
    return null; 
  }

  return (
    <Base>
    <div className='container'>
      

      {/* List Orders */}
      <h2>All Orders</h2>

      <div className='container'>
        <div className='row'> 

      {orders.map((order) => (
            <div className='col-md-6' key={order._id}>

        <div className="card mb-3" key={order._id}>
          <div className="card-body">
            <h5 className="card-title">Order Id: {order._id}</h5>
            <p className="card-text">Pizza: {order.pizza}</p>
            <p className="card-text">Toatal Price: {order.totalPrice}</p>

            <div className="d-flex justify-content-between align-items-center">
              {/* <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>Delete</button> */}
              <select
                className="form-select"
                onChange={(e) => setUpdatedOrder({ status: e.target.value })}
              >
                 <option value="pending" selected={order.status === 'pending'}>pending</option>
      <option value="order received" selected={order.status === 'order received'}>order received</option>
      <option value="in the kitchen"  selected={order.status === 'in the kitchen'}>in the kitchen</option>
      <option value="sent to delivery" selected={order.status === 'sent to delivery'}>sent to delivery</option>
              </select>
              <button className="btn btn-primary" onClick={() => updateOrder(order._id)}>Update</button>
            </div>
          </div>
        </div>
        </div>

      ))}
    </div>
    </div>
    </div>
    </Base>

  );
}

export default Order;
