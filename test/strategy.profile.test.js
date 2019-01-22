/* global describe, it, before, expect */
/* eslint-disable no-unused-expressions, consistent-return */

const FacebookStrategy = require('../lib/strategy');

const FacebookGraphAPIError = require('../lib/errors/facebookgraphapierror.js');

const graphApiVersion = require('./graphApiVersion');


describe('Strategy#userProfile', () => {
  describe('fetched from default endpoint', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== `https://graph.facebook.com/${graphApiVersion}/me`) { return callback(new Error('incorrect url argument')); }
      if (accessToken !== 'token') { return callback(new Error('incorrect token argument')); }

      const body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');

      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
      expect(profile.displayName).to.equal('Jared Hanson');
      expect(profile.name.familyName).to.equal('Hanson');
      expect(profile.name.givenName).to.equal('Jared');
      expect(profile.gender).to.equal('male');
      expect(profile.profileUrl).to.equal('http://www.facebook.com/jaredhanson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('jaredhanson@example.com');
      expect(profile.photos).to.be.undefined;
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
      clientID: 'ABC123',
      clientSecret: 'secret',
      enableProof: true,
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== `https://graph.facebook.com/${graphApiVersion}/me?appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a`) { return callback(new Error('incorrect url argument')); }
      if (accessToken !== 'token') { return callback(new Error('incorrect token argument')); }

      const body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint, with appsecret_proof

  describe('fetched from default endpoint, with profile fields mapped from Portable Contacts schema', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== `https://graph.facebook.com/${graphApiVersion}/me?fields=id,username,name,last_name,first_name,middle_name,gender,link,email,picture`) { return callback(new Error('incorrect url argument')); }
      if (accessToken !== 'token') { return callback(new Error('incorrect token argument')); }

      const body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint, with profile fields mapped from Portable Contacts schema

  describe('fetched from default endpoint, with profile fields mapped from Portable Contacts schema, with appsecret_proof', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
      enableProof: true,
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== `https://graph.facebook.com/${graphApiVersion}/me?appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a&fields=id,username,name,last_name,first_name,middle_name,gender,link,email,picture`) { return callback(new Error('incorrect url argument')); }
      if (accessToken !== 'token') { return callback(new Error('incorrect token argument')); }

      const body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); /* fetched from default endpoint, with profile fields mapped from
  Portable Contacts schema, with appsecret_proof */

  describe('fetched from default endpoint, with profile fields a mix of mapped from Portable Contacts schema and native Facebook properties', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos', 'public_key', 'updated_time'],
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== `https://graph.facebook.com/${graphApiVersion}/me?fields=id,username,name,last_name,first_name,middle_name,gender,link,email,picture,public_key,updated_time`) { return callback(new Error('incorrect url argument')); }
      if (accessToken !== 'token') { return callback(new Error('incorrect token argument')); }

      const body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com", "updated_time": "2013-11-02T18:33:09+0000"}';
      callback(null, body, undefined);
    };


    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });

    it('should have additional fields in profile._json', () => {
      expect(profile._json.updated_time).to.equal('2013-11-02T18:33:09+0000');
    });
  }); // fetched from default endpoint, with profile fields mapped from Portable Contacts schema

  describe('fetched from default endpoint, with profile fields being an empty array', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      profileFields: [],
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== `https://graph.facebook.com/${graphApiVersion}/me`) { return callback(new Error('incorrect url argument')); }
      if (accessToken !== 'token') { return callback(new Error('incorrect token argument')); }

      const body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint, with profile fields being an empty array

  describe('error caused by invalid token', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      const body = '{"error":{"message":"Invalid OAuth access token.","type":"OAuthException","code":190,"fbtrace_id":"XxXXXxXxX0x"}}';

      callback({ statusCode: 400, data: body });
    };

    let err;
    before((done) => {
      strategy.userProfile('token', (e) => {
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
      expect(err.traceID).to.equal('XxXXXxXxX0x');
    });
  }); // error caused by invalid token

  describe('error caused by malformed response', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      const body = 'Hello, world.';
      callback(null, body, undefined);
    };


    let err;
    before((done) => {
      strategy.userProfile('token', (e) => {
        err = e;
        done();
      });
    });

    it('should error', () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Failed to parse user profile');
    });
  }); // error caused by malformed response

  describe('internal error', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      return callback(new Error('something went wrong'));
    };


    let err; let
      profile;

    before((done) => {
      strategy.userProfile('wrong-token', (e, p) => {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });

    it('should not load profile', () => {
      expect(profile).to.be.undefined;
    });
  }); // internal error
});
