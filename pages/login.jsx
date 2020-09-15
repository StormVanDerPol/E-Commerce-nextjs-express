import Head from 'next/head'
import styles from '../styles/NotFound.module.css'
import { useState } from 'react'
import authService from '../utils/AuthService'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Login() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    const router = useRouter();
    const query = router.query;

    return (
        <div>
            <Header>
                <title>Webshop name - login</title>
            </Header>

            <NavBar />

            <main>
                <h1>
                    Login
                </h1>
                <input type="text" name="username" value={credentials.username} placeholder="username" onChange={({ target }) => {
                    setCredentials({
                        ...credentials,
                        username: target.value,
                    });
                }} />
                <input type="password" name="password" value={credentials.password} placeholder="password" onChange={({ target }) => {
                    setCredentials({
                        ...credentials,
                        password: target.value,
                    });
                }} />
                <button onClick={async () => {
                    const result = await authService.login(credentials);

                    if (result === 'LOGIN_OK') {
                        router.push(query.to || '/');
                    }
                    else {
                        alert('Login failed')
                    }
                }}>Login</button>
            </main>

            <footer>
            </footer>
        </div>
    )
}