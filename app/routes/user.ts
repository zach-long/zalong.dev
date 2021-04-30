import express from 'express';
import passport from 'passport';
const router: express.Router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('admin');
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    } else {
        res.render('login');
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login'
}));

router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect('/');
    } else {
        res.redirect('/');
    }  
});

module.exports = router;