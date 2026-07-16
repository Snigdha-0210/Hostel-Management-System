import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddProperty from './pages/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import MyBookings from './pages/MyBookings';
import ManageBookings from './pages/ManageBookings';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';
import { Plus, List } from 'lucide-react';

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="add-property" element={
                    <ProtectedRoute roles={['OWNER', 'ADMIN']}>
                        <AddProperty />
                    </ProtectedRoute>
                } />

                <Route path="properties/:id" element={<PropertyDetails />} />

                <Route path="my-bookings" element={
                    <ProtectedRoute roles={['TENANT']}>
                        <MyBookings />
                    </ProtectedRoute>
                } />

                <Route path="manage-bookings" element={
                    <ProtectedRoute roles={['OWNER', 'ADMIN']}>
                        <ManageBookings />
                    </ProtectedRoute>
                } />
            </Route>
        </Routes>
    );
};

export default App;
