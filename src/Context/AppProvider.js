import React, { createContext, useContext, useEffect, useState } from "react";

const MenuCtx = createContext(null);

function AppProvider({ children }) {
  const [menuData, setMenuData] = useState([]);
  const [pizzaCustomizationOptions, setPizzaCustomizationOptions] = useState([]);
  const [id, setId]=useState(0);
  const [role,setRole]=useState("");
  const [roleName,setRoleName]=useState("");
  let [roleObject,setRoleObject]=useState({
    role:"",
    roleName:""
  });


  async function fetchMenu() {
    try {
      const response = await fetch("https://pizza-express-rho.vercel.app/menu/all");
      const result = await response.json();
      setMenuData(result);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

  async function fetchCustomizationOptions() {
    try {
      const response = await fetch("https://pizza-express-rho.vercel.app/menu/customise");
      const result = await response.json();
      setPizzaCustomizationOptions(result[0]);
      console.log("Pizza",pizzaCustomizationOptions[0]);
    } catch (error) {
      console.error("Error fetching customization options:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
    fetchCustomizationOptions();
  }, []);

  return (
    <MenuCtx.Provider value={{ menuData, pizzaCustomizationOptions, id, setId, role, setRole, roleName, setRoleName, roleObject, setRoleObject }}>
      {children}
    </MenuCtx.Provider>
  );
}

export { MenuCtx };

export default AppProvider;
