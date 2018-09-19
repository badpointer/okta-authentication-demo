import React from 'react'
import {Link} from 'react-router-dom';
import "./Styles.css"

const headerName = "{Okta} Demo";
export default () => {
  return (
    <div className="header-container">
        <div>
            <h3>{headerName}</h3>
        </div>
    </div>
  )
}
