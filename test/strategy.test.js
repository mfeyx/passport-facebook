/* global describe, it, expect, before */
/* eslint-disable no-unused-expressions, consistent-return */

const chai = require('chai');


const FacebookStrategy = require('../lib/strategy');


const graphApiVersion = require('./graphApiVersion');

describe('Strategy', () => {
  describe('constructed', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    },
    (() => {}));

    it('should be named facebook', () => {
      expect(strategy.name).to.equal('facebook');
    });
  });

  describe('constructed with undefined options', () => {
    it('should throw', () => {
      expect(() => {
        FacebookStrategy(undefined, (() => {}));
      }).to.throw(Error);
    });
  });

  describe('constructed with missing graphApiVersion option', () => {
    it('should throw', () => {
      expect(() => {
        FacebookStrategy({
          clientID: 'ABC123',
          clientSecret: 'secret'
        },
        (() => {}));
      }).to.throw(Error);
    });
  });

  describe('constructed with invalid graphApiVersion option', () => {
    it('should throw', () => {
      expect(() => {
        FacebookStrategy({
          clientID: 'ABC123',
          clientSecret: 'secret',
          graphApiVersion: 'invalid'
        },
        (() => {}));
      }).to.throw(Error);
    });
  });

  describe('authorization request with display parameter', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req(() => {
        })
        .authenticate({ display: 'mobile' });
    });

    it('should be redirected', () => {
      expect(url).to.equal(`https://www.facebook.com/${graphApiVersion}/dialog/oauth?display=mobile&response_type=code&client_id=ABC123`);
    });
  });

  describe('authorization request with reauthorization parameters', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req(() => {
        })
        .authenticate({ authType: 'reauthenticate', authNonce: 'foo123' });
    });

    it('should be redirected', () => {
      expect(url).to.equal(`https://www.facebook.com/${graphApiVersion}/dialog/oauth?auth_type=reauthenticate&auth_nonce=foo123&response_type=code&client_id=ABC123`);
    });
  });

  describe('failure caused by user denying request', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));


    let info;

    before((done) => {
      chai.passport.use(strategy)
        .fail((i) => {
          info = i;
          done();
        })
        .req((req) => {
          req.query = {};
          req.query.error = 'access_denied';
          req.query.error_code = '200';
          req.query.error_description = 'Permissions error';
          req.query.error_reason = 'user_denied';
        })
        .authenticate();
    });

    it('should fail with info', () => {
      expect(info).to.not.be.undefined;
      expect(info.message).to.equal('Permissions error');
    });
  });

  describe('error caused by app being in sandbox mode', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));


    let err;

    before((done) => {
      chai.passport.use(strategy)
        .error((e) => {
          err = e;
          done();
        })
        .req((req) => {
          req.query = {};
          req.query.error_code = '901';
          req.query.error_message = 'This app is in sandbox mode.  Edit the app configuration at http://developers.facebook.com/apps to make the app publicly visible.';
        })
        .authenticate();
    });

    it('should error', () => {
      expect(err.constructor.name).to.equal('FacebookAuthorizationError');
      expect(err.message).to.equal('This app is in sandbox mode.  Edit the app configuration at http://developers.facebook.com/apps to make the app publicly visible.');
      expect(err.code).to.equal(901);
      expect(err.status).to.equal(500);
    });
  });

  describe('error caused by invalid code sent to token endpoint (note: error format does not conform to OAuth 2.0 specification)', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));

    strategy._oauth2.getOAuthAccessToken = function getOAuthAccessToken(code, options, callback) {
      return callback({ statusCode: 400, data: '{"error":{"message":"Invalid verification code format.","type":"OAuthException","code":100,"fbtrace_id":"XXxx0XXXxx0"}}' });
    };


    let err;

    before((done) => {
      chai.passport.use(strategy)
        .error((e) => {
          err = e;
          done();
        })
        .req((req) => {
          req.query = {};
          req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
        })
        .authenticate();
    });

    it('should error', () => {
      expect(err.constructor.name).to.equal('FacebookTokenError');
      expect(err.message).to.equal('Invalid verification code format.');
      expect(err.type).to.equal('OAuthException');
      expect(err.code).to.equal(100);
      expect(err.subcode).to.be.undefined;
      expect(err.traceID).to.equal('XXxx0XXXxx0');
    });
  }); // error caused by invalid code sent to token endpoint

  describe('error caused by invalid code sent to token endpoint (note: error format conforms to OAuth 2.0 specification, though this is not the current behavior of the Facebook implementation)', () => {
    const strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      graphApiVersion
    }, (() => {}));

    // inject a "mock" oauth2 instance
    strategy._oauth2.getOAuthAccessToken = function getOAuthAccessToken(code, options, callback) {
      return callback({ statusCode: 400, data: '{"error":"invalid_grant","error_description":"The provided value for the input parameter \'code\' is not valid."} ' });
    };


    let err;

    before((done) => {
      chai.passport.use(strategy)
        .error((e) => {
          err = e;
          done();
        })
        .req((req) => {
          req.query = {};
          req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
        })
        .authenticate();
    });

    it('should error', () => {
      expect(err.constructor.name).to.equal('TokenError');
      expect(err.message).to.equal('The provided value for the input parameter \'code\' is not valid.');
      expect(err.code).to.equal('invalid_grant');
    });
  }); // error caused by invalid code sent to token endpoint
});
