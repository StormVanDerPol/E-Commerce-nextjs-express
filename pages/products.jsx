import styles from '../styles/Products.module.css'
import { dodoFlight, dodoTimeouts } from '../utils/dodoAirlines';
import NavBar from '../components/NavBar';
<<<<<<< HEAD
import SecurityHeaders from '../components/SecurityHeaders';
=======
import Header from '../components/Header';
>>>>>>> 163f3c0abe8445513658ea2a81c1b1502e3d795b

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
<<<<<<< HEAD
            <Head>
                <title>Webshop name - Products</title>
                <link rel="icon" href="/favicon.ico" />
                <SecurityHeaders />
            </Head>
=======
            <Header>
                <title>Webshop name - products</title>
            </Header>
>>>>>>> 163f3c0abe8445513658ea2a81c1b1502e3d795b

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
        url: `localhost:3000/api/v1/products`,
        timeout: dodoTimeouts.long,
    });

    return { products, success };
}

export default Products;