const SecurityHeaders = () => {
    return (
        <meta httpEquiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' clusterfuck.l55h1.mongodb.net https://storm-nextjs-express-test.herokuapp.com"></meta>
    );
}

export default SecurityHeaders;