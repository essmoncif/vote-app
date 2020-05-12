import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Navbar extends Component {


    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-light rounded">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample10"
              aria-controls="navbarsExample10"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
    
            <div
              className="collapse navbar-collapse justify-content-md-center"
              id="navbarsExample10"
            >
              <ul className="navbar-nav">
                <li className="btn alert-warning nav-item">
                  
                    <Link to="/settings">Security setting</Link>
                  
                </li>
                <li className="btn alert-warning nav-item">

                    <Link to="/profile">Profile</Link>
                    
                </li>
              </ul>
              
            </div>
          </nav>
        );
    }

}

export default Navbar;