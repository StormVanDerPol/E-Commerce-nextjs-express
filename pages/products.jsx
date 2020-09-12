import Head from 'next/head'
import styles from '../styles/Products.module.css'
import { dodoFlight, dodoRoutes, dodoTimeouts } from '../utils/dodoAirlines';
import NavBar from '../components/NavBar';

function Products({ products = 'loading', success }) {

    //Hardcoded variables
    const region = 'us';
    const currency = (region === 'eu') ? '€' : '$';

    const loadingProducts = (products === 'loading');

    const ProductList = () => {
        if (!success) {

            return <p>Error</p>

        } else if (loadingProducts) {

            return <p>Loading...</p>

        } else if (products.length === 0) {

            return <p>No products found!</p>

        } else {

            return products.map((item, i) => {
                return <div key={i} >
                    <ul>
                        <li>{item.name}</li>
                        <li>{item.prices[region]}{currency} - {item.discounts[region] * 100}% = {(item.prices[region] - item.prices[region] * item.discounts[region]).toFixed(2)}{currency}</li>
                    </ul>
                </div>
            });

        }
    }

    return (
        <div>
            <Head>
                <title>Webshop name - Products</title>
                <link rel="icon" href="/favicon.ico" />
                <meta httpEquiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' clusterfuck.l55h1.mongodb.net"></meta>
            </Head>

            <NavBar />

            <main>
                <h1>
                    List products
                </h1>

                <ProductList />

            </main>

            <footer>
            </footer>
        </div>
    )
}


//Load products server-side for crawlers
Products.getInitialProps = async () => {
    const { data: { products, success } } = await dodoFlight({
        method: 'get',
        url: dodoRoutes.api.v1.products,
        timeout: dodoTimeouts.long,
    });

    return { products, success };
}

export default Products;