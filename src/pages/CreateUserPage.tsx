// src/pages/CreateUserPage.tsx
import { useNotify, useRedirect } from 'react-admin';
import { useState } from 'react';
import { API_URL } from '../config/api';

const CreateUserPage = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const [form, setForm] = useState({ username: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            notify('User created successfully');
            redirect('/login');
        } else {
            notify('Failed to create user');
        }
    };

    return (
        <div style={{ margin: '100px auto', width: 300 }}>
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={form.username}
                       onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input name="password" type="password" placeholder="Password" value={form.password}
                       onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit" style={{ width: '100%', marginTop: 10 }}>Create</button>
            </form>
        </div>
    );
};

export default CreateUserPage;
