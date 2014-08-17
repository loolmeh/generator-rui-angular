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

    GenExtra.set_marker = function set_marker(){
        if (this.ext == "js") {
            this.marker = "/* Add more dependencies above */";
        } else {
            this.marker = "# Add more dependencies above";
        }
    };

    GenExtra.ask_args = function ask_args(){
        if (typeof this.cmd == "undefined") {
            this._ask("cmd");
        }
        if (typeof this.deps == "undefined") {
            this._ask("deps");
        }
        if (typeof this.module == "undefined" && typeof this.mods == "undefined") {
            this._ask("mods");
        }
    };

    GenExtra.set_args = function set_args(){
        var deps;
        deps = this.deps;
        deps = (function() {
            var _$rapyd$_Iter = deps.split(","), _$rapyd$_Result = [], dep;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                dep = _$rapyd$_Iter[_$rapyd$_Index];
                _$rapyd$_Result.push("'" + dep + "'");
            }
            return _$rapyd$_Result;
        })();
        this.deps = deps;
        if (typeof this.mods == "undefined") {
            this.mods = [ this.module ];
        } else {
            this.mods = this.mods.split(",");
        }
    };

    GenExtra.set_opts = function set_opts(){
        this.all = this.options["all"] || false;
        this.conf = this.options["conf"] || false;
    };

    GenExtra.set_brace = function set_brace(){
        if (this.ext == "coffee") {
            this.br = "[\\";
        } else {
            this.br = "[";
        }
    };

    GenExtra.find_modpaths = function find_modpaths(){
        var mpath, mod;
        if (this.all) {
            this.mod_paths = glob.sync(path.join(this.root_path, this.app_path, "*module*." + this.ext)).concat(glob.sync(path.join(this.root_path, this.app_path, "**", "*module*." + this.ext)));
        } else if (typeof this.mods == "undefined") {
            mpath = this.basic_config.modules[this.module];
            this.mod_paths = [ glob.sync(path.join(this.root_path, mpath, "*module*." + this.ext))[0] ];
        } else if (this.mods) {
            this.mod_paths = [];
            var _$rapyd$_Iter0 = this.mods;
            for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                mod = _$rapyd$_Iter0[_$rapyd$_Index0];
                mpath = this.basic_config.modules[mod];
                this.mod_paths.push(glob.sync(path.join(this.root_path, mpath, "*module*." + this.ext))[0]);
            }
        }
    };

    GenExtra._get_deps = function _get_deps(filepath, marker){
        var deps;
        this.file_content = this.readFileAsString(filepath);
        this.deps_orig = this.file_content.match(/\.module\([\s\S]*\]/)[0];
        deps = this.deps_orig.replace(/\.module\(.*$/m, "").replace(marker, "").replace(/\s*/g, "").replace(/\[|\]/g, "").replace(/\\/g, "").split(",");
        return deps;
    };

    GenExtra._set_deps = function _set_deps(filepath, deps){
        var new_deps;
        new_deps = "    " + this.br + "\n" + (function() {
            var _$rapyd$_Iter = deps, _$rapyd$_Result = [], dep;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                dep = _$rapyd$_Iter[_$rapyd$_Index];
                _$rapyd$_Result.push("    " + dep);
            }
            return _$rapyd$_Result;
        })().join(",\n") + this.marker + "\n    ]";
        new_deps = this.deps_orig.replace(/.*\[.*\n[\s\S]*.*\]/, new_deps);
        this.file_content = this.file_content.replace(/\.module\([\s\S]*\]/, new_deps);
        this.writeFileFromString(this.file_content, filepath);
    };

    GenExtra._add_deps = function _add_deps(){
        var deps, modpath;
        var _$rapyd$_Iter1 = this.mod_paths;
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            modpath = _$rapyd$_Iter1[_$rapyd$_Index1];
            deps = this._get_deps(modpath, this.marker);
            deps.unshift.apply(deps, [].concat(this.deps));
            this._set_deps(modpath, deps);
        }
    };

    GenExtra._remove = function _remove(arr, item){
        var idx;
        idx = arr.indexOf(item);
        if (idx != -1) {
            arr.splice(idx, 1);
        }
    };

    GenExtra._remove_deps = function _remove_deps(){
        var deps, dep, modpath;
        var _$rapyd$_Iter2 = this.mod_paths;
        for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
            modpath = _$rapyd$_Iter2[_$rapyd$_Index2];
            deps = this._get_deps(modpath, this.marker);
            var _$rapyd$_Iter3 = this.deps;
            for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
                dep = _$rapyd$_Iter3[_$rapyd$_Index3];
                this._remove(deps, dep);
            }
            this._set_deps(modpath, deps);
        }
    };

    GenExtra.handle_cmd = function handle_cmd(){
        if (this.cmd == "add") {
            this._add_deps();
        } else if (this.cmd == "remove") {
            this._remove_deps();
        }
    };

    GenExtra.handle_conf = function handle_conf(){
        var deps, basic_deps, dep;
        basic_deps = this.basic_config.basic_deps;
        deps = this.deps;
        deps = (function() {
            var _$rapyd$_Iter = deps, _$rapyd$_Result = [], dep;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                dep = _$rapyd$_Iter[_$rapyd$_Index];
                _$rapyd$_Result.push(dep.replace(/'/g, ""));
            }
            return _$rapyd$_Result;
        })();
        if (this.conf && this.cmd == "add") {
            basic_deps = basic_deps.concat();
            this.config.set("basic_deps", basic_deps);
        } else if (this.conf && this.cmd == "remove") {
            var _$rapyd$_Iter4 = deps;
            for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
                dep = _$rapyd$_Iter4[_$rapyd$_Index4];
                this._remove(basic_deps, dep);
            }
            this.config.set("basic_deps", basic_deps);
        }
    };

    function DepGen(){
        var self = this;
        Base.apply(self, arguments);
        self._arg("cmd");
        self._arg("deps");
        self._arg("mods");
        self._opt("all");
        self._opt("conf");
        self.mod_set = true;
    };


    util.inherits(DepGen, Base);
    _$rapyd$_mixin(DepGen.prototype, BaseGen);
    _$rapyd$_mixin(DepGen.prototype, GenExtra);
    module.exports = DepGen;
})();