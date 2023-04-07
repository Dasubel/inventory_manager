import { useLocation } from "react-router-dom";
import React from "react";
import './Item.css'

const Item = () => {
    const { state } = useLocation();
    const { item, description, quantity } = state;

    return (
        <div className="background">
            <li>Item: {item}</li>
            <div>Description: {description}</div>
            <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                Quanitity: {quantity}
            </div>
        </div>
    )
}

export default Item