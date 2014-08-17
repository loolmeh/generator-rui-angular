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
    var yeoman, path, genutils, util, BaseGen, Base;
    yeoman = require("yeoman-generator");
    path = require("path");
    genutils = require("../utils");
    util = require("util");
    BaseGen = genutils.BaseGen;
    Base = yeoman.generators.Base;
    function GenExtra() {
    }

    GenExtra._ask_choices = function _ask_choices(qst, lst, vr, tp){
        if (typeof tp === "undefined") tp = "list";
        var done, prompts;
        done = this.async();
        prompts = [ {
            type: tp,
            name: vr,
            message: qst,
            "default": lst[0],
            choices: lst
        } ];
        this.prompt(prompts, function(ans) {
            setattr(this, vr, getattr(ans, vr));
            done();
        }.bind(this));
    };

    GenExtra._ask_in = function _ask_in(qst, df, vr, tp){
        if (typeof tp === "undefined") tp = "input";
        var done, prompts;
        if (typeof df == "boolean") {
            tp = "confirm";
        }
        done = this.async();
        prompts = [ {
            type: tp,
            name: vr,
            message: qst,
            "default": df
        } ];
        this.prompt(prompts, function(ans) {
            setattr(this, vr, getattr(ans, vr));
            done();
        }.bind(this));
    };

    GenExtra.ask_app_name = function ask_app_name(){
        this._ask_in("app name:", "", "name");
    };

    GenExtra.ask_author = function ask_author(){
        this._ask_in("author:", "", "author");
    };

    GenExtra.ask_license = function ask_license(){
        this._ask_choices("license:", [ "MIT", "BSD", "GPL", "" ], "license");
    };

    GenExtra.set_year = function set_year(){
        var date;
        date = new Date();
        this.year = date.getFullYear();
    };

    GenExtra.ask_ext = function ask_ext(){
        this._ask_choices("scripting language:", [ "pyj", "coffee", "js" ], "ext");
    };

    GenExtra.ask_ml = function ask_ml(){
        this._ask_choices("markup language:", [ "pyml", "jade", "html" ], "ml");
    };

    GenExtra.ask_ss = function ask_ss(){
        this._ask_choices("styling language:", [ "sass", "less", "css" ], "ss");
    };

    GenExtra.ask_router = function ask_router(){
        this._ask_choices("routing module:", [ "ui.router", "ngRoute" ], "router");
    };

    GenExtra.ask_tst = function ask_tst(){
        this._ask_choices("testing style:", [ "assert", "expect" ], "tst");
    };

    GenExtra.ask_browsers = function ask_browsers(){
        this._ask_choices("browsers used to run tests:", [ "phantomjs", "chrome", "firefox" ], "browsers", "checkbox");
    };

    GenExtra.ask_chrome_bin = function ask_chrome_bin(){
        if (this._in_brows("chrome")) {
            this._ask_in("command/binary to launch chrome:", "chromium-browser", "chrome_bin");
        }
    };

    GenExtra.ask_app_path = function ask_app_path(){
        this._ask_in("source code's root path:", "app", "app_path");
    };

    GenExtra.ask_dist_path = function ask_dist_path(){
        this._ask_in("build path:", "dist", "dist_path");
    };

    GenExtra.ask_bower_path = function ask_bower_path(){
        this._ask_in("bower path:", "bower_components", "bower_path");
    };

    GenExtra.ask_asset_path = function ask_asset_path(){
        this._ask_in("asset path:", "assets", "asset_path");
    };

    GenExtra.ask_e2e = function ask_e2e(){
        this._ask_in("add protractor e2e test settings:", true, "protractor");
    };

    GenExtra.ask_cdn = function ask_cdn(){
        this._ask_in("add cdn replacements to final build:", false, "cdn");
    };

    GenExtra.ask_cdn_data = function ask_cdn_data(){
        if (this.cdn) {
            this._ask_choices("cdn data:", [ "google", "cdnjs", "jsdelivr" ], "cdn_data", "checkbox");
        }
    };

    GenExtra._in_mods = function _in_mods(mod){
        return _$rapyd$_in(mod, this.extra_mods);
    };

    GenExtra._in_brows = function _in_brows(browser){
        return _$rapyd$_in(browser, this.browsers);
    };

    GenExtra._in_cdn = function _in_cdn(data){
        return _$rapyd$_in(data, this.cdn_data);
    };

    GenExtra.ask_extra_mods = function ask_extra_mods(){
        this._ask_choices("add extra modules:", [ "ui.bootstrap", "bootstrap", "gettext", "lodash", "animate", "ngAnimate", "ui.utils", "ngAria", "ngCookies", "ngMessages", "ngResource", "ngSanitize", "ngTouch" ], "extra_mods", "checkbox");
    };

    GenExtra.ask_mod = function ask_mod(){
        this._ask_in("create main module now?", true, "mod_now");
    };

    GenExtra.ask_mod_name = function ask_mod_name(){
        if (this.mod_now) {
            this._ask_in("main module name:", "app", "mod_name");
        }
    };

    GenExtra.ask_mod_path = function ask_mod_path(){
        if (this.mod_now) {
            this._ask_in("main module prefix path:", "", "mod_path");
        }
    };

    GenExtra.ask_install = function ask_install(){
        this._ask_in("install dependencies now?", true, "install_now");
    };

    GenExtra.set_idx = function set_idx(){
        this.index = path.join(this.root_path, this.app_path, "index." + this.ml);
    };

    GenExtra.set_idx_mrk = function set_idx_mrk(){
        this._set_marker("idx_marker", "files", 2);
    };

    GenExtra.set_bower_mrk = function set_bower_mrk(){
        this._set_marker("bower_marker", "bower components", 2);
    };

    GenExtra.copy_templates = function copy_templates(){
        this._raw_cp_tpls("index." + this.ml, this.app_path);
        this._raw_cp_tpls("index." + this.ss, this.app_path);
        this.file.delete(".bowerrc");
        this._raw_cp_tpls(".bowerrc");
        this._raw_cp_tpls(".gitignore");
        this._raw_cp_tpls(".editorconfig");
        if (this.ext == "js") {
            this._raw_cp_tpls(".jshintrc");
        }
        if (this.protractor) {
            this._raw_cp_tpls("protractor.conf.js");
        }
        this._raw_cp_tpls("README.md");
        if (this.license) {
            this._raw_cp_tpls("LICENSE-" + this.license, "", "LICENSE");
        }
        this._raw_cp_tpls("bower.json");
        this._raw_cp_tpls("Gruntfile.js");
        this._raw_cp_tpls("package.json");
        if (this._in_mods("gettext")) {
            this.mkdir("po");
        }
        this.mkdir(this.dist_path);
        this.mkdir(path.join(this.dist_path, "dev"));
        this.mkdir(this.asset_path);
    };

    GenExtra._bowerdep = function _bowerdep(ref){
        var type;
        if (_$rapyd$_in("js", ref)) {
            type = "script";
        }
        if (_$rapyd$_in("css", ref)) {
            type = "style";
        }
        this._ins_bmarker(this.index, this._headep(path.join(this.bower_path, ref), type, [ "data-copy=\"true\"" ]), this.bower_marker);
    };

    GenExtra._bowerdeps = function _bowerdeps(refs){
        var ref;
        var _$rapyd$_Iter0 = refs;
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            ref = _$rapyd$_Iter0[_$rapyd$_Index0];
            this._bowerdep(ref);
        }
    };

    GenExtra.add_bowerdeps = function add_bowerdeps(){
        var deps;
        deps = [];
        deps.push("angular/angular.js");
        if (this.router == "ngRoute") {
            deps.push("angular-route/angular-route.js");
        }
        if (this.router == "ui.router") {
            deps.push("ui-router/release/angular-ui-router.js");
        }
        if (this._in_mods("bootstrap") && this.ss == "css") {
            deps.push("bootstrap/dist/css/bootstrap.css");
        }
        if (this._in_mods("ui.bootstrap")) {
            deps.push("angular-bootstrap/ui-bootstrap.js");
            deps.push("angular-bootstrap/ui-bootstrap-tpls.js");
        }
        if (this._in_mods("animate") && (this.ss == "css" || this.ss == "less")) {
            deps.push("animate.css/animate.css");
        }
        if (this._in_mods("ngAnimate")) {
            deps.push("angular-animate/angular-animate.js");
        }
        if (this._in_mods("gettext")) {
            deps.push("angular-gettext/dist/angular-gettext.js");
        }
        if (this._in_mods("lodash")) {
            deps.push("lodash/dist/lodash.compat.js");
        }
        if (this._in_mods("ui.utils")) {
            deps.push("angular-ui-utils/ui-utils.js");
        }
        if (this._in_mods("ngAria")) {
            deps.push("angular-aria/angular-aria.js");
        }
        if (this._in_mods("ngCookies")) {
            deps.push("angular-cookies/angular-cookies.js");
        }
        if (this._in_mods("ngMessages")) {
            deps.push("angular-messages/angular-messages.js");
        }
        if (this._in_mods("ngResource")) {
            deps.push("angular-resource/angular-resource.js");
        }
        if (this._in_mods("ngSanitize")) {
            deps.push("angular-sanitize/angular-sanitize.js");
        }
        if (this._in_mods("ngTouch")) {
            deps.push("angular-touch/angular-touch.js");
        }
        this._bowerdeps(deps);
    };

    GenExtra._arr_remove = function _arr_remove(items, arr){
        var item;
        var _$rapyd$_Iter1 = items;
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            item = _$rapyd$_Iter1[_$rapyd$_Index1];
            while ((i = arr.indexOf(item)) != -1) {
                arr.splice(i, 1);
            }
        }
    };

    GenExtra.set_config = function set_config(){
        this.basic_config.def_ext = this.ext;
        this.basic_config.def_ml = this.ml;
        this.basic_config.def_ss = this.ss;
        this.basic_config.def_tst = this.tst;
        this.basic_config.router = this.router;
        this._arr_remove([ "lodash", "bootstrap", "animate" ], this.extra_mods);
        this.basic_config.basic_deps = this.extra_mods;
        this.basic_config.app_path = this.app_path;
        this.dist_path = path.join(this.dist_path, "dev");
        this.basic_config.dist_path = this.dist_path;
        this.basic_config.asset_path = this.asset_path;
        delete this.basic_config.bower_path;
        delete this.basic_config.basic_deps_str;
        this.config.set(this.basic_config);
        this.file.write(".gen_config", JSON.stringify({
            "rui-angular": this.basic_config
        }, null, 4));
    };

    GenExtra.create_mod = function create_mod(){
        if (this.mod_now) {
            this.invoke("rui-angular:module", {
                args: [ this.mod_name, path.join(this.app_path, this.mod_path) ]
            });
        }
    };

    GenExtra.install_deps = function install_deps(){
        if (this.install_now) {
            this.installDependencies();
        }
    };

    function RuiGen(){
        var self = this;
        Base.apply(self, arguments);
        this.on("end", function() {
            this._clean_lines("bower.json");
            this._clean_lines("package.json");
            this._clean_lines("Gruntfile.js");
            if (this._in_mods("gettext")) {
                this._ins_bmarker(this.index, this._headep(path.join(this.app_path, "translations.js"), "script", [ "data-remove=\"true\"" ]), this.idx_marker);
            }
            if (this.install_now) {
                this.spawnCommand("npm", [ "install", "-g", "grunt-cli" ]);
                if (this.protractor) {
                    this.spawnCommand("npm", [ "install", "-g", "protractor" ]);
                    this.spawnCommand("webdriver-manager", [ "update" ]);
                }
            }
        });
    };


    util.inherits(RuiGen, Base);
    _$rapyd$_mixin(RuiGen.prototype, BaseGen);
    _$rapyd$_mixin(RuiGen.prototype, GenExtra);
    module.exports = RuiGen;
})();