/* global describe, it, before, expect */
/* jshint expr: true */

var FacebookStrategy = require('../lib/strategy')
  , graphApiVersion = require('./graphApiVersion')
  , accessToken = 'EAACsEG8z7z0BAP0BP9haixZA3HEhSjLXtnnf6M9ZAwUZAgaHDOkr6VRUfCaX8zhJvMSvox77ZBuRVizhaN0ZAtZAW81bUrpVTAAH4dczX5RWZBVSURirkYWdw24mZBPAn3fEIlm6lh0hZA4FPuy9MBlUKlIYkigEeZBEsUAUZCe59Khfb9I4tS1ZBim5kZCWociZBdSZBYF48udi1m5LURD6aK10FinZBure7ZBm5iZAxodq6JgKzsMwZDZD'
  , clientID = '189186585128765'
  , clientSecret = '5fd09594f1fddff555d4960464c82dd6'

describe('Strategy#userProfileLive', function() {

  describe('fetched from default endpoint', function() {
    var strategy = new FacebookStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        graphApiVersion: graphApiVersion
      }, function() {});
    var profile;

    before(function(done) {
      strategy.userProfile(accessToken, function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('123253025274983');
      expect(profile.displayName).to.equal('Open Graph Test User');
    });

    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });

    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint

  describe('fetched from default endpoint, with appsecret_proof', function() {
    var strategy = new FacebookStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        enableProof: true,
        graphApiVersion: graphApiVersion
      }, function() {});

    var profile;

    before(function(done) {
      strategy.userProfile(accessToken, function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('123253025274983');
      expect(profile.displayName).to.equal('Open Graph Test User');
    });
  }); // fetched from default endpoint, with appsecret_proof

  describe('fetched from default endpoint, with profile fields mapped from Portable Contacts schema', function() {
    var strategy = new FacebookStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        profileFields: ['id', 'name', 'gender', 'birthday', 'email', 'picture', 'age_range'],
        graphApiVersion: graphApiVersion
      }, function() {});

    var profile;

    before(function(done) {
      strategy.userProfile(accessToken, function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
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

  describe('error caused by invalid token', function() {
    var strategy =  new FacebookStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        graphApiVersion: graphApiVersion
      }, function() {});

    var err, profile;
    before(function(done) {
      strategy.userProfile('invalid', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('FacebookGraphAPIError');
      expect(err.message).to.equal('Invalid OAuth access token.');
      expect(err.type).to.equal('OAuthException');
      expect(err.code).to.equal(190);
      expect(err.subcode).to.be.undefined;
    });
  }); // error caused by invalid token

});
