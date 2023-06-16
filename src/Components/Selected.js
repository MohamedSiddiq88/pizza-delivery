import React, { useState } from 'react'



function Selected() {
  const [amount,setAmount]=useState('');
  function handelsubmit(e){
    e.preventDefault();
    if(amount === ""){
      alert("please enter amount")
    }else{
      var options ={
        key:"rzp_test_AZtBDE1RVrUHtL",
        key_secret:"stJ0YaDajJetkFtmG8375jXk",
        amount:amount*100,
        currency:"INR",
        name:"Pizza deliver",
        description:"for testing purpose",
        handler: function(response){
          alert(response.razorpay_payment_id);
        },
        prefill:{
          name:"siddiq",
          email:"diddiq88@gmail.com",
          contact:"8870081217"
        },
        notes:{
          address:"Razorpay corporate office"
        },
        theme:{
          color:"#121212"
        }
      };
      var pay=new window.Razorpay(options);
      pay.open();
    }
  }
  return (
    <div>
      <h1>razorPay</h1><br></br><br></br>
      <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)}></input><br></br><br></br>
      <button onClick={handelsubmit}>submit</button>
    </div>
  )
}

export default Selected

/*

import React, { useState, useContext } from 'react';

import { MenuCtx } from '../Context/AppProvider';
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Customise() {
  const [selectedOptions, setSelectedOptions] = useState({});
  let history = useHistory();
  const { pizzaCustomizationOptions, menuData, id } = useContext(MenuCtx);



  if (pizzaCustomizationOptions.length === 0) {
    return <div>Loading...</div>;
  }


  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setSelectedOptions((prevOptions) => {
      const prevSelectedOptions = prevOptions[name] || [];
      let updatedSelectedOptions;

      if (checked) {

        updatedSelectedOptions = [...prevSelectedOptions, value];
      } else {
        updatedSelectedOptions = prevSelectedOptions.filter(
          (option) => option !== value
        );
      }

      return {
        ...prevOptions,
        [name]: updatedSelectedOptions.length > 0 ? updatedSelectedOptions : null,
      };
    });
  };

  const calculateTotalPrice = () => {
    console.log("pizzaCustomizationOptions", pizzaCustomizationOptions)
    let totalPrice = menuData[id].price;
    let freeVeggieCount = 0;
    let freeMeatCount = 0;

    Object.entries(selectedOptions).forEach(([optionType, options]) => {
      if (options) {
        options.forEach((option) => {
          const selectedOption = pizzaCustomizationOptions[optionType].find(
            (item) => item.name === option
          );
          if (selectedOption) {
            if (optionType === "veggies" && freeVeggieCount < 3) {
              freeVeggieCount++;
            } else if (optionType === "meat" && freeMeatCount === 0) {
              freeMeatCount++;
            } else {
              totalPrice += selectedOption.price;
            }
          }
        });
      }
    });

    return totalPrice.toFixed(2);
  };

  const orderData = {
    pizza: menuData[id].itemname,
    status: "pending",
    totalPrice: calculateTotalPrice(),
  };


  const handleOrder = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://pizza-express-rho.vercel.app/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        var options = {
          key: "rzp_test_AZtBDE1RVrUHtL",
          key_secret: "stJ0YaDajJetkFtmG8375jXk",
          amount: calculateTotalPrice() * 100,
          currency: "INR",
          name: "Pizza deliver",
          description: "for testing purpose",
          handler: function (response) {
            history.push("/userorder")
            alert(response.razorpay_payment_id);
          },
          prefill: {
            name: "siddiq",
            email: "diddiq88@gmail.com",
            contact: "8870081217"
          },
          notes: {
            address: "Razorpay corporate office"
          },
          theme: {
            color: "#121212"
          }
        };
        var pay = new window.Razorpay(options);
        pay.open();
        console.log("Order created:", data);
        // Reset selected options or perform any necessary actions
        setSelectedOptions({});
      } else {

        console.log("Order created:", orderData);

        // Handle the error response accordingly
      }
    } catch (error) {
      console.log("Order created:", orderData);
      console.log("Error:", error);
      // Handle any other errors that occur during the request
    }
  };

  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!isAuthenticated || role !== 'user') {
    history.push('/login');
    return null;
  }

  return (
    <Base>

      <form onSubmit={(e) => (handleOrder(e))}>
        <div className='container'>

          <h2>Customize Your {menuData[id].itemname}</h2>
          <div className="card mt-4">
            <div className="card-body">
              <h3>Pizza Base</h3>
              {pizzaCustomizationOptions.pizzaBase.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    required
                    className="form-check-input"
                    type="checkbox"
                    id={`pizzaBase-${index}`}
                    name="pizzaBase"
                    disabled={!(selectedOptions.pizzaBase?.includes(option.name)) && (selectedOptions.pizzaBase?.length || 0) || !(option.quantity) ? true : false}
                    value={option.name}
                    checked={selectedOptions.pizzaBase?.includes(option.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`pizzaBase-${index}`}
                  >
                    <strong>{option.name}</strong> -{' '}
                    <span className="text-primary font-weight-bold">
                    ₹{option.price.toFixed(2)}
                    </span>
                    <span className="text-danger ">
                      {' '}{(option.quantity==0)?"Not available":null}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h3>Sauce</h3>
              {pizzaCustomizationOptions.sauce.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`sauce-${index}`}
                    name="sauce"
                    value={option.name}
                    checked={selectedOptions.sauce?.includes(option.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor={`sauce-${index}`}>
                    <strong>{option.name}</strong> -{' '}
                    <span className="text-primary font-weight-bold">
                      ${option.price.toFixed(2)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h3>Cheese</h3>
              {pizzaCustomizationOptions.cheese.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`cheese-${index}`}
                    name="cheese"
                    value={option.name}
                    checked={selectedOptions.cheese?.includes(option.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor={`cheese-${index}`}>
                    <strong>{option.name}</strong> -{' '}
                    <span className="text-primary font-weight-bold">
                      ${option.price.toFixed(2)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h3>Veggies</h3>
              {pizzaCustomizationOptions.veggies.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`veggies-${index}`}
                    name="veggies"
                    value={option.name}
                    checked={selectedOptions.veggies?.includes(option.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor={`veggies-${index}`}>
                    <strong>{option.name}</strong> -{' '}
                    <span className="text-primary font-weight-bold">
                      ${option.price.toFixed(2)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h3>Meat</h3>
              {pizzaCustomizationOptions.meat.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`meat-${index}`}
                    name="meat"
                    value={option.name}
                    checked={selectedOptions.meat?.includes(option.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor={`meat-${index}`}>
                    <strong>{option.name}</strong> -{' '}
                    <span className="text-primary font-weight-bold">
                      ${option.price.toFixed(2)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <h3>Selected Options:</h3>
          <ul>
            {Object.keys(selectedOptions).map((optionType) => (
              <li key={optionType}>
                <strong>{optionType}:</strong>{' '}
                {selectedOptions[optionType]?.join(', ')}
              </li>
            ))}
          </ul>

          <h3 className="font-weight-bold mt-4">
            Total Price: ${calculateTotalPrice()}
          </h3>
          <button className='btn btn-success mt-4' type='submit'>
            Order
          </button>
        </div>
      </form>
    </Base>

  );
}

export default Customise;

*/ 