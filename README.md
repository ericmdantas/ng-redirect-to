# ng-redirect-to
[![Build Status](https://travis-ci.org/ericmdantas/ng-redirect-to.svg)](https://travis-ci.org/ericmdantas/ng-redirect-to)
[![Coverage Status](https://coveralls.io/repos/ericmdantas/ng-redirect-to/badge.svg)](https://coveralls.io/r/ericmdantas/ng-redirect-to)


# install

```

  $ bower install ng-redirect-to --save
  
```

# usage

```js

  angular.module('yourModuleNameHere', ['emd.ng-redirect-to']); // inject the dependency

```

```html

  <div emd-redirect-to="/some/view/here"></div> <!-- changes view -->
  
  <div emd-redirect-to="http://some.website.here/"></div> <!-- changes the whole page -->
  
  <div emd-redirect-to="https://another.website.here/"></div> <!-- changes the whole page -->

```

# license

MIT
