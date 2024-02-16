import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/authContext';

const Security = () => {
    const [users, setUsers] = useState([]);
    const { getToken } = useAuth();
    const token = getToken();
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('/security', {
              headers: { 'Authorization': `Bearer ${token}` },
            });
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
      
        fetchUsers();
      }, []);

    const handleDisable = async (userId) => {
    try {
        const response = await axios.put(`/security/${userId}`,
        { disable: true },
        { headers: { Authorization: `Bearer ${token}` } },
        );
    
        if (response.status === 200) {
        console.log(`User disabled: ${userId}`);
        // Update the local state to reflect the changes
        setUsers(
            users.map((user) =>
            user._id === userId ? { ...user, disabled: true } : user,
            ),
        );
        } else {
        console.error(`Error disabling user: ${userId}`);
        }
    } catch (error) {
        console.error('Error disabling user:', error);
    }
    };

    const handleEnable = async (userId) => {
        try {
          const response = await axios.put(`/security/${userId}`,
            { disable: false },
            { headers: { Authorization: `Bearer ${token}` } },
          );
      
          if (response.status === 200) {
            console.log(`User enabled: ${userId}`);
            // Update the local state to reflect the changes
            setUsers(
              users.map((user) =>
                user._id === userId ? { ...user, disable: false } : user,
              ),
            );
          } else {
            console.error(`Error enabling user: ${userId}`);
          }
        } catch (error) {
          console.error('Error enabling user:', error);
        }
      };
      
    
return (
    <div>
        <h1>User Security</h1>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Enable</th>
            <th>Disable</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
            <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                <Button variant="success" onClick={() => handleEnable(user._id)}>
                Enable
                </Button>
                </td>
                <td>
                <Button variant="danger" onClick={() => handleDisable(user._id)}>
                Disable
                </Button>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
    </div>
    );
};

export default Security;
      