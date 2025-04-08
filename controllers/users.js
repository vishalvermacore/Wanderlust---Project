const User = require('../models/user');

// render signUp form
module.exports.renderSignUp =  (req, res) => {
    res.render('users/signup.ejs');
};

// sign up
module.exports.signUp = async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);
            // console.log(registeredUser);
            req.login(registeredUser, (err) => {
                if (err)
                    return next(err);
                req.flash('success', 'Welcome to Wanderlust!');
                res.redirect('/listings');
            });
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/signUp');
        }
    };


//render login form
module.exports.renderLogin = (req, res) => {
    res.render('users/login.ejs');
};

//login
module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back to Wanderlust!');
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/listings');
    });
};
