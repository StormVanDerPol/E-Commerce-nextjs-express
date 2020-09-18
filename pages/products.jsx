import styles from '../styles/Products.module.css'
import { dodoFlight, dodoTimeouts } from '../utils/dodoAirlines';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

function Products() {

    return (
        <div>
            <Header>
                <title>Webshop name - products</title>
            </Header>

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

const ProductList = () => {

    //Hardcoded variables
    const region = 'eu';
    const currency = (region === 'eu') ? '€' : '$';

    const [products, setProducts] = useState('loading')

    useEffect(() => {
        (async () => {

            const { data } = await dodoFlight({
                method: 'get',
                url: `${location.origin}/api/v1/products`,
                timeout: dodoTimeouts.long,
            });

            setProducts(data.products);

        })();
    }, [])

    if (products === 'loading') {
        return <p>Loading...</p>
    } else if (products.length == 0) {
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

export default Products;