//Use only when document has been defined, such as in useEffect() or componentDidMount();

class CookieService {

    set = (cookies) => {
        if (document) {
            let updatedCookies = '';
            for (let key of Object.keys(cookies)) {
                updatedCookies += `${key}=${cookies[key]}`;
            }
            document.cookie = updatedCookies + ';max-age=604800';
        }
    };
    getAll = () => {
        if (document) {
            if (document.cookie.length > 0) {
                let cookies = {};
                for (let cookie of document.cookie.split('; ')) {
                    const splitCookie = cookie.split('=');
                    cookies[splitCookie[0]] = splitCookie[1];
                }
                return cookies;
            } else {
                return null;
            }
        }
    };
    get = (cookie) => {
        if (document) {
            let cookies = this.getAll();
            if (cookies) return cookies[cookie];
            else return null;
        }
    };
}

const cookieService = new CookieService();

module.exports = cookieService;