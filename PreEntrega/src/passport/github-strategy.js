import {Strategy as GithubStrategy} from 'passport-github2'
import passport from 'passport'
import UserDao from '../daos/mongodb/users.dao.js'
const userDao = new UserDao();

const strategyOptions = {

clientID: 'Iv1.3844e8e46e74df0f',
clientSecret: 'b6951c3fa805781300d11e98e0134b45efa3acbb',
callbackURL:'https://localhost:8080/users/profile-github'

};


const registerOrLogin = async (accessToken,refreshToken,profile,done)=> {
   const email = profile._json.email !== null ? profile._json.email:profile_json.blog
   const user = await userDao.getByEmail(email)
   if(user) return done (null, user);
   const newUser = await userDao.register({
    first_name: profile._json.name.split('')[0],
    last_name: profile._json.name.split('')[1] ,
    email,
    passport: '',
    isGithub: true
   })
   return done(null, newUser)
}

//A diferencia del password local, de la autentificación se encarga github

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin))