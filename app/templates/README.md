<%= name %>
============

an angularjs project

installing dependencies
------------------

```sh
npm install -g grunt-cli
npm install
bower install
```

configuration
-----------


running watch tasks during development
-----------

```sh
grunt watch
```

running dev server
-------------

```sh
grunt serve
```

running build
------------

```sh
grunt build
```

running tests
-----------

```sh
grunt test
```
<% if (_in_mods('protractor')) { %>
running end to end tests
---------------

```sh
grunt teste2e
```
<% } %>
release history
--------------

license
-------
<%= license %>
