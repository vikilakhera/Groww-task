import React from "react";
import "./headers.css";
import { Link } from "react-router-dom";

const routesMap = [
  ["All Banks", "/all-banks"],
  ["Favorites", "/favorites"]
]

function Header (){
  return(
    <div className="header-wrapper">
      {
        routesMap.map(route => (
          <div className="header-item">
            <Link to={route[1]}>
              {route[0]}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Header;