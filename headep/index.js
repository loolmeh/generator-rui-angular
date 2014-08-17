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
    var yeoman, path, genutils, util, findup, BaseGen, Base;
    yeoman = require("yeoman-generator");
    path = require("path");
    genutils = require("../utils");
    util = require("util");
    findup = require("findup-sync");
    BaseGen = genutils.BaseGen;
    Base = yeoman.generators.Base;
    function GenExtra() {
    }

    GenExtra.set_opts = function set_opts(){
        this.type = "script";
        if (this.options["style"]) {
            this.type = "style";
        }
        this.extras = [];
        if (this.options["concat"]) {
            this.extras.push("data-concat=\"true\"");
        }
        if (this.options["copy"]) {
            this.extras.push("data-copy=\"true\"");
        }
        if (this.options["remove"]) {
            this.extras.push("data-remove=\"true\"");
        }
    };

    GenExtra.add_file = function add_file(){
        var markup;
        markup = this._headeps(this.files.split(","), this.type, this.extras);
        this._ins_bmarker(this.index, markup, this.idx_marker);
    };

    function HeadepGen(){
        var self = this;
        Base.apply(self, arguments);
        self._arg("files");
        self._opt("style");
        self._opt("pyml");
        self._opt("html");
        self._opt("jade");
        self._opt("concat");
        self._opt("remove");
        self._opt("copy");
    };


    util.inherits(HeadepGen, Base);
    _$rapyd$_mixin(HeadepGen.prototype, BaseGen);
    _$rapyd$_mixin(HeadepGen.prototype, GenExtra);
    module.exports = HeadepGen;
})();