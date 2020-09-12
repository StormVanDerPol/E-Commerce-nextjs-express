import WithAuth from "../../components/WithAuth";
import Head from "next/head";
import SecurityHeaders from "../../components/SecurityHeaders";

function Main() {
    return (
        <>
            <Head>
                <SecurityHeaders />
            </Head>
            <h1>Protected admin page</h1>
        </>
    )
}

export default WithAuth(Main, true);