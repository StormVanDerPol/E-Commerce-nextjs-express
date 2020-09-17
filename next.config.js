
const withPWA = require('next-pwa')

module.exports = withPWA({
    // useFileSystemPublicRoutes: false,
    pwa: {
        dest: 'public',
    }
})