import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import { useEffect } from 'react'

export default function Home() {

  // useEffect(() => {
  //   (async () => {
  //     if ("serviceWorker" in navigator) {
  //       try {

  //         // const registrations = await navigator.serviceWorker.getRegistrations();
  //         // console.log(registrations);

  //         navigator.serviceWorker.register("../static/serviceWorker.js", {
  //           scope: '/',
  //         });
  //       } catch (error) {
  //         console.error("Service worker registration failed", err);
  //       }
  //     } else {
  //       console.log("Service worker unsupported")
  //     }
  //   })();
  // }, []);

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