import Head from "next/head";

const Header = ({ children }) => {
    return (
        <Head>
            <link rel="icon" href="/favicon.ico" />
            {children}
        </Head>
    );
}

export default Header;