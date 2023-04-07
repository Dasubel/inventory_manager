import { useLocation } from "react-router-dom";
import React, { useState } from "react";

const Item = () => {
    const { state } = useLocation();
    const { username, password, item, description, quantity, userType, id, editable } = state;
    const [edit, setEdit] = useState(false)

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