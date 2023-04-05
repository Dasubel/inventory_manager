import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Inventory from "./Inventory";
import Item from "./Item"
import Edit from "./Edit"

const RouteHandler = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory/:item" element={<Item />} />
                <Route path="/inventory/edit/:item" element={<Edit />} />
            </Routes>
        </Router>
    )
};

export default RouteHandler;