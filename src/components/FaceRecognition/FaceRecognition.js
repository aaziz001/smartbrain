import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, coords}) => {
    let boxes = <div></div>
    if(coords){
        boxes = coords.map((coord) => {
            return (
                <div className = 'boundary-box' style = {{top: coord.topRow, left: coord.leftCol, right: coord.rightCol, bottom: coord.bottomRow}}></div>
            )
        })
    }
    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img id = 'image' src = {imageURL} alt ='' width = '500px' height = 'auto'/>
                {boxes}
            </div>
        </div>
    )
}

export default FaceRecognition;