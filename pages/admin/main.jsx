import WithAuth from "../../components/WithAuth";
import Head from "next/head";
<<<<<<< HEAD
import SecurityHeaders from "../../components/SecurityHeaders";
=======
import Header from "../../components/Header";
>>>>>>> 163f3c0abe8445513658ea2a81c1b1502e3d795b

function Main() {
    return (
        <>
<<<<<<< HEAD
            <Head>
                <SecurityHeaders />
            </Head>
=======
            <Header>
                <title>Admin panel - main</title>
            </Header>
>>>>>>> 163f3c0abe8445513658ea2a81c1b1502e3d795b
            <h1>Protected admin page</h1>
        </>
    )
}

export default WithAuth(Main, true);