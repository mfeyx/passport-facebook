/* global describe, it, before, expect */
/* eslint-disable no-unused-expressions, consistent-return */

const fs = require('fs');
const Profile = require('../lib/profile');


describe('Profile.parse', () => {
  describe('profile with picture attribute in orginal format', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/picture.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('http://profile.ak.fbcdn.net/hprofile-ak-prn1/example.jpg');
      expect(profile.emails).to.be.undefined;
    });
  });

  describe('profile with picture attribute in October 2012 breaking changes format', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/picture-2012-10.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('http://profile.ak.fbcdn.net/hprofile-ak-prn1/example.jpg');
    });
  });

  describe('profile with middle name', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/middle-name.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.displayName).to.equal('First Middle Last');
    });
  });

  describe('profile without middle name', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/no-middle-name.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.displayName).to.equal('First Last');
    });
  });
});
