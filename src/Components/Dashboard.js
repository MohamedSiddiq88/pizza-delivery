import React, { useContext } from 'react';
import { MenuCtx } from "../Context/AppProvider";
import { useHistory } from 'react-router-dom';
import { getToken } from '../Authendication/auth';
import Base from '../Base/Base';

function Dashboard() {
  const history=useHistory();
  const {menuData, setId} = useContext(MenuCtx);

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
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">{item.itemname}</h5>
                  <p className="card-text">Price: ₹{item.price}</p>
                  <button className="btn btn-success" onClick={()=>{history.push(`/customise/${item._id}`); setId(index)}}>Customise Your Deal</button>
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
