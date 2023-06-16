import './App.css';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from './Components/Dashboard';
import { useContext } from 'react';
import { MenuCtx } from './Context/AppProvider';
import Customise from './Components/Customise';
import Selected from './Components/Selected';
import Login from './Components/login';
import Signup from './Components/signup';
import ManagementSystem from './Components/ManagementSystem';
import Order from './Components/Order';
import UserOrder from './Components/UserOrder';


function App() {
  let { menuData,pizzaCustomizationOptions } = useContext(MenuCtx);



  console.log("app",menuData);
  console.log("appzz",pizzaCustomizationOptions);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Dashboard></Dashboard>
        </Route>
        <Route  path="/customise">
          <Customise></Customise>
        </Route>
        <Route  path="/inventory">
          <ManagementSystem></ManagementSystem>
        </Route>
        <Route  path="/login">
          <Login></Login>
        </Route>
        <Route  path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/order">
          <Order></Order>
        </Route>
        <Route path="/userorder">
          <UserOrder></UserOrder>
        </Route>
        <Route path="/select">
          <Selected></Selected>
        </Route>
        </Switch>
    </div>
  );
}

export default App;
