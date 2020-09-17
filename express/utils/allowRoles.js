const admin = (req, res, next) => {
    req.allowedRoles = [
        'admin',
    ],
        next();
}

const user = (req, res, next) => {
    req.allowedRoles = [
        'user'
    ];
    next();
}

module.exports = {
    admin,
    user,
};