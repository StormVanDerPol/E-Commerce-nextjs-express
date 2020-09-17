import '../styles/globals.css'
import AppRouter from '../components/AppRouter'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {

  return <AppRouter Component={Component} pageProps={pageProps} />
}

export default MyApp
