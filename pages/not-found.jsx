import Head from 'next/head'
import styles from '../styles/NotFound.module.css'
import NavBar from '../components/NavBar'

export default function NotFound() {
  return (
    <div>
      <Head>
        <title>Webshop name - not found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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