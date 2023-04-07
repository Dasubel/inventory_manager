import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'

const All = () => {
    const [inventory, setInventory] = useState()
    const [itemName, setItemName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const { state } = useLocation();
    const { userType, username, password, manager_Id, edited } = state;
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8081/inventory")
            .then((res) => res.json())
            .then((data) => setInventory(data))
    }, []);

    const viewDetails = (item, desc, q, itemId, managerId) => {
        navigate(`/inventory/${item}`, {
            state:
            {
                username: username,
                password: password,
                item: item,
                description: desc,
                quantity: q,
                userType: userType,
                id: itemId,
            }
        })
    }

    return (
        <div>
        All INVENTORY:
        {inventory?.map(items =>
            <div key={items.id}>
                <li>Item: {items.name}</li>
                {items.description.length > 99 ?
                    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Description: {`${items.description.substring(0, 100)}...`}</p>
                    : <p>Description: {items.description}</p>}
                <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Quanitity: {items.quantity}</p>
                <center><Button onClick={() => viewDetails(items.name, items.description, items.quantity)}>Additional Details</Button></center>
            </div>
        )}
        </div>
    )
}

export default All;