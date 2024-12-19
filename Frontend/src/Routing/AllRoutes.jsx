import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Login from "../Components/Login";
import Register from "../Components/Register";
import CreateEventPage from '../Pages/CreateEventPage';
import PrivateRouting from './PrivateRouting';
import DashboardPage from '../Pages/DashboardPage';

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRouting>{<DashboardPage/>} </PrivateRouting>}/>
            <Route path="/createEvent" element={<PrivateRouting>{<CreateEventPage/>}</PrivateRouting>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
        </Routes>
    )
}

export default AllRoutes;