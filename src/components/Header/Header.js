import React from 'react'
import { Link } from 'react-router-dom';
import "./Styles.css"

const headerName = "{Okta} Demo";
export default ({status}) => {
  return (
    <div className="header-container">
      <div className="header-content-icon">
        <img src={'https://avatars1.githubusercontent.com/u/362460?s=200&v=4'} 
              alt="Boohoo"
              width="50"
              height="50" />
      </div>
      <div className="header-content-title">
        <h3>{headerName}</h3>
      </div>
      <div className="header-content-status">
        <h3>Login Status</h3>
        { status ? <h4>Logged On</h4> : <h4>Sign Up</h4>}
      </div>
    </div>
  )
}
