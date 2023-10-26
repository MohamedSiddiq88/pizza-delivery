import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setToken } from '../Authendication/auth';
import Navbar from '../Base/Navbar';
import { MenuCtx } from '../Context/AppProvider';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import scooter from './scooter1.gif'

function Login() {
  const {role, setRole, setRoleObject, roleObject, selectedRole, setSelectedRole} = useContext(MenuCtx);
  // const [selectedRole, setSelectedRole] = useState('admin');
  const navigate=useHistory();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = () => {
    // login logic based on the selected role
    if (selectedRole === 'admin') {
      // admin login logic
      run();
        async function run() {
            // console.log("hello")
            const usreInfo={
                email,
            password,
            }
            const res= await fetch(`https://pizza-express-rho.vercel.app/admin/login`,{
            method : "POST",
            body:JSON.stringify(usreInfo),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data=await res.json();
        

        if(data.data=="invalid"){
        alert("invalid email / password ")
        }else{
          localStorage.setItem("token",data.data)
        localStorage.setItem("roleName",data.name)
        localStorage.setItem("role",'admin')
        navigate.push("/inventory")
        }
        // console.log("data",data);
        // console.log(JSON.stringify(usreInfo));
        }
    } else if (selectedRole === 'user') {
        run();
        async function run() {
            const usreInfo={
                email,
            password,
            }
            const res= await fetch(`https://pizza-express-rho.vercel.app/users/login`,{
            method : "POST",
            body:JSON.stringify(usreInfo),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data=await res.json();
        if(data.data=="invalid"){
          alert("invalid email / password ")
          }else{
            localStorage.setItem("token",data.data)
        localStorage.setItem("roleName",data.name)
        localStorage.setItem("role",'user')
        navigate.push("/")
          }
        
       
        }
    }
  };

 

  return (
    <div className="container mt-5 login_div">
      <div className="row">
        <div className="col-md-6 mx-auto login_container">
          <div className="text-center ">
            <button
              className={`btn btn-outline-primary ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
              style={{ width: '50%' }}
            >
              Admin
            </button>
            <button
              className={`btn btn-outline-primary ${selectedRole === 'user' ? 'active' : ''}`}
              onClick={() => handleRoleChange('user')}
              style={{ width: '50%' }}
            >
              User
            </button>
          </div>
          <div className="card">
            <div className="card-body">
              {selectedRole === 'admin' ? (
                <div>
                  <h5 className="card-title">Admin Login</h5>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" id="email" className="form-control" name="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" className="form-control" name="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                  <div className="form-group text-center">
                  <Link to="/mailcheck" className="ml-3">Forgot Password?</Link>
                  </div>
                  <div className="form-group d-grid gap-2 text-center">
                  <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
</div>
                  
              <div className="text-center">
                <p className="mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
                </div>
              ) : (
                <div>
                  <h5 className="card-title">User Login</h5>
                  <div className="form-group">
                    <label>Email</label>
          <input type="email" id="email" className="form-control" name="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
          <input type="password" id="password" className="form-control" name="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                  <div className="form-group d-grid gap-2 text-center">
                  <Link to="/mailcheck" className="ml-3">Forgot Password?</Link>
                  </div>
                  <div className="form-group d-grid gap-2 text-center">
                  <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
                  </div>
                  

              <div className="text-center">
                <p className="mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
                </div>
                
              )}
              
            </div>
          </div>
        </div>
      </div>

<img src={scooter} alt='scooter gif'/>

    </div>
  );
}

export default Login;
