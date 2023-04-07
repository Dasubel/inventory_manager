import { useLocation } from "react-router-dom";
import React from "react";

const Item = () => {
    const { state } = useLocation();
    const { item, description, quantity } = state;

    return (
        <div>
            <li>Item: {item}</li>
            <div>Description: {description}</div>
            <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                Quanitity: {quantity}
            </div>
        </div>
    )
}

export default Item