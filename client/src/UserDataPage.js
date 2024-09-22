import React, { useState, useEffect } from 'react';

function UserDataPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetch('/api/userData/getAllUsers')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleUserSubmit = (e) => {
        e.preventDefault();

        const userData = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            CategoryId: categoryId,
            DateOfJoining: dateOfJoining,
        };

        const url = editUserId ? `/api/userData/${editUserId}` : '/api/userData/addNewUser';
        const method = editUserId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(editUserId ? 'User updated with ID:' : 'User created with ID:', data.UserId || editUserId);
                setFirstName('');
                setLastName('');
                setEmail('');
                setCategoryId('');
                setDateOfJoining('');
                setEditUserId(null);
                fetchUsers();
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchUsers = () => {
        fetch('/api/userData/getAllUsers')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const handleEdit = (user) => {
        setEditUserId(user.UserId);
        setFirstName(user.FirstName);
        setLastName(user.LastName);
        setEmail(user.Email);
        setCategoryId(user.CategoryId);
        setDateOfJoining(user.DateOfJoining);
    };

    const handleDelete = (id) => {
        fetch(`/api/userData/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                console.log('User deleted with ID:', id);
                fetchUsers();
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div style={styles.container}>
            <h2>{editUserId ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleUserSubmit}>
                <div style={styles.formGroup}>
                    <label>First Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        style={styles.input}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Category ID</label>
                    <input
                        type="number"
                        style={styles.input}
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Date of Joining</label>
                    <input
                        type="date"
                        style={styles.input}
                        value={dateOfJoining}
                        onChange={e => setDateOfJoining(e.target.value)}
                    />
                </div>
                <button type="submit" style={styles.submitButton}>
                    {editUserId ? 'Update User' : 'Add User'}
                </button>
            </form>

            <h2>All Users</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Category ID</th>
                        <th>Date of Joining</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.UserId}>
                            <td>{user.FirstName}</td>
                            <td>{user.LastName}</td>
                            <td>{user.Email}</td>
                            <td>{user.CategoryId}</td>
                            <td>{user.DateOfJoining}</td>
                            <td>
                                <button onClick={() => handleEdit(user)} style={styles.editButton}>Edit</button>
                                <button onClick={() => handleDelete(user.UserId)} style={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    formGroup: {
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    },
    table: {
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse',
    },
    editButton: {
        backgroundColor: '#FFC107',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    deleteButton: {
        backgroundColor: '#F44336',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default UserDataPage;