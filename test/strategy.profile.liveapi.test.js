/* global describe, it, before, expect */
/* eslint-disable no-unused-expressions, consistent-return */

/**
 * This tests the live fb api using a test account, the token is valid for 90 days so
 * if this starts failing because the token has expired don't worry just raise an
 * issue and we'll fix it.
 */


const FacebookStrategy = require('../lib/strategy');

const FacebookGraphAPIError = require('../lib/errors/facebookgraphapierror.js');

const graphApiVersion = require('./graphApiVersion');


const accessToken = 'EAACsEG8z7z0BAJ7tYZBbRk4hMvmm9bhJZCQk4OqbtFGCPefOfY2d6nBg1tGs8ZC2fGPvMGyBUwKmaqZANbhTYPox243jjTB2NAuW4qjY75ukgBcnfrUjQcasLnf9AUzS4excO1f2vNdyhZAAEOzZAXq3xogVfMdxleiW9m4eYoTPgg6hZAbngRKLZCmGfwNYYzBzjsbEEJyPHc8SZAgbBEb63BOuA0dOWAwEo3BQi1Kb1rAZDZD';


const clientID = '189186585128765';


const clientSecret = '5fd09594f1fddff555d4960464c82dd6';

describe('Strategy#userProfileLive', () => {
  describe('fetched from default endpoint', () => {
    const strategy = new FacebookStrategy({
      clientID,
      clientSecret,
      graphApiVersion
    }, (() => {}));
    let profile;

    before((done) => {
      strategy.userProfile(accessToken, (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('123253025274983');
      expect(profile.displayName).to.equal('Open Graph Test User');
    });

    it('should set raw property', () => {
      expect(profile._raw).to.be.a('string');
    });

    it('should set json property', () => {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint

  describe('fetched from default endpoint, with appsecret_proof', () => {
    const strategy = new FacebookStrategy({
      clientID,
      clientSecret,
      enableProof: true,
      graphApiVersion
    }, (() => {}));

    let profile;

    before((done) => {
      strategy.userProfile(accessToken, (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('123253025274983');
      expect(profile.displayName).to.equal('Open Graph Test User');
    });
  }); // fetched from default endpoint, with appsecret_proof

  describe('fetched from default endpoint, with profile fields mapped from Portable Contacts schema', () => {
    const strategy = new FacebookStrategy({
      clientID,
      clientSecret,
      profileFields: ['id', 'name', 'gender', 'birthday', 'email', 'picture', 'age_range'],
      graphApiVersion
    }, (() => {}));

    let profile;

    before((done) => {
      strategy.userProfile(accessToken, (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.displayName).to.equal('Open Graph Test User');
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('123253025274983');
      expect(profile.name.familyName).to.equal('User');
      expect(profile.name.givenName).to.equal('Open');
      expect(profile.name.middleName).to.equal('Graph Test');
      expect(profile.gender).to.equal('female');
      expect(profile.birthday).to.equal('08/16/1981');
      expect(profile.ageRange.min).to.equal(21);
      expect(profile.emails[0].value).to.equal('open_nkrekdl_user@tfbnw.net');
    });
  }); // fetched from default endpoint, with profile fields mapped from Portable Contacts schema

  describe('error caused by invalid token', () => {
    const strategy = new FacebookStrategy({
      clientID,
      clientSecret,
      graphApiVersion
    }, (() => {}));

    let err;
    before((done) => {
      strategy.userProfile('invalid', (e) => {
        err = e;
        done();
      });
    });

    it('should error', () => {
      expect(err).to.be.an.instanceOf(FacebookGraphAPIError);
      expect(err.constructor.name).to.equal('FacebookGraphAPIError');
      expect(err.message).to.equal('Invalid OAuth access token.');
      expect(err.type).to.equal('OAuthException');
      expect(err.code).to.equal(190);
      expect(err.subcode).to.be.undefined;
    });
  }); // error caused by invalid token
});
