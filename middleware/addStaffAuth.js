module.exports = (req, res, next) => {

    if (!req.body.username || !req.body.fullname || !req.body.email || !req.body.phoneNumber) {
        return res.redirect('/addStaff')

    }
next()
}
