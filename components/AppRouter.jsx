import { useRouter } from 'next/router';
import Redirect from '../pages/redirect';

const AppRouter = ({ Component, pageProps }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    //Redirecting non existing routes
    if (router.asPath === '/admin') {
        return <Redirect to={'/admin/main'} />
    }

    //Redirecting 404s
    if (router.pathname.startsWith("/_error")) {
        // const route = (router.asPath.startsWith('/api')) ? '/not-found-api' : '/not-found';
        return <Redirect to={'not-found'} />
    }

    return <Component {...pageProps} />
}

export default AppRouter;