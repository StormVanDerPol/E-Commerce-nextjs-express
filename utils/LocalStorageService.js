class LocalStorageService {

    set = (key, value) => {
        if (window) {
            window.localStorage.setItem(key, value);
        };
    };

    get = (key) => {
        if (window) {
            return window.localStorage.getItem(key);
        };
    };

    remove = (key) => {
        if (window) {
            return window.localStorage.removeItem(key);
        };
    };

    getAll = () => {

        let items = [];

        if (window) {
            for (let i = 0; i < window.localStorage.length; i++) {
                let key = window.localStorage.key(i);
                items.push(window.localStorage.getItem(key));
            }
        };
        return items;
    };

    clear = () => {
        if (window) {
            window.localStorage.clear();
        };
    };
};

const localStorageService = new LocalStorageService();

module.exports = localStorageService;