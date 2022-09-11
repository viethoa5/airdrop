import { useRouter } from "next/router"; 
import React, { useState } from 'react';
import axios from "axios";
import Layout from "components/Layout";
export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginAccount = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
    
        const user = await axios.post("/api/login", credentials);
        if (user.status === 200) {
            router.push('login/manage')
        }
    };
    return (
    <Layout>
    <form method="POST" onSubmit={(e) => loginAccount(e)}>
    <div className="container">
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" name="username" required />
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="password" required />
    <button type="submit">Login</button>
    </div>
    </form>
    </Layout>
    )
}