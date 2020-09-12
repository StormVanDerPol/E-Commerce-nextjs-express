import WithAuth from "../../components/WithAuth";
import Head from "next/head";

function Main() {
    return (
        <>
            <Head>
                <meta httpEquiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' clusterfuck.l55h1.mongodb.net"></meta>
            </Head>
            <h1>Protected admin page</h1>
        </>
    )
}

export default WithAuth(Main, true);