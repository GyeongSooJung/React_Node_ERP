import React, { Component, useEffect } from 'react';
import axios from 'axios'

function NavBar() {
    
    useEffect(() => {
	   		axios.get('/api/hello')
	   		.then(response => console.log(response.data))
	   }, [])
	   
	   
    return (
        <div>
            NavBar
        </div>
    )
}

export default NavBar;