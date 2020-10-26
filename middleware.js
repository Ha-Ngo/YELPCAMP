module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        //store the url required
        req.session.returnto = req.originalUrl;
        req.flash('error', 'you must be signed in');
        return res.redirect('/login');
    }
    next();
}