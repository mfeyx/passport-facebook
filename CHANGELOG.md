This changelog follows Semantic Versioning https://semver.org/

# 3.1.1 (2019-02-13)

### Patch

* Fixed displayName containing 'undefined' when user has no middle name @adamreisnz @rwky
* Updated npm deps @rwky

# 3.1.0 (2019-01-22)

### Minor

* Check that graphApiToken matches required format #4 @rwky
* Linted via ESLint @rwky

### Patch

* Added gitlab SAST @rwky
* Updated dev deps @rwky

# 3.0.0 (2018-08-07)

### Major
* Made graphApiVersion a mandatory option @rwky
* Removed deprecated username field @rwky

### Minor
* Set displayName to name field @rwky

### Patch
* README.md updates @rwky
* Updated deps @rwky
* Added tests using the live facebook graph api @rwky
* Fixed birthday field not populating @rwky

# 2.5.0 (2018-07-07)

* Added profile mappings for hometown and currentLocation @rmacqueen 
* Added profile mappings for ageRange @mhverbakel
* Updated README.md @askmike @WeiChienHsu

# 2.4.0 (2018-06-29)

* Updated travis to use node 6, 8 and 10 @rwky
* Updated dev deps @rwky
* Updated README.md and package.json for passport-next org @rwky

# 2.3.1

* Fixed FB logging redirecting to 404 due to undefined api version 

# 2.3.0

* Updated default graph API version to 2.12 @rwky
