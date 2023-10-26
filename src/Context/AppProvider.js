import React, { createContext, useContext, useEffect, useState } from "react";

import VeggieSupremePizza from '../images/Veggie Supreme Pizza.jpg';
import MargheritaPizza from '../images/Margherita Pizza.jpg';
import PaneerTikkaPizza from '../images/Paneer Tikka Pizza.jpg'; 
import DeluxeVeggiePizza from '../images/Deluxe Veggie Pizza.jpg';
import CheeseBurstPizza from '../images/Cheese Burst Pizza.jpg';
import MushroomPizza from '../images/Mushroom Pizza.jpg';
import ChickenTikkaPizza from '../images/Chicken Tikka Pizza.jpg';
import FarmhousePizza from '../images/Farmhouse Pizza.jpg'; 
import PepperoniPizza from '../images/Pepperoni Pizza.jpg'; 
import TandooriChickenPizza from '../images/Tandoori Chicken Pizza.jpg'; 

const MenuCtx = createContext(null);

function AppProvider({ children }) {
  const [pizzaName,setPizzaName]=useState({
    'Veggie Supreme Pizza': { name: VeggieSupremePizza },
    'Margherita Pizza': { name: MargheritaPizza },
    'Paneer Tikka Pizza': { name: PaneerTikkaPizza },
    'Deluxe Veggie Pizza': { name: DeluxeVeggiePizza },
    'Cheese Burst Pizza': { name: CheeseBurstPizza },
    'Mushroom Pizza': { name: MushroomPizza },
    'Chicken Tikka Pizza': { name: ChickenTikkaPizza },
    'Farmhouse Pizza': { name: FarmhousePizza },
    'Pepperoni Pizza': { name: PepperoniPizza },
    'Tandoori Chicken Pizza': { name: TandooriChickenPizza },
  })
  const [receipt,setReceipt]=useState({});
  const [menuData, setMenuData] = useState([]);
  const [pizzaCustomizationOptions, setPizzaCustomizationOptions] = useState([]);
  const [id, setId]=useState(0);
  const [role,setRole]=useState("");
  const [roleName,setRoleName]=useState("");
  const [selectedRole, setSelectedRole] = useState('admin');
  let [roleObject,setRoleObject]=useState({
    role:"",
    roleName:""
  });
  const [count,setCount]=useState(0);



  async function fetchMenu() {
    try {
      const response = await fetch("https://pizza-express-rho.vercel.app/menu/all");
      const result = await response.json();
      setMenuData(result);
      console.log("from fetchMenu")
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

  async function fetchCustomizationOptions() {
    try {
      const response = await fetch("https://pizza-express-rho.vercel.app/menu/customise");
      const result = await response.json();
      setPizzaCustomizationOptions(result[0]);
      // console.log("Pizza",pizzaCustomizationOptions[0]);
    } catch (error) {
      console.error("Error fetching customization options:", error);
    }
  }
  if (pizzaCustomizationOptions) {
}
  useEffect(() => {
    fetchMenu();
    fetchCustomizationOptions();
    // console.log("s# edu:", menuData)
  }, []);
  

  return (
    <MenuCtx.Provider value={{
      count,
      setCount,
      receipt, 
      setReceipt,
      pizzaName, 
      menuData, 
      pizzaCustomizationOptions, 
      id, 
      setId, 
      role, 
      setRole, 
      roleName, 
      setRoleName, 
      roleObject, 
      setRoleObject,
      selectedRole,
      setSelectedRole,
      fetchMenu,
      fetchCustomizationOptions}}>
      {children}
    </MenuCtx.Provider>
  );
}

export { MenuCtx };

export default AppProvider;
