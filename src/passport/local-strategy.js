import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'  //Alias segun el tipo de estrategia, en este caso PassportLocal.
import UserDao from '../daos/mongodb/users.dao.js'
const userDao = new UserDao()

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}


//Logica registro
//Done es un método de password que indica el resultado del proceso de autenticación.
const register = async(req, email, password, done) => {
    try {
        const user = await userDao.getByEmail(email)
        if(user) return done(null, false) //? Si el usuario no esta registrado pasa a false || Null va indicar un posible error (que en este caso no hay)
        const newUser = await userDao.register(req.body);
   return done (null, newUser)
    } catch (error) {
        return done (error, false)
    }
}
//Logica registro
const login = async(req, email, password, done) => {

try {
    const user = {email, password};
    const userLogin = await userDao.login(user);
    if(!userLogin) return done (null,false, { message: 'User not found'});
    return done (null, userLogin)
} catch (error) {
    console.log(error)
}

}

//Strategies

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions,login);

//Inicializacion
passport.use('login', loginStrategy)
passport.use('register', registerStrategy)


//Guarda al usuario en req.session.passport
//req.session.passport.user  --> id del usuario
passport.serializeUser((user,done)=>{ done
     (null, user._id)
    });

passport.deserializeUser(async(id,done) =>{ 
    
    const user = await userDao.getById(id)
    return done (null,user) 
} );
