import Head from "next/head";

const Header = ({ children }) => {
    return (
        <Head>
            <link rel="icon" href="../static/favicon.ico" />
            <link rel="manifest" href="../static/manifest.json" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="WPA" />
            <meta name="apple-mobile-web-app-title" content="WPA" />
            <meta name="msapplication-starturl" content="/" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="background-color" content="#ffffff" />
            {children}
        </Head>
    );
}

export default Header;