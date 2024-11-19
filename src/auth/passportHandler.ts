import * as passport from 'passport';
import { AuthFailureError } from '../core/ApiError';
import * as passportLocal from 'passport-local';
import * as passportJwt from 'passport-jwt';
import { JwtPayload } from '../core/JWT';
import { env_vars } from '../config';
import { userRepository } from '../database//repositories/user.repository';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// local passport strategy for login

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const user = await userRepository.findByEmail(email);

      if (!user) done(new AuthFailureError('Invalid email or password.'));
      else {
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (err) {
            return done(new AuthFailureError(err.message));
          }
          if (isMatch) {
            return done(undefined, user);
          }
          return done(new AuthFailureError('Invalid email or password.'));
        });
      }
    },
  ),
);

// jwt passport strategy for protect routes

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env_vars.jwt.secret,
    },
    async (jwtToken: JwtPayload, done) => {
      const user = await userRepository.findByEmail(
        jwtToken.email.toLowerCase(),
      );
      if (!user) return done(new AuthFailureError());
      return done(undefined, user);
    },
  ),
);
