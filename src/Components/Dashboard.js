import React, { useContext, useState } from 'react';
import { MenuCtx } from "../Context/AppProvider";
import { useHistory } from 'react-router-dom';
import { getToken } from '../Authendication/auth';
import Base from '../Base/Base';

// import VeggieSupremePizza from '../images/Veggie Supreme Pizza.jpg';
// import MargheritaPizza from '../images/Margherita Pizza.jpg';
// import PaneerTikkaPizza from '../images/Paneer Tikka Pizza.jpg'; 
// import DeluxeVeggiePizza from '../images/Deluxe Veggie Pizza.jpg';
// import CheeseBurstPizza from '../images/Cheese Burst Pizza.jpg';
// import MushroomPizza from '../images/Mushroom Pizza.jpg';
// import ChickenTikkaPizza from '../images/Chicken Tikka Pizza.jpg';
// import FarmhousePizza from '../images/Farmhouse Pizza.jpg'; 
// import PepperoniPizza from '../images/Pepperoni Pizza.jpg'; 
// import TandooriChickenPizza from '../images/Tandoori Chicken Pizza.jpg'; 





function Dashboard() {
  // const [pizzaName,setPizzaName]=useState([VeggieSupremePizza, MargheritaPizza, PaneerTikkaPizza, DeluxeVeggiePizza, CheeseBurstPizza, MushroomPizza, ChickenTikkaPizza, FarmhousePizza, PepperoniPizza, TandooriChickenPizza, MushroomPizza, FarmhousePizza, ChickenTikkaPizza, MargheritaPizza, PepperoniPizza, TandooriChickenPizza, PaneerTikkaPizza, DeluxeVeggiePizza, VeggieSupremePizza, CheeseBurstPizza])
  const history=useHistory();
  const {menuData, setId, pizzaName} = useContext(MenuCtx);

  // check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (!isAuthenticated || role!=='user') {
    history.push('/login');
    return null;
  }




  if (menuData.length === 0) {
    return <div>Loading...</div>;
  }
  


  return (
    <Base>

    <div className='container'>
      <div className="container">
        <div className="row">
          {menuData.map((item, index) => (
            <div className="col-md-6" key={index}>
              <div className="card mt-4 pizza-card">
                <div className="card-body">
                  <div className='col'>
                  <img className='pizza-img' src={pizzaName[item.itemname].name}/>
                  </div>
                  <div className='col'>
                  <div className='pizza_detail_div'>
                  <h5 className="card-title">{item.itemname}</h5>
                  <p className="card-text">Price: ₹{item.price}</p>
                  <button className="btn btn-success" onClick={()=>{history.push(`/customise/${item._id}`); setId(index)}}>Customise Your Pizza</button>
                  </div>
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

export default Dashboard;
