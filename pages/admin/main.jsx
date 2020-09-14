import WithAuth from "../../components/WithAuth";
import Head from "next/head";
import Header from "../../components/Header";

function Main() {
    return (
        <>
            <Header>
                <title>Admin panel - main</title>
            </Header>
            <h1>Protected admin page</h1>
        </>
    )
}

export default WithAuth(Main, true);