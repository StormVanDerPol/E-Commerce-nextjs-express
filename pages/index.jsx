import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Webshop name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        <h1>
          Hello
        </h1>
      </main>

      <footer>
      </footer>
    </div>
  )
}