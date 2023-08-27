import { Router } from "express";
import * as controller from "../controllers/users.controller.js";
import passport from "passport";

const router = Router();


router.post('/register', passport.authenticate('register', {
    failureRedirect: '/error-register',
    successRedirect: '/login?registerSuccess=true',
    passReqToCallback: true,
}));

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/error-login',
    successRedirect: '/products?loginSuccess=true',
    passReqToCallback: true,
}));


router.get("/logout", controller.logoutUser);

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/profile-github', passport.authenticate('github', {
    failureRedirect: '/error-github-login',
    successRedirect: '/products?loginSuccess=true',
    passReqToCallback: true
}))


export default router;


