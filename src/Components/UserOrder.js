import React, { useState, useEffect, useContext } from 'react';
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { MenuCtx } from '../Context/AppProvider';

function UserOrder() {
  const [orders, setOrders] = useState([]);
  let history=useHistory();
  const {pizzaName} = useContext(MenuCtx);

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
  
  if (!isAuthenticated || role!=='user') {
    history.push('/login');
    return null; 
  }

  return (
    <Base>
    <div className='container'>
      <h1>Orders</h1>

      
      <h2>All Orders</h2>
      <div className='container'>
        <div className='row'>
          {orders.map((order) => (
            <div className='col-md-6' key={order._id}>
              <div className='card mb-3 order-card'>
                <div className='card-body'>
                 <div className='col'>
                 <img src={pizzaName[order.pizza].name} className='pizza-img'/>
                  <p className='card-text'>Status: {order.status}</p>
                  <p className='card-text'>Toatal Price: ₹{order.totalPrice}</p>

                  </div> 
                  <div className='col'>
                  <h2 className='card-title'>{order.pizza}</h2>
                  <h3>Toppings</h3>
                  <ul>
            {(order.toppings)?Object.keys(order.toppings).map((optionType) => (
              <li key={optionType}>
                <strong>{optionType}:</strong>{' '}
                {order.toppings[optionType]?.join(', ')}
              </li>
            )):null}
          </ul>  
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

export default UserOrder;
