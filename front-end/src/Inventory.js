import React, { useState, useEffect } from "react";
import { Button, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from "react-router-dom";

const Inventory = () => {
    const [inventory, setInventory] = useState()
    const [itemName, setItemName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [itemToDelete, setItemToDelete] = useState();
    const [personalInventory, setPersonalInventory] = useState();
    const [edit, setEdit] = useState(false)
    const [editItemName, setEditItemName] = useState();
    const [editDescription, setEditDescription] = useState();
    const [editQuantity, setEditQuantity] = useState();
    const [itemToEdit, setItemToEdit] = useState();
    var managerInventory = [];
    const { state } = useLocation();
    console.log(state)
    const { userType, username, password, manager_Id, edited } = state;
    const navigate = useNavigate();
    let editable = false;

    useEffect(() => {
        fetch("http://localhost:8081/inventory")
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (manager_Id === data[i].manager_id) {
                        console.log('here')
                        managerInventory.push(data[i])
                    }
                }
                setPersonalInventory(managerInventory)
            })
    }, []);



    const addItem = (itemName, Desc, Q, manager) => {
        if (typeof itemName !== undefined && Desc !== undefined && isNaN(Q) === false) {
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
        } else {
            alert(`Check your inputs!`)
        }
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

    const viewDetails = (item, desc, q, itemId, managerId) => {
        if (managerId === manager_Id) {
            editable = true;
        }
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
                editable: editable
            }
        })
    }

    const viewAll = (item, desc, q, itemId, managerId) => {
        navigate(`/inventory/all`, {
            state:
            {
                username: username,
                password: password,
                item: item,
                description: desc,
                quantity: q,
                userType: userType,
                id: itemId,
                editable: editable
            }
        })
    }

    const patchItem = (itemInInventory, item, desc, q) => {
        if (item === undefined && desc === undefined && q === undefined) {
            alert(`Silly goose, you didn't change anything!`)
            return
        } else if (isNaN(q) === true) {
            alert('Numbers please!')
            return;
        } else {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemToUpdate: itemInInventory, name: item, description: desc, quantity: q, manager_id: manager_Id })
        };
        fetch("http://localhost:8081/inventory", requestOptions)
            .then(() => fetch("http://localhost:8081/inventory")
                .then((res) => res.json())
                .then((data) => {
                    setInventory(data)
                }))
        alert('Item has been edited!!')
        setEdit(false)
        window.location.reload();
            }
    }

    const editItem = (theItem) => {
        setEdit(true);
        setItemToEdit(theItem);
    }

    const logout = () => {
        navigate('/')
    }

    return (
        <Container>
            {userType === true ? <div>Logged in as: {username}
                <center><Button onClick={() => logout()}>Log Out</Button></center>
            </div> : <></>}
            <br></br>
            YOUR INVENTORY:
            {userType === false ?
                <div>None, you're a guest!</div>
                : <></>}
            <br></br>
            {personalInventory?.map(items =>
                <div key={items.id}>
                    <li>Item: {items.name} {edit && items.id === itemToEdit ? <center><input type="text" id="editItem" placeholder="Change Name" onChange={e => setEditItemName(e.target.value)} /></center> : <></>}</li>
                    {items.description.length > 99 ?
                        <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Description: {`${items.description.substring(0, 100)}...`}</div>
                        : <div>Description: {items.description} {edit && items.id === itemToEdit ? <center><input type="text" id="editDesc" placeholder="Change Description" onChange={e => setEditDescription(e.target.value)} /></center> : <></>}</div>}
                    <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Quanitity: {items.quantity} {edit && items.id === itemToEdit ? <center><input type='text' id="editQ" placeholder="Change Quantity" onChange={e => setEditQuantity(e.target.value)} /></center> : <></>}</div>
                    <center><Button onClick={() => viewDetails(items.name, items.description, items.quantity, items.id, items.manager_id)}>Additional Details</Button></center>
                    {userType ?
                        <center><Button key={items.id} onClick={() => editItem(items.id)}>Edit Item</Button></center>
                        : <></>}
                    {edit ?
                        <center><Button onClick={() => patchItem(items.name, editItemName, editDescription, editQuantity)}>Done</Button></center>
                        : <></>}
                </div>
            )}
            <center><Button onClick={() => viewAll()}>SEE ALL INVENTORY</Button></center>
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