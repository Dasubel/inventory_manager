import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from 'react-bootstrap'
import './Login.css'
var managerId = null;

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [createUsername, setCreateUsername] = useState('')
    const [createPassword, setCreatePassword] = useState('')
    const [inventory, setInventory] = useState(null);
    const [createFirstName, setCreateFirstName] = useState('');
    const [createLastName, setCreateLastName] = useState('');
    const [userType, setUserType] = useState(false)
    const navigate = useNavigate();

    const Authenticate = (uname, pword) => {
        fetch("http://localhost:8081/managers")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    if (uname === data[i].username) {
                        managerId = data[i].id
                    }
                }
                console.log(managerId)
                if(managerId === null) {
                        alert('Invalid username, please register with us!')
                        return;
                }
                setInventory(data)
                navigate('/inventory', { state: { username: uname, password: pword, userType: true, manager_Id: managerId } })
            })
    }

    const Visitor = () => {
        setUserType(false)
        navigate('/inventory', { state: { username: '', password: '', userType: false } })
    }

    const addUser = (fName, lName, uname, pword) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: fName, last_name: lName, username: uname, password: pword })
        };
        fetch("http://localhost:8081/managers", requestOptions)
            .then(() => fetch("http://localhost:8081/inventory")
                .then((res) => res.json())
                .then((data) => {
                    setInventory(data)
                }))
        alert('User account created, please log in.')
        window.location.reload();
    }

    return (
        <Container className='login'>
            <Row>
                <Col xl={6}>
                    <p>Login to your account below!</p>
                    <input className='theBox' type="text" id="login" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    <center><input type='password' className='theBox' id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /></center>
                    <center><Button onClick={() => Authenticate(username, password)}>Login</Button></center>
                    <center><Button onClick={() => Visitor()}>Continue as Visitor</Button></center>
                    <br></br>
                    <div>Don't have an account? Create one below:</div>
                    <br></br>
                    <center><input type="text" id="createFirstName" placeholder="First Name" onChange={e => setCreateFirstName(e.target.value)} /></center>
                    <center><input type="text" id="createLastName" placeholder="Last Name" onChange={e => setCreateLastName(e.target.value)} /></center>
                    <center><input type="text" id="createUsername" placeholder="Username" onChange={e => setCreateUsername(e.target.value)} /></center>
                    <center><input type='password' className='theBox' id="createPassword" placeholder="Password" onChange={e => setCreatePassword(e.target.value)} /></center>
                    <center><Button onClick={() => addUser(createFirstName, createLastName, createUsername, createPassword)}>Create!</Button></center>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;