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
    var yeoman, path, genutils, util, BaseGen, Base;
    yeoman = require("yeoman-generator");
    path = require("path");
    genutils = require("../utils");
    util = require("util");
    BaseGen = genutils.BaseGen;
    Base = yeoman.generators.Base;
    function GenExtra() {
    }

    GenExtra.set_opts = function set_opts(){
        this.no_css = this.options["nocss"] || false;
        this.include = this.options["include"] || false;
        this.tpl_path = path.join(this.path, this.name + "-ctrl." + this.ml);
    };

    GenExtra.set_marker = function set_marker(){
        this._set_marker("include_marker", "markup", 3);
    };

    GenExtra.set_ml_tpl = function set_ml_tpl(){
        if (this.ml == "html") {
            this.ml_tpl = "\n<div>\ntemplate for the <%= name %> controller \n</div>\n";
        }
        if (this.ml == "pyml") {
            this.ml_tpl = "\ndiv:\n    template for the <%= name %> controller\n";
        }
        if (this.ml == "jade") {
            this.ml_tpl = "\ndiv\n    template for the <%= name %> controller \n";
        }
        this.ml_tpl = this.engine(this.ml_tpl, {
            name: this.name
        }).replace(/^\n/, "");
    };

    GenExtra.set_include_tpl = function set_include_tpl(){
        if (this.ml == "html") {
            this.include_tpl = "\n            <div ng-controller=\"<%= name %>_ctrl\">\n                <div ng-include=\"'<%= tpl_path %>'\"></div>\n            </div>\n";
        }
        if (this.ml == "pyml") {
            this.include_tpl = "\n            div(ng-controller=\"<%= name %>_ctrl\"):\n                div(ng-include=\"'<%= tpl_path %>'\")\n";
        }
        if (this.ml == "jade") {
            this.include_tpl = "\n            div(ng-controller=\"<%= name %>_ctrl\")\n                div(ng-include=\"'<%= tpl_path %>'\")\n";
        }
        this.include_tpl = this.engine(this.include_tpl, {
            name: this.name,
            tpl_path: this.tpl_path
        }).replace(/^\n/, "");
    };

    GenExtra.copy_template = function copy_template(){
        this._write_tpl(this.tpl_path, this.ml_tpl);
    };

    GenExtra.write_ctrl = function write_ctrl(){
        var path;
        if (typeof this._path == "undefined" || this._path == ".") {
            path = ".";
        } else {
            path = this._path;
        }
        this.invoke("rui-angular:controller", {
            args: [ this.name, path, this.module ],
            options: {
                js: this.options["js"],
                pyj: this.options["pyj"],
                coffee: this.options["coffee"]
            }
        });
    };

    GenExtra.write_route = function write_route(){
        if (!this.include) {
            this.invoke("rui-angular:route", {
                args: [ this.name + "-ctrl", this.url, this.name + "_ctrl", this.module ],
                options: {
                    js: this.options["js"],
                    pyj: this.options["pyj"],
                    coffee: this.options["coffee"]
                }
            });
        }
    };

    GenExtra.write_include = function write_include(){
        if (this.include) {
            this._ins_bmarker(this.index, this.include_tpl, this.include_marker);
        }
    };

    GenExtra.write_ss = function write_ss(){
        if (!this.no_css) {
            this._write_ss();
        }
    };

    function PartialGen(){
        var self = this;
        Base.apply(self, arguments);
        self._arg("name");
        self._arg("url");
        self._arg("path");
        self._path = self.path;
        self._arg("module");
        self._opt("js");
        self._opt("pyj");
        self._opt("coffee");
        self._opt("pyml");
        self._opt("html");
        self._opt("jade");
        self._opt("sass");
        self._opt("less");
        self._opt("css");
        self._opt("nocss");
        self._opt("include");
    };


    util.inherits(PartialGen, Base);
    _$rapyd$_mixin(PartialGen.prototype, BaseGen);
    _$rapyd$_mixin(PartialGen.prototype, GenExtra);
    module.exports = PartialGen;
})();