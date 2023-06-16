import React from "react"
import './Base.css';
import { useHistory } from 'react-router-dom'
import Navbar from "./Navbar";



function Base({ title, heading, children }) {

    const history=useHistory();


    return (

        // container
        <div className="container-fluid base">


            <div className="row">

                



                <div className=" page col">
                    {/* header */}
                    <header className="header">
                        <Navbar></Navbar>
                    </header>


                    {/* main-content */}
                    <main className="main-content">
                    <h1 className="heading"><b>{heading}</b></h1>
                        <div className="main-page">
                            {children}
                        </div>
                    </main>

                </div>{/* col*/}
            </div>{/* row*/}
        </div>//base
    );

}



export default Base