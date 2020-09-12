import Head from 'next/head'
import styles from '../styles/NotFound.module.css'
import { useState } from 'react'
import authService from '../utils/AuthService'
import NavBar from '../components/NavBar'

export default function Login() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    return (
        <div>
            <Head>
                <title>Webshop name - login</title>
                <link rel="icon" href="/favicon.ico" /><meta httpEquiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' clusterfuck.l55h1.mongodb.net"></meta>
            </Head>

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
                <button onClick={() => {
                    authService.login(credentials);
                }}>Login</button>
            </main>

            <footer>
            </footer>
        </div>
    )
}