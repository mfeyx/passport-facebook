/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function parse(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }

  const profile = {};
  profile.id = json.id;
  profile.username = json.username;
  profile.displayName = json.name;
  profile.name = {
    familyName: json.last_name,
    givenName: json.first_name,
    middleName: json.middle_name
  };
  if (typeof profile.displayName === 'undefined') {
    profile.displayName = `${json.first_name} ${json.middle_name} ${json.last_name}`;
  }

  profile.gender = json.gender;
  profile.profileUrl = json.link;
  profile.ageRange = json.age_range;
  profile.birthday = json.birthday;

  if (json.email) {
    profile.emails = [{ value: json.email }];
  }

  if (json.picture) {
    if (typeof json.picture === 'object' && json.picture.data) {
      // October 2012 Breaking Changes
      profile.photos = [{ value: json.picture.data.url }];
    } else {
      profile.photos = [{ value: json.picture }];
    }
  }

  return profile;
};
