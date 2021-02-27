import React from 'react'
import Tilt from 'react-tilt';
import './Logo.css'
import face from './face.png'

const Logo = () => {
    return (
        <div style = {{marginLeft: '10px'}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> <img style = {{paddingTop: '5px'}} src = {face} alt = 'logo'/></div>
            </Tilt>
        </div>
    )
}

export default Logo;
