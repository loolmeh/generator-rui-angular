(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    }
    function _$rapyd$_in(val, arr) {
        if (arr instanceof Array || typeof arr === "string") return arr.indexOf(val) != -1;
        else {
            for (i in arr) {
                if (arr.hasOwnProperty(i) && i === val) return true;
            }
            return false;
        }
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

    GenExtra.set_deps = function set_deps(){
        if (typeof this.deps == "undefined") {
            this.deps = "all";
        } else {
            this.deps = this.deps.split(",");
        }
    };

    GenExtra.get_bowerpaths = function get_bowerpaths(){
        var bower_path;
        bower_path = this.basic_config.bower_path;
        if (this.deps == "all") {
            this.bowerpaths = glob.sync(bower_path + "/*", {
                cwd: this.root_path
            });
        } else {
            this.deps.push("");
            this.bowerpaths = glob.sync(bower_path + "/{" + this.deps.join(",") + "}", {
                cwd: this.root_path
            });
            this.bowerpaths.shift();
        }
    };

    GenExtra._bowerdeps = function _bowerdeps(pth){
        var conf, main, js, css;
        conf = JSON.parse(this.readFileAsString(path.join(this.root_path, pth, "bower.json")));
        main = conf.main;
        if (typeof main == "string") {
            main = [ main ];
        }
        js = (function() {
            var _$rapyd$_Iter = main, _$rapyd$_Result = [], dep;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                dep = _$rapyd$_Iter[_$rapyd$_Index];
                if (_$rapyd$_in("js", dep)) {
                    _$rapyd$_Result.push(path.join(pth, dep));
                }
            }
            return _$rapyd$_Result;
        })();
        css = (function() {
            var _$rapyd$_Iter = main, _$rapyd$_Result = [], dep;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                dep = _$rapyd$_Iter[_$rapyd$_Index];
                if (_$rapyd$_in("css", dep)) {
                    _$rapyd$_Result.push(path.join(pth, dep));
                }
            }
            return _$rapyd$_Result;
        })();
        return [js, css];
    };

    GenExtra.headep_bower = function headep_bower(){
        var _$rapyd$_Unpack, js, css, js_bowerdeps, css_bowerdeps, pth;
        js_bowerdeps = [];
        css_bowerdeps = [];
        var _$rapyd$_Iter0 = this.bowerpaths;
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            pth = _$rapyd$_Iter0[_$rapyd$_Index0];
            _$rapyd$_Unpack = this._bowerdeps(pth);
            js = _$rapyd$_Unpack[0];
            css = _$rapyd$_Unpack[1];
            js_bowerdeps = js_bowerdeps.concat(js);
            css_bowerdeps = css_bowerdeps.concat(css);
        }
        this._ins_bmarker(this.index, this._headeps(js_bowerdeps, "script", [ "data-copy=\"true\"" ]) + this._headeps(css_bowerdeps, "style", [ "data-copy=\"true\"" ]), this.bower_marker);
    };

    function Bowerdep(){
        var self = this;
        Base.apply(self, arguments);
        self._arg("deps");
    };


    util.inherits(Bowerdep, Base);
    _$rapyd$_mixin(Bowerdep.prototype, BaseGen);
    _$rapyd$_mixin(Bowerdep.prototype, GenExtra);
    module.exports = Bowerdep;
})();