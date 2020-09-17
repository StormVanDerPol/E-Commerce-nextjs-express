import Head from 'next/head'
import styles from '../styles/NotFound.module.css'
import NavBar from '../components/NavBar'
import Header from '../components/Header'

export default function NotFound() {
  return (
    <div>
      <Header>
        <title>Webshop name - not found</title>
      </Header>

      <NavBar />

      <main>
        <h1>
          404, you lost?
        </h1>
      </main>

      <footer>
      </footer>
    </div>
  )
}