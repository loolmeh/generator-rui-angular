(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    }
    function _$rapyd$_mixin(target, source, overwrite) {
        for (var i in source) {
            if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) target[i] = source[i];
        }
    }
    var yeoman, path, genutils, util, glob, BaseGen, Base;
    yeoman = require("yeoman-generator");
    path = require("path");
    genutils = require("../utils");
    util = require("util");
    glob = require("glob");
    BaseGen = genutils.BaseGen;
    Base = yeoman.generators.Base;
    function GenExtra() {
    }

    GenExtra.find_tpl = function find_tpl(){
        this.log(path.join(this.root_path, this.basic_config.app_path, "**", this.name + "*." + this.ml));
        this.tpl_url = glob.sync(path.join(this.root_path, this.basic_config.app_path, "**", this.name + "*." + this.ml))[0];
        this.tpl_url = path.relative(this.root_path, this.tpl_url);
    };

    GenExtra.find_modpath = function find_modpath(){
        var mod;
        mod = this.basic_config.modules[this.module];
        this.mod_path = glob.sync(path.join(this.root_path, mod) + "/*module*." + this.ext)[0];
    };

    GenExtra.set_marker = function set_marker(){
        if (this.ext == "js") {
            this.marker = "/* Add new routes above */";
        } else {
            this.marker = "# Add new routes above";
        }
    };

    GenExtra.set_opts = function set_opts(){
        this.noctrl = this.options["noctrl"] || false;
        if (typeof this.ctrl == "undefined" || this.ctrl == ".") {
            this.ctrl = this.name + "_ctrl";
        }
    };

    GenExtra.add_route = function add_route(){
        var route;
        if (this.basic_config.router == "ngRoute") {
            route = "\n    .when('<%= url %>', {\n        templateUrl: '<%= tpl %>',\n        controller: '<%= ctrl %>',\n    })\n";
        }
        if (this.basic_config.router == "ui.router") {
            route = "\n    .state('<%= name %>', {\n        url: '<%= url %>',\n        templateUrl: '<%= tpl %>',<% if(!noctrl) {%>\n        controller: '<%= ctrl %>',<% } %>\n    })\n";
        }
        route = this.engine(route, {
            url: this.url,
            tpl: this.tpl_url,
            name: this.name,
            noctrl: this.noctrl,
            ctrl: this.ctrl
        }).replace(/^\n/, "");
        this._ins_bmarker(this.mod_path, route, this.marker);
    };

    function RouteGen(){
        var self = this;
        Base.apply(self, arguments);
        self._arg("name");
        self._arg("url");
        self._arg("ctrl");
        self._arg("module");
        self._opt("noctrl");
    };


    util.inherits(RouteGen, Base);
    _$rapyd$_mixin(RouteGen.prototype, BaseGen);
    _$rapyd$_mixin(RouteGen.prototype, GenExtra);
    module.exports = RouteGen;
})();