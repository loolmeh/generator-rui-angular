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

    GenExtra.copy_template = function copy_template(){
        this._copy_tpls("*." + this.ext, this.path);
    };

    function FilterGen(){
        var self = this;
        Base.apply(self, arguments);
        self._arg("name");
        self._arg("path");
        self._arg("module");
        self._opt("js");
        self._opt("pyj");
        self._opt("coffee");
    };


    util.inherits(FilterGen, Base);
    _$rapyd$_mixin(FilterGen.prototype, BaseGen);
    _$rapyd$_mixin(FilterGen.prototype, GenExtra);
    module.exports = FilterGen;
})();