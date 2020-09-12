import Head from 'next/head'
import styles from '../styles/Forbidden.module.css'
import NavBar from '../components/NavBar'

export default function Forbidden() {
  return (
    <div>
      <Head>
        <title>Webshop name - forbidden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        <h1>
          Oops! You're not supposed to be here!
        </h1>
      </main>

      <footer>
      </footer>
    </div>
  )
}