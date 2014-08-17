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
        this.no_tpl = this.options["notpl"] || false;
        this.no_css = this.options["nocss"] || false;
    };

    GenExtra.set_ml_tpl = function set_ml_tpl(){
        if (this.ml == "html") {
            this.ml_tpl = "\n<div>\nthe <%= name %> directive \n</div>\n";
        }
        if (this.ml == "pyml") {
            this.ml_tpl = "\ndiv:\n    the <%= name %> directive\n";
        }
        if (this.ml == "jade") {
            this.ml_tpl = "\ndiv\n    the <%= name %> directive\n";
        }
        this.ml_tpl = this.engine(this.ml_tpl, {
            name: this.name
        }).replace(/^\n/, "");
    };

    GenExtra._escape = function _escape(val){
        return val.replace(/\n/g, "\\n");
    };

    GenExtra.copy_template = function copy_template(){
        if (!this.no_tpl) {
            this.tpl_path = path.join(this.path, this.name + "-directive." + this.ml);
            this._write_tpl(this.tpl_path, this.ml_tpl);
        }
        this._copy_tpls("*." + this.ext, this.path);
    };

    GenExtra.write_ss = function write_ss(){
        if (!this.no_css) {
            this._write_ss();
        }
    };

    function DirGen(){
        var self = this;
        Base.apply(self, arguments);
        self._arg("name");
        self._arg("path");
        self._arg("module");
        self._opt("js");
        self._opt("pyj");
        self._opt("coffee");
        self._opt("notpl");
        self._opt("nocss");
        self._opt("pyml");
        self._opt("html");
        self._opt("jade");
    };


    util.inherits(DirGen, Base);
    _$rapyd$_mixin(DirGen.prototype, BaseGen);
    _$rapyd$_mixin(DirGen.prototype, GenExtra);
    module.exports = DirGen;
})();