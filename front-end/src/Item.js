import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Button } from 'react-bootstrap'

const Item = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { username, password, item, description, quantity, userType, id, editable } = state;
    const [editItemName, setEditItemName] = useState();
    const [editDescription, setEditDescription] = useState();
    const [editQuantity, setEditQuantity] = useState();
    const [edit, setEdit] = useState(false)
    const [inventory, setInventory] = useState()

    // const patchItem = (itemInInventory, item, desc, q) => {
    //     const requestOptions = {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ itemToUpdate: itemInInventory, name: item, description: desc, quantity: q })
    //     };
    //     fetch("http://localhost:8081/inventory", requestOptions)
    //         .then(() => fetch("http://localhost:8081/inventory")
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 setInventory(data)
    //                 for (let i = 0; i < data.length; i++) {
    //                     if (data[i].id === id) {
    //                         displayName = (data[i].name);
    //                         displayDesc = (data[i].description);
    //                         displayQ = (data[i].quantity);
    //                     }
    //                 }
    //                 console.log(displayDesc, displayName, displayQ)
    //             }))
    //     alert('Item has been edited!!')
    //     setEdit(false)
    //     navigate(`/inventory/`, {
    //         state:
    //         {
    //             username: username,
    //             password: password,
    //             item: displayName,
    //             description: displayDesc,
    //             quantity: displayQ,
    //             userType: userType,
    //             id: id,
    //             edited: true
    //         }
    //     })
    // }

    return (
        <div>
            <li>Item: {item} {edit ? <center><input type="text" id="editItem" placeholder="Change Name" onChange={e => setEditItemName(e.target.value)} /></center> : <></>}</li>
            <div>Description: {description} {edit ? <center><input type="text" id="editDesc" placeholder="Change Description" onChange={e => setEditDescription(e.target.value)} /></center> : <></>}</div>
            <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                Quanitity: {quantity} {edit ? <center><input type='text' id="editQ" placeholder="Change Quantity" onChange={e => setEditQuantity(e.target.value)} /></center> : <></>}
            </div>
        </div>
    )
}

export default Item