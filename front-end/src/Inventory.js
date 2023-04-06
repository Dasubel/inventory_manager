import React, { useState, useEffect } from "react";
import { Button, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from "react-router-dom";
var managerInventory = [];

const Inventory = () => {
    const [inventory, setInventory] = useState()
    const [itemName, setItemName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [itemToDelete, setItemToDelete] = useState();
    const { state } = useLocation();
    const { userType, username, password, manager_Id } = state;
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8081/inventory")
            .then((res) => res.json())
            .then((data) => {
                managerInventory = [];
                for (let i = 0; i < data.length; i++) {
                    if (manager_Id === data[i].manager_id) {
                        managerInventory.push(data[i])
                    }
                }
                setInventory(data)
            })
    }, [added, deleted]);

    const addItem = (itemName, Desc, Q, manager) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: itemName, description: Desc, quantity: Q, manager_Id: manager })
        };
        fetch("http://localhost:8081/inventory", requestOptions)
            .then(() => fetch("http://localhost:8081/inventory")
                .then((res) => res.json())
                .then((data) => {
                    setInventory(data)
                }))
        alert('Item added to your inventory!')
        setAdded(true);
        window.location.reload();
    }

    const deleteItem = (itemNameToDelete) => {
        fetch("http://localhost:8081/inventory")
            .then((res) => res.json())
            .then((data) => {
                let found = false;
                for (let i = 0; i < data.length; i++) {
                    if (itemNameToDelete === data[i].name) {
                        found = true;
                    }
                }
                if (found === true) {
                    for (let i = 0; i < data.length; i++) {
                        if (itemNameToDelete === data[i].name && manager_Id === data[i].manager_id) {
                            const requestOptions = {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name: itemNameToDelete })
                            };
                            fetch("http://localhost:8081/inventory", requestOptions)
                                .then(() => fetch("http://localhost:8081/inventory")
                                    .then((res) => res.json())
                                    .then((data) => {
                                        setInventory(data)
                                    }))
                            alert(`${itemNameToDelete} was removed from the database successfully.`)
                            setDeleted(true)
                            window.location.reload();
                            return;
                        }
                    }
                    alert('That item does not belong to you, leave it alone!')
                } else {
                    alert('Item was not found in the database')
                }
            })
    }

    const viewDetails = (item, desc, q) => {
        navigate(`/inventory/${item}`, {
            state:
            {
                username: username,
                password: password,
                item: item,
                description: desc,
                quantity: q
            }
        })
    }

    const editItem = (item) => {
        navigate(`/inventory/edit/${item}`)
    }

    return (
        <Container>
            YOUR INVENTORY:
            {manager_Id === null ?
                <div>None, you're a guest!</div>
                : <></>}
            <br></br>
            {managerInventory?.map(items =>
                <div key={items.id}>
                    <li>Item: {items.name}</li>
                    {items.description.length > 99 ?
                        <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Description: {`${items.description.substring(0, 100)}...`}</p>
                        : <p>Description: {items.description}</p>}
                    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Quanitity: {items.quantity}</p>
                    <center><Button onClick={() => viewDetails(items.name, items.description, items.quantity)}>Additional Details</Button></center>
                    {userType ?
                        <center><Button onClick={() => editItem(items.name)}>Edit Item</Button></center>
                        : <></>}
                </div>
            )}
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
            <br></br>
            {userType ? <div>
                Add something new!
                <center><input type="text" id="createItem" placeholder="Item Name" onChange={e => setItemName(e.target.value)} /></center>
                <center><input type="text" id="createDesc" placeholder="Description" onChange={e => setDescription(e.target.value)} /></center>
                <center><input type='text' id="createQ" placeholder="Quantity" onChange={e => setQuantity(e.target.value)} /></center>
                <center><Button onClick={() => addItem(itemName, description, quantity, manager_Id)}>Add Item!</Button></center>
                Don't like that item? Remove it!
                <center><input type='text' id="deleteItem" placeholder="Item Name to Delete" onChange={e => setItemToDelete(e.target.value)} /></center>
                <center><Button onClick={() => deleteItem(itemToDelete)}>Delete Item!</Button></center>
            </div>
                : <></>}
        </Container>
    )
}

export default Inventory;