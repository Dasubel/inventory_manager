import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Col } from 'react-bootstrap'
import './All.css'

const All = () => {
    const [inventory, setInventory] = useState()
    const { state } = useLocation();
    const { userType, username, password } = state;
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
        <Container className="background" fluid>
        <strong><span style={{color: 'white'}}>All INVENTORY:</span></strong>
        <br></br>
        {inventory?.map(items =>
            <Col className="inventory" key={items.id}>
                <li>Item: {items.name}</li>
                {items.description.length > 99 ?
                    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Description: {`${items.description.substring(0, 100)}...`}</p>
                    : <p>Description: {items.description}</p>}
                <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>Quanitity: {items.quantity}</p>
                <center><Button onClick={() => viewDetails(items.name, items.description, items.quantity)}>Additional Details</Button></center>
            </Col>
        )}
        </Container>
    )
}

export default All;