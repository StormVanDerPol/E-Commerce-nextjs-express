import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Header from '../components/Header'

export default function Home() {

  return (
    <div>
      <Header>
        <title>Webshop name</title>
      </Header>

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