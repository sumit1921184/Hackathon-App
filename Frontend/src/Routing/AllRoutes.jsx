import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import About from '../Pages/About';
import Login from "../Components/Login";
import Register from "../components/Register";
import CreateEventPage from '../Pages/CreateEventPage';
import PrivateRouting from './PrivateRouting';

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/createEvent" element={<PrivateRouting>{<CreateEventPage/>}</PrivateRouting>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
        </Routes>
    )
}

export default AllRoutes;