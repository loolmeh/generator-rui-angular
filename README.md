# generator-rui-angular

> [Yeoman](http://yeoman.io) generator for angular projects with a focus on rapydscript, rapydml, sass, bootstrap, and angular-ui. 


## Getting Started

### Installation

Make sure you have yeoman installed:

```
npm install -g yo
```

Install `generator-rui-angular`:

```
npm install git://github.com/loolmeh/generator-rui-angular.git
```

### Quick Start

Make a new directory:

```
mkdir myapp && cd myapp
```

Run the main generator:

```
yo rui-angular
```

Run a subgenerator to add more content:

```
yo rui-angular:[subgen]
```

To build run:

```
grunt build
```

files will automatically appear in dist/dev by default or whatever dist_path you specified

To build a release:

```
grunt release:[release-name]
```

files will appear in dist/release-name with a zip of contents inside

To run the tests:

```
grunt test
```

To run the end to end tests:

```
grunt teste2e
```

make sure you have the jdk, selenium/selenium drivers, and the browser binaries
you are targeting.

To run the watch tasks:

```
grunt watch
```

To run the live dev server:

```
grunt serve
```

you need a separate running watch tasks for livereload to work

### Features

* templates for directives, partials, services, providers, etc... with specs in rapyscript, javascript, and coffeescript
* adding routes without pain
* adding scripts in the index without pain
* adding bower components without pain
* automatically hooks stuff for you in the index
* figures out the module for you implicitly, no need to provide paths
* the build includes:
 * compiling of preprocessor languages
 * compiling of templates to one js file
 * compiling of po translations to one js file
 * annotation of all generated js files
 * minification of all js/css/html files
 * concatenation of app css and js files
 * copying of assets
 * cdnification
 * release targets with zipping
* configured nggettext with tasks for extraction, compilation for dev and build targets
* configured dev server with livereload
* configured watch tasks for preprocessing, annotations, livereload, etc...
* configured karma setup for phantomjs, chrome, and firefox
* configured protractor setup for chrome and firefox

### Configuration

Configuration is stored in .gen\_config and should be written for you by the app
generator. It determines quite a bit of behavior for the generators that otherwise
would need lots of options on the commandline.

Available settings:

* def_ext: default scripting language, possible values: js/pyj/coffee
* def_ml: default markup language, possible values: html/pyml/jade
* def_ss: default styling language, possbile values: css/sass/less
* modules: this contains an object mapping modules to relative paths of their
locations, added for you by default if you use the module generator
* def_tst: default testing style, possible values: assert/expect
* indent: default indenting spaces: by default it's set to 4 spaces
* router: the router module used: ui.router/ngRoute
* basic_deps: the list of dependencies that you want to be included by default to
all modules you add
* app_path: relative path to your source code, used by grunt
* dist_path: relative path to your build directory, used by grunt

### Generators

Available generators:

* [rui-angular:app](#app)
* [rui-angular:module](#module)
* [rui-angular:partial](#partial)
* [rui-angular:controller](#controller)
* [rui-angular:route](#route)
* [rui-angular:dep](#dep)
* [rui-angular:headep](#headep)
* [rui-angular:bowerdep](#bowerdep)
* [rui-angular:directive](#directive)
* [rui-angular:filter](#rest)
* [rui-angular:provider](#rest)
* [rui-angular:service](#rest)
* [rui-angular:factory](#rest)
* [rui-angular:value](#rest)
* [rui-angular:constant](#rest)
* [rui-angular:decorator](#rest)
* [rui-angular:e2e](#rest)

### Generator Options and Arguments

Most generators accept the following arguments:

* name: used in the file names, usually the first argument
* path: path to write the files, can be figured out for you implicitly depending on your current working directory and is relative to it. Internally it's converted to be relative to .gen_config
* module: module name, can be figured out implicitly if the cwd is in the modules object of .gen_config, used in the templates

Most generators accept the following options/flags:

* --pyj: switch to rapydscript for this run.
* --js: switch to javascript for this run.
* --coffee: switch to coffeescript for this run.
* --html: switch to html for this run.
* --pyml: switch to pyml for this run.
* --jade: switch to jade for this run.
* --css: switch to css for this run.
* --sass: switch to sass for this run.
* --less: switch to less for this run.

### App

Sets up a new angularjs app and walks you through configuring it and installing its dependencies.

Args: (none)

### Module

Adds a module file `name`-module.`ext`. Also adds a reference to the files in index.`ml`.

Args: name path

### Partial

Invokes both the controller and route generators. Then adds a markup template and a stylesheet. All relevant files are appended to index.`ml`'s head. Also if you're using sass
or less the stylesheet paths are appended to index.sass/index.less.

Args: name url path module

* url: this is the actual url of the route

Options: --nocss --include

* nocss: skips adding the stylesheet files
* include: skips adding a route and adds some ng-include markup in index.`ml`

### Controller

Adds a controller file `name`-ctrl.`ext` with spec `name`-ctrl-spec.`ext`.
The controller can be accessed as `name`_ctrl.

Args: name path module

### Route

Adds a route by appending some code to the target module file.

Args: name url ctrl module

* url: url route to the controller
* ctrl: controller name, by default this is set to `name`_ctrl and is optional

Options: --noctrl

* noctrl: in case there's no controller needed to be bound to the url, like in ui-router's nested views.

### Directive

Adds a directive file `name`-directive.`ext` with spec `name`-directive-spec.`ext`.
It also adds a template markup and a stylesheet, with references in index.`ml`'s head
and in index.`ss` in case its sass/less.

Args: name path module

Options: --notpl --nocss

* notpl: skip adding the markup template

### Dep

Adds a module dependency to a target through appending code. Has options to target all or a bulk, add or remove.

Args: cmd deps mods

* cmd: the command/action you want the generator to do, possible values: 'add', 'remove'
* deps: comma separated module names (no spaces) to be added/removed
* mods: comma separated list of modules to be targeted. If left empty will be set to the implicit `module`.

Options: --all --conf

* all: will use all the modules in the `modules` setting as targets.
* conf: will add given `deps` to `basic_deps` in the settings for the module generator to use it by default.

### Headep

Adds a script/style reference to the head section of index.`ml`. Generates the appropriate
markup for it and attributes for build targeting.

Args: files

* files: comma separated list of complete local path to the file to be included, relative to `app_path`.

Options: --style --concat --copy --remove

* style: adds the file as a stylesheet instead of a script.
* concat: adds a data-concat attribute. This is used by the build to concatenate targets into app.js or app.css
* copy: adds a data-copy attribute. This is used by the build to target the copying of assets to lib/ in the build target
* remove: adds a data-remove attribute. The build ignores this file. Useful for using files just for dev purposes.

### Bowerdep

Adds all the linkable files under a bower package's main option to the head section of index.`ml`.

Args: deps

* deps: comma separated list of packages to target by name in the bower_components / bower_path. If left empty the generator will attempt to scan all packages and add them.

### Rest

for filter, service, etc.. 2 files are produced main+spec and accepts the usual args and options with no special ones.

Args: name path module

### Goodies in the GenUtils class

After you inherit from the GenUtils class all this would be accessible on the
`this` object in the generator.
* \_arg: takes an argument and sets it on a variable.
* \_opt: takes an option and sets it to true in this.options['opt']
* \_ask: quick question to ask for input and set it to a variable.
* \_set\_var: takes a variable name and a list of options that affect it and handles switching and defaulting for it. 
* \_set\_marker: sets a marker variable with different markup languages in mind, affected by this.ml
* \_clean\_lines: cleans empty lines from a file. 
* \_cp\_tpls: copies from the generator's templates file based on a given glob and adds relevant files to the head of the index.
* \_raw\_cp\_tpls: just copies templates given a glob with no extra stuf done.
* \_write\_tpl: writes a string to a template.
* \_ins\_bmarker: inserts a string before a given marker into a file
* \_headep: produces a script/style reference with markup differences in mind. \_headeps is the bulk version.
* file: the yeoman file-utils object without any dest/src prefixes
* \_write\_css: writes a ss file with addition to the index markup file or the index style file appropriately.

there's some variables set by default for you on `this` as well, these are affected by options:

* ext, ml, ss: language preferences
* index, index_ss: absolute path to the index files
* basic_config: has all options set in .gen\_config

### Writing more subgenerators

All you need is to inherit from the GenUtils class and yeoman's Base generator.
Then make your own class and add that to the prototype too and export the mess.
See the filter generator for a simple straight forward example of copying templates and supporting the usual args and options with implicit default values.

### Contributing

Pull requests are welcome. Using rapydscript and the existing code/classes is preferred.

### Release History

## License

MIT
