import Head from 'next/head'
import styles from '../styles/NotFound.module.css'
import { useState } from 'react'
import authService from '../utils/AuthService'
import NavBar from '../components/NavBar'
import SecurityHeaders from '../components/SecurityHeaders'

export default function Signup() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    return (
        <div>
            <Head>
                <title>Webshop name - sign up</title>
                <link rel="icon" href="/favicon.ico" />
                <SecurityHeaders />
            </Head>

            <NavBar />

            <main>
                <h1>sign up</h1>

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
                    authService.signup(credentials);
                }}>Register</button>
            </main>

            <footer>
            </footer>
        </div>
    )
}