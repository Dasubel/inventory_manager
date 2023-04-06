import { useParams } from "react-router-dom";
import React from "react";

const Item = () => {
    const routeParams = useParams();
    const { username, password, item, description, quantity } = routeParams
    console.log(routeParams)
    return (
        <li>
            <p>Item: {item}</p>
            <p style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>Full Description: {description}</p>
            <p>Quantity: {quantity}</p>
        </li>
    )
}

export default Item