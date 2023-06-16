import React, { useContext, useState } from 'react';
import { MenuCtx } from '../Context/AppProvider';
import Base from '../Base/Base';

function ManagementSystem() {
  const { pizzaCustomizationOptions } = useContext(MenuCtx);

  const [editingBaseIndex, setEditingBaseIndex] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState('');

  
  if (pizzaCustomizationOptions.length === 0) {
    return <div>Loading...</div>;
  }

  // calculate total quantities
  const totalBaseQuantity = pizzaCustomizationOptions.pizzaBase.reduce((total, item) => total + item.quantity, 0);
  const totalSauceQuantity = pizzaCustomizationOptions.sauce.reduce((total, item) => total + item.quantity, 0);
  const totalCheeseQuantity = pizzaCustomizationOptions.cheese.reduce((total, item) => total + item.quantity, 0);
  const totalVeggieQuantity = pizzaCustomizationOptions.veggies.reduce((total, item) => total + item.quantity, 0);
  const totalMeatQuantity = pizzaCustomizationOptions.meat.reduce((total, item) => total + item.quantity, 0);

  const handleEdit = (index) => {
    setEditingBaseIndex(index);
    setUpdatedQuantity(pizzaCustomizationOptions.pizzaBase[index].quantity.toString());
  };

  const handleUpdate = async (index) => {
    const newQuantity = parseInt(updatedQuantity);
  
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      const selectedBase = pizzaCustomizationOptions.pizzaBase[index].name;
      const updatedMenuItem = { quantity: newQuantity };
      const requestBody = { name: selectedBase, updatedMenuItem };
  
      try {
        const response = await fetch('https://pizza-express-rho.vercel.app/menu/customise/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const updatedBases = [...pizzaCustomizationOptions.pizzaBase];
          updatedBases[index].quantity = newQuantity;
          setEditingBaseIndex(null);
        } else {
          console.log("Bad");
        }
      } catch (error) {
        console.log("Error",error);
      }
    }
  };
  

  const handleCancel = () => {
    setEditingBaseIndex(null);
    setUpdatedQuantity('');
  };



  return (
    <Base>
      <div className="container">
        <h2>Inventory Summary</h2>

        {/* Base Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={totalBaseQuantity < 20 ? 'table-danger' : ''}>
              <td>Base</td>
              <td>{totalBaseQuantity}</td>
              <td>{totalBaseQuantity < 20 ? 'Base less than 20' : ''}</td>
            </tr>
            {pizzaCustomizationOptions.pizzaBase.map((ele, index) => (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td>
                  {editingBaseIndex === index  ? (
                    <input type="text" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)} />
                  ) : (
                    <input type="text" value={ele.quantity} readOnly />
                  )}
                </td>
                <td>
                  {editingBaseIndex === index  ? (
                    <>
                      <button className="btn btn-success" onClick={() => handleUpdate(index )}>
                        Update
                      </button>
                      <button className="btn btn-danger" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEdit(index )}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* Sauce Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className={totalSauceQuantity < 20 ? 'table-danger' : ''}>
              <td>Sauce</td>
              <td>
                <input type="text" value={totalSauceQuantity} readOnly />
              </td>
            </tr>
            {pizzaCustomizationOptions.sauce.map((ele) => (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td>
                  <input type="text" value={ele.quantity} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cheese Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className={totalCheeseQuantity < 20 ? 'table-danger' : ''}>
              <td>Cheese</td>
              <td>
                <input type="text" value={totalCheeseQuantity} readOnly />
              </td>
            </tr>
            {pizzaCustomizationOptions.cheese.map((ele) => (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td>
                  <input type="text" value={ele.quantity} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Veggies Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className={totalVeggieQuantity < 20 ? 'table-danger' : ''}>
              <td>Veggies</td>
              <td>
                <input type="text" value={totalVeggieQuantity} readOnly />
              </td>
            </tr>
            {pizzaCustomizationOptions.veggies.map((ele) => (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td>
                  <input type="text" value={ele.quantity} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Meat Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Meat</td>
              <td>
                <input type="text" value={totalMeatQuantity} readOnly />
              </td>
            </tr>
            {pizzaCustomizationOptions.meat.map((ele) => (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td>
                  <input type="text" value={ele.quantity} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Base>
  );
}
export default ManagementSystem;