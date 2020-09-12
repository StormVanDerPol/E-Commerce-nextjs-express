import WithAuth from "../../components/WithAuth";

function Main() {
    return (
        <h1>Protected admin page</h1>
    )
}

export default WithAuth(Main, true);