(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    }
    function setattr(obj, name, value) {
        obj[name] = value;
    }
    function getattr(obj, name) {
        return obj[name];
    }
    function range(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var length = Math.max (Math.ceil ((stop - start) / step) , 0);
        var idx = 0;
        var range = new Array(length);
        while (idx < length) {
            range[idx++] = start;
            start += step;
        }
        return range;
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
    var path, Storage, findup, _, glob, file;
    path = require("path");
    Storage = require("./storage");
    findup = require("findup-sync");
    _ = require("lodash");
    glob = require("glob");
    file = require("yeoman-generator").file;
    function BaseGen() {
    }

    BaseGen.get_basic_config = function get_basic_config(){
        var basic_deps, indent, bowerrc;
        this.root_path = path.dirname(findup(".gen_config")) || process.cwd();
        this.config = new Storage("rui-angular", path.join(this.root_path, ".gen_config"));
        this.file = file;
        this.config.defaults({
            indent: "    ",
            router: "ui.router",
            modules: {},
            basic_deps: [],
            def_ext: "js",
            def_ml: "html",
            def_ss: "css",
            def_tst: "expect",
            app_path: "app",
            asset_path: "assets",
            dist_path: "dist/dev"
        });
        this.basic_config = this.config.getAll();
        basic_deps = this.basic_config.basic_deps;
        indent = this.basic_config.indent;
        this.basic_config.basic_deps_str = (function() {
            var _$rapyd$_Iter = basic_deps, _$rapyd$_Result = [], dep;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                dep = _$rapyd$_Iter[_$rapyd$_Index];
                _$rapyd$_Result.push(indent + "'" + dep);
            }
            return _$rapyd$_Result;
        })().join("',\n") + "',";
        bowerrc = path.join(this.root_path, ".bowerrc");
        if (this.file.exists(bowerrc)) {
            this.basic_config.bower_path = this.file.readJSON(bowerrc).directory;
        } else {
            this.file.write(bowerrc, JSON.stringify({
                directory: "bower_components"
            }, null, indent));
            this.basic_config.bower_path = "bower_components";
        }
    };

    BaseGen._arg = function _arg(arg){
        var meta, _$rapyd$_Unpack;
        meta = {
            required: false,
            type: String
        };
        this.argument(arg, meta);
        if (arg == "module") {
            _$rapyd$_Unpack = [true, true];
            this.mod_req = _$rapyd$_Unpack[0];
            this.mod_set = _$rapyd$_Unpack[1];
        }
        if (arg == "name") {
            this.nm_req = true;
        }
    };

    BaseGen._ask = function _ask(attr){
        var done, prompts;
        this.attr = attr;
        if (this.options[this.attr]) {
            setattr(this, this.attr, this.options[this.attr]);
        }
        if (!getattr(this, this.attr)) {
            done = this.async();
            prompts = {
                type: "input",
                name: this.attr,
                message: "what do you want the " + this.attr + " to be?"
            };
            this.prompt(prompts, function(answers) {
                setattr(this, this.attr, getattr(answers, this.attr));
                done();
            }.bind(this));
        }
    };

    BaseGen.ask_name = function ask_name(){
        if (this.nm_req) {
            this._ask("name");
        }
    };

    BaseGen.set_path = function set_path(){
        if (this.path === "." || typeof this.path === "undefined") {
            this.path = path.relative(this.root_path, process.cwd());
        } else {
            this.path = path.relative(this.root_path, path.join(process.cwd(), this.path));
        }
    };

    BaseGen.set_module = function set_module(){
        var current, parent, mod_path, wanted_mod, mods;
        if (typeof this.mod_set !== "undefined" && this.mod_set) {
            if (typeof this.module === "undefined") {
                if (this.path === "") {
                    if (this.mod_req) {
                        this._ask("module");
                    }
                } else {
                    current = path.relative(this.root_path, process.cwd());
                    parent = process.cwd().split(path.sep);
                    parent.pop();
                    parent = path.relative(this.root_path, parent.join(path.sep));
                    mod_path = "";
                    wanted_mod = "";
                    mods = this.basic_config.modules;
                    debugger;
                    _.forIn(mods, function(path_val, mod) {
                        if (path_val === current) {
                            mod_path = path_val;
                            wanted_mod = mod;
                            return false;
                        } else if (path_val === parent) {
                            mod_path = path_val;
                            wanted_mod = mod;
                        }
                    });
                    if (wanted_mod) {
                        this.module = wanted_mod;
                    } else {
                        if (this.mod_req) {
                            this._ask("module");
                        }
                    }
                }
            }
        }
    };

    BaseGen._opt = function _opt(opt){
        this.option(opt, {
            type: Boolean,
            defaults: false
        });
    };

    BaseGen._set_var = function _set_var(nm, lst){
        var vr, opt;
        vr = getattr(this.basic_config, "def_" + nm);
        var _$rapyd$_Iter0 = lst;
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            opt = _$rapyd$_Iter0[_$rapyd$_Index0];
            if (this.options[opt]) {
                vr = opt;
            }
        }
        setattr(this, nm, vr);
    };

    BaseGen.set_ext = function set_ext(){
        this._set_var("ext", [ "js", "pyj", "coffee" ]);
    };

    BaseGen.set_ml = function set_ml(){
        this._set_var("ml", [ "html", "pyml", "jade" ]);
    };

    BaseGen.set_ss = function set_ss(){
        this._set_var("ss", [ "css", "sass", "less" ]);
    };

    BaseGen.set_tst = function set_tst(){
        this._set_var("tst", [ "assert", "expect" ]);
    };

    BaseGen.set_index = function set_index(){
        this.index = path.join(this.root_path, this.basic_config.app_path, "index." + this.ml);
    };

    BaseGen.set_index_ss = function set_index_ss(){
        this.index_ss = path.join(this.root_path, this.basic_config.app_path, "index." + this.ss);
    };

    BaseGen._write_ss = function _write_ss(){
        var ss_path, eol;
        if (this.ss == "css") {
            ss_path = path.join(this.path, this.name + "-directive." + this.ss);
            this._write_tpl(ss_path, "");
            this._ins_bmarker(this.index, this._headep(ss_path, "style", [ "data-concat=\"true\"" ]), this.idx_marker);
        } else if (this.ss == "sass" || this.ss == "less") {
            ss_path = path.join(this.path, "_" + this.name + "-directive." + this.ss);
            if (this.ss == "sass") {
                eol = "";
            } else if (this.ss == "less") {
                eol = ";";
            }
            this._ins_bmarker(this.index_ss, [ "@import \"", ss_path, "\"", eol, "\n" ].join(""), "// Add imports above");
            this._write_tpl(ss_path, "");
        }
    };

    BaseGen._set_marker = function _set_marker(nm, txt, ind_num){
        var ind, inds, mrk;
        ind = this.basic_config.indent;
        inds = (function() {
            var _$rapyd$_Iter = range(1, ind_num + 1), _$rapyd$_Result = [], i;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                i = _$rapyd$_Iter[_$rapyd$_Index];
                _$rapyd$_Result.push(ind);
            }
            return _$rapyd$_Result;
        })().join("");
        if (this.ml == "pyml") {
            mrk = "# Add " + txt + " above";
        } else if (this.ml == "html") {
            mrk = "<!-- Add " + txt + " above -->";
        } else if (this.ml == "jade") {
            mrk = "// Add " + txt + " above";
        }
        setattr(this, nm, inds + mrk);
    };

    BaseGen.set_idx_marker = function set_idx_marker(){
        this._set_marker("idx_marker", "files", 2);
    };

    BaseGen.set_bower_marker = function set_bower_marker(){
        this._set_marker("bower_marker", "bower components", 2);
    };

    BaseGen._clean_lines = function _clean_lines(pth){
        var content;
        content = this.file.read(pth);
        content = content.replace(/\n\s*\n/g, "\n");
        this.file.write(pth, content);
    };

    BaseGen._raw_cp_tpls = function _raw_cp_tpls(src_glob, dst, rename){
        if (typeof dst === "undefined") dst = "";
        if (typeof rename === "undefined") rename = "";
        var files, src, name, dest, file;
        files = glob.sync(path.join(this.sourceRoot(), src_glob));
        var _$rapyd$_Iter1 = files;
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            file = _$rapyd$_Iter1[_$rapyd$_Index1];
            src = path.relative(this.sourceRoot(), file);
            name = src.split(path.sep)[src.split(path.sep).length-1];
            if (rename) {
                name = rename;
            }
            dest = path.join(this.root_path, dst, name);
            this.template(src, dest);
        }
    };

    BaseGen._copy_tpls = function _copy_tpls(src_glob, dst){
        var files, js_headeps, src, name, file;
        files = glob.sync(path.join(this.sourceRoot(), src_glob));
        js_headeps = [];
        var _$rapyd$_Iter2 = files;
        for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
            file = _$rapyd$_Iter2[_$rapyd$_Index2];
            src = path.relative(this.sourceRoot(), file);
            name = this.name + "-" + src.split(path.sep)[src.split(path.sep).length-1];
            this.template(src, path.join(this.root_path, dst, name));
            if (_$rapyd$_in(path.extname(name).replace(".", ""), [ "js", "pyj", "coffee" ]) && !(_$rapyd$_in("spec", name))) {
                js_headeps.push(path.join(dst, name.replace(/\..*$/, ".js")));
            }
        }
        if (js_headeps) {
            this._ins_bmarker(this.index, this._headeps(js_headeps, "script", [ "data-concat=\"true\"" ]), this.idx_marker);
        }
    };

    BaseGen._write_tpl = function _write_tpl(filepath, content, data){
        filepath = path.join(this.root_path, filepath);
        this.write(filepath, this.engine(content, data));
    };

    BaseGen._ins_bmarker = function _ins_bmarker(filepath, content, marker){
        var file_content;
        file_content = this.readFileAsString(filepath);
        file_content = file_content.replace(marker, content + marker);
        this.writeFileFromString(file_content, filepath);
    };

    BaseGen._headep = function _headep(file, type, extras){
        if (typeof extras === "undefined") extras = [];
        var indent, markup;
        extras.unshift("");
        indent = this.basic_config.indent;
        if (type == "script") {
            if (this.ml == "pyml" || this.ml == "jade") {
                extras = extras.join(", ");
                markup = "script(src=\"" + file + "\"" + extras + ")";
            } else if (this.ml == "html") {
                extras = extras.join(" ");
                markup = "<script src=\"" + file + "\"" + extras + "></script>";
            }
        } else if (type == "style") {
            if (this.ml == "pyml" || this.ml == "jade") {
                extras = extras.join(", ");
                markup = "link(rel=\"stylesheet\", href=\"" + file + "\"" + extras + ")";
            } else if (this.ml == "html") {
                extras = extras.join(" ");
                markup = "<link rel=\"stylesheet\" href=\"" + file + "\"" + extras + ">";
            }
        }
        markup = indent + indent + markup;
        markup += "\n";
        return markup;
    };

    BaseGen._headeps = function _headeps(files, type, extras){
        if (typeof extras === "undefined") extras = [ "" ];
        var markup, file;
        markup = "";
        var _$rapyd$_Iter3 = files;
        for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
            file = _$rapyd$_Iter3[_$rapyd$_Index3];
            markup += this._headep(file, type, extras);
        }
        return markup;
    };

    module.exports = {
        BaseGen: BaseGen
    };
})();