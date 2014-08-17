'use strict';


module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var genconf = grunt.file.readJSON('.gen_config')['rui-angular'];
    var bowerconf = grunt.file.readJSON('.bowerrc');
    // config paths
    var conf = {
        dist: genconf.dist_path,
        app: genconf.app_path,
        bower: bowerconf.directory,
        assets: '<%= asset_path %>',
    }
    <% if (_in_brows('chrome')) { %>    
    process.env['CHROME_BIN'] = '<%= chrome_bin %>';
    <% } %>
    // Define the configuration for all the tasks
    grunt.initConfig({
    
    conf: conf,
    <% if (ext === 'js') { %>
    jshint: {
        main: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: '<%%= conf.app %>/**/*.js'
        }    
    },
    <% } %>
    clean: {
        dist: {
            files: [{
                dot: true,
                src: [
                    '<%%= conf.dist %>/**/*',
                    '<%%= conf.dist %>/*'
                ]
            }]
        },
    },
    <% if (ml === 'pyml') { %>
    rapydml: {
        compile: {
            files: [
                {src: ['<%%= conf.app %>/**/*.pyml', '<%%= conf.app %>/*.pyml'], expand: true}
            ]
        }
    },
    <% } %>
    <% if (ext === 'pyj') { %>
    rapydscript: {
        options: {
            prettify: true,
            stats: true,
            verbose: true
        },
        compile: {
            files: [
                {src: ['<%%= conf.app %>/**/*.pyj', '<%%= conf.app %>/*.pyj'], expand: true},
            ],
        }
    },
    <% } %>
    <% if (ext === 'coffee') { %>
    coffee: {
        options: {
            sourceMap: true,
            sourceRoot: ''
        },
        compile: {
            files: [{
                expand: true,
                src: ['<%%= conf.app %>/*.coffee', '<%%= conf.app %>/**/*.coffee'],
                ext: '.js'
            }]
        },
    },
    <% } %>
    <% if (ss === 'sass') { %>
    sass: {
        compile: {
            options: {
                loadPath: ['<%%= conf.bower %>/bootstrap-sass-official/assets/stylesheets/', '<%%= conf.bower %>/animate-sass/'],
            },
            files: [{
                expand: true,
                src: ['<%%= conf.app %>/*.{sass,scss}', '<%%= conf.app %>/**/*.{sass,scss}'],
                // src: ['<%%= conf.app %>/index.{sass, scss}'],
                ext: '.css'
            }]
        }
    },
    <% } %>
    <% if (ss === 'less') { %>
    less: {
        compile: {
            options: {
                paths: ['<%%= conf.bower %>/bootstrap/less/', '<%%= conf.bower %>/animate.css/source/'],
            },
            files: [{
                expand: true,
                src: ['<%%= conf.app %>/*.less', '<%%= conf.app %>/**/*.less', '!<%%= conf.app %>/**/_*.less'],
                // src: ['<%%= conf.app %>/index.less'],
                ext: '.css'
            }]
        }
    },
    <% } %>
    <% if (ml === 'jade') { %>
    jade: {
        compile: {
            options: {
                pretty: true
            },
            files: [{
                expand: true,
                src: ['<%%= conf.app %>/*.jade', '<%%= conf.app %>/**/*.jade'],
                ext: '.html'
            }]
        }
    },
    <% } %>
    ngAnnotate: {
        app: {
            files: [{
                expand: true,
                src: ['<%%= conf.app %>/*.js', '<%%= conf.app %>/**/*.js'],
            }]
        }
    },

    connect: {
        app: {
            options: {
                port: 9000,
                keepalive: true,
                livereload: true,
                base: ['', '<%%= conf.app %>'],
            }
        },
        dist: {
            options: {
                port: 9000,
                keepalive: true,
                livereload: true,
                base: ['<%%= conf.dist %>']
            }
        },
    },

    dom_munger: {
        read: {
            options: {
                read: [
                    {selector:'script[data-concat="true"]', attribute:'src', writeto:'js'},
                    {selector:'script[data-copy="true"]', attribute:'src', writeto:'cpjs'},
                    {selector:'link[data-copy="true"]', attribute:'href', writeto:'cpcss'},
                    {selector:'link[rel="stylesheet"][data-concat="true"]', attribute:'href', writeto:'css'},
                ]       
            },
            src: '<%%= conf.app %>/index.html'
        },
        update: {
            options: {
                remove: [
                    'script[data-remove="true"]',
                    'link[rel="stylesheet"][data-remove="true"]',
                    'script[data-concat="true"]',
                    'link[rel="stylesheet"][data-concat="true"]'
                ],
                append: [
                    {selector:'head', html:'<script src="app.js"></script>'},
                    {selector:'head', html:'<script src="templates.js"></script>'},
                    <% if (_in_mods('gettext')) { %>
                    {selector:'head', html:'<script src="translations.js"></script>'},
                    <% } %>
                    {selector:'head',html:'<link rel="stylesheet" href="app.css">'}
                ],
                callback: function($, file){
                    $('script[data-copy="true"]').attr('src', function(i, val){
                        return val.replace(/^.*\//, 'libs/');
                    }
                    );

                    $('link[data-copy="true"]').attr('href', function(i, val){
                        return val.replace(/^.*\//, 'libs/');
                    }
                    );
                    
                    $('script[data-copy="true"], link[data-copy="true"]').removeAttr('data-copy');
                }
            },
            src: '<%%= conf.app %>/index.html',
            dest: '<%%= conf.dist %>/index.html'
        }  
    },
    
    cssmin: {
        main: {
            src: '<%%= dom_munger.data.css %>',
            dest: '<%%= conf.dist %>/app.css'
        },
        libs: {
            expand: true,
            src: '<%%= conf.dist %>/libs/**/*.css'
        }
    },
    
    concat: {
        main: {
            src: '<%%= dom_munger.data.js %>',
            dest: '<%%= conf.dist %>/app.js',
        }
    },

    uglify: {
        main: {
            src: '<%%= conf.dist %>/app.js',
            dest: '<%%= conf.dist %>/app.js'
        },
        templates: {
            src: '<%%= conf.dist %>/templates.js',
            dest: '<%%= conf.dist %>/templates.js'
        },
        <% if (_in_mods('gettext')) { %>
        translations: {
            src: '<%%= conf.dist %>/translations.js',
            dest: '<%%= conf.dist %>/translations.js'
        },
        <% } %>
        libs: {
            expand: true,
            src: '<%%= conf.dist %>/libs/**/*.js'
        }
    },

    ngtemplates: {
        app: {
            options: {
                htmlmin: '<%%= htmlmin.main.options %>'
            },
            src: ['<%%= conf.app %>/**/*.html', '!index.html'],
            dest: '<%%= conf.dist %>/templates.js'
        }
    },
    
    htmlmin: {
        main: {
            options: {
                collapseBooleanAttributes:      true,
                collapseWhitespace:             true,
                removeAttributeQuotes:          true,
                removeComments:                 true, // Only if you don't use comment directives!
                removeEmptyAttributes:          true,
                removeRedundantAttributes:      true,
                removeScriptTypeAttributes:     true,
                removeStyleLinkTypeAttributes:  true
                },
            files: {'<%%= conf.dist %>/index.html': '<%%= conf.dist %>/index.html'}
        }
    },
    
    imagemin: {
        assets: {
            files: [{
                expand: true,
                src: '<%%= conf.assets %>/**/*.{png,jpg,jpeg,gif}'
            }]
        }
    },
    
    svgmin: {
        assets: {
            files: [{
                expand: true,
                src: '<%%= conf.assets %>/**/*.svg'
            }]
        }
    },
    <% if (cdn) { %>   
    cdnify: {
        <% if (_in_cdn('google')) { %>
        google: {
            options: {
                cdn: require('google-cdn-data')
            },
            dist: {
                html: ['<%%= conf.dist %>/index.html']
            }
        },
        <% } %>
        <% if (_in_cdn('cdnjs')) { %>
        cdnjs: {
            options: {
                cdn: require('cdnjs-cdn-data')
            },
            dist: {
                html: ['<%%= conf.dist %>/index.html']
            }
        },
        <% } %>
        <% if (_in_cdn('jsdelivr')) { %>
        jsdelivr: {
            options: {
                cdn: require('jsdelivr-cdn-data')
            },
            dist: {
                html: ['<%%= conf.dist %>/index.html']
            }
        },
        <% } %>
    },
    <% } %>
    autoprefixer: {
        main: {
            files: [{
                expand: true,
                src: '<%%= conf.app %>/**/*.css'
            }]
        }
    },
    
    copy: {
        assets: {
            files: [{
                expand: true,
                src: ['<%%= conf.assets %>/**'],
                dest: '<%%= conf.dist %>'
            }]
        },
        libs: {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: ['<%%= dom_munger.data.cpjs %>', '<%%= dom_munger.data.cpcss %>'],
            dest: '<%%= conf.dist %>/libs/'
        }
    },
    
    karma: {
        options: {
            frameworks: ['jasmine'],
            files: [
                '<%%= dom_munger.data.cpjs %>',
                '<%%= dom_munger.data.cpcss %>',
                '<%%= dom_munger.data.js %>',
                '<%%= dom_munger.data.css %>',
                '<%%= conf.bower %>/angular-mocks/angular-mocks.js',
                <% if (tst === 'assert') { %>
                '<%%= conf.bower %>/node-assert/assert.js',
                <% } %>
                '<%%= conf.app %>/**/*-spec.js'
            ],
            logLevel: 'ERROR',
            reporters: ['progress'],
            autoWatch: false,
            singleRun: true,
        },
        <% if (_in_brows('phantomjs')) { %>
        phantom: {
            browsers: ['PhantomJS']
        },
        <% } %>
        <% if (_in_brows('firefox') || _in_brows('chrome')) { %>
        all: {
            browsers: [<% if(_in_brows('firefox')){ %>'Firefox', <% } %><% if(_in_brows('chrome')){ %>'Chrome',<% } %>]
        }
        <% } %>
    },
    <% if (protractor) { %>
    protractor_webdriver: {
        start: {
            options: {
                command: 'webdriver-manager start --standalone'
            }
        }
    },
    
    protractor: {
        options: {
            configFile: 'protractor.conf.js',
            keepAlive: false,
        },
        run: {}
    },
    <% } %>
    <% if (_in_mods('gettext')) { %>
    nggettext_extract: {
        pot: {
            src: '<%%= conf.app %>/**/*.html',
            dest: 'po/template.pot',
        }
    },

    nggettext_compile: {
        app: {
            src: 'po/**/*.po',
            dest: '<%%= conf.app %>/translations.js'
        }, 
        dist: {
            src: 'po/**/*.po',
            dest: '<%%= conf.dist %>/translations.js'
        }
    },
    <% } %>
    watch: {
        <% if (ml === 'pyml') { %>
        pyml: {
            files: ['<%%= conf.app %>/*.pyml', '<%%= conf.app %>/**/*.pyml'],
            tasks: ['rapydml'],
            options: {
                spawn: false,
            },
        },
        <% } %>
        <% if (ml === 'jade') { %>
        jade: {
            files: ['<%%= conf.app %>/*.jade', '<%%= conf.app %>/**/*.jade'],
            tasks: ['jade'],
            options: {
                spawn: false,
            },
        },
        <% } %>
        <% if (ext === 'pyj') { %>
        pyj: {
            files: ['<%%= conf.app %>/*.pyj', '<%%= conf.app %>/**/*.pyj'],
            tasks: ['rapydscript'],
            options: {
                spawn: false,
            },
        },
        <% } %>
        <% if (ext === 'coffee') { %>
        coffee: {
            files: ['<%%= conf.app %>/*.coffee', '<%%= conf.app %>/**/*.coffee'],
            tasks: ['coffee'],
            options: {
                spawn: false,
            },
        },
        <% } %>
        <% if (ss === 'sass') { %>
        sass: {
            files: ['<%%= conf.app %>/*.{sass,scss}', '<%%= conf.app %>/**/*.{sass,scss}'],
            tasks: ['sass'],
            options: {
                spawn: false,
            },
        },
        <% } %>
        <% if (ss === 'less') { %>
        less: {
            files: ['<%%= conf.app %>/*.less', '<%%= conf.app %>/**/*.less'],
            tasks: ['less'],
            options: {
                spawn: false,
            },
        },
        <% } %>
        autoprefixer: {
            files: ['<%%= conf.app %>/**/*.css'],
            tasks: ['autoprefixer'],
            options: {
                spawn: false,
            },
        },
        ngAnnotate: {
            files: ['<%%= conf.app %>/*.js', '<%%= conf.app %>/**/*.js'],
            tasks: ['ngAnnotate'],
            options: {
                spawn: false,
            },
        },
        karma: {
            files: ['<%%= conf.app %>/*.js', '<%%= conf.app %>/**/*.js'],
            tasks: ['test'],
            options: {
                spawn: false,
            },
        },
        livereload: {
            options: {
                livereload: '<%%= connect.app.options.livereload %>'
            },
            files: [
                '<%%= conf.app %>/*.html',
                '<%%= conf.app %>/**/*.html',
                '<%%= conf.app %>/*.css',
                '<%%= conf.app %>/**/*.css',
                '<%%= conf.app %>/*.js',
                '<%%= conf.app %>/**/*.js'
            ]
        },

    },
    });
    grunt.registerTask('serve', ['connect:app']);
    grunt.registerTask('build', [
        'clean',
        'dom_munger',
        'imagemin',
        'svgmin',
        'copy',
        <% if(ml==='pyml'){ %>'rapydml',<% } %>
        <% if(ml==='jade'){ %>'jade',<% } %>
        'ngtemplates',
        <% if(ss==='sass'){ %>'sass',<% } %>
        <% if(ss==='less'){ %>'less',<% } %>
        'cssmin', 
        <% if(_in_mods('gettext')){ %>'nggettext_compile:dist',<% } %>
        <% if(ext==='pyj'){ %>'rapydscript',<% } %>
        <% if(ext==='coffee'){ %>'coffee',<% } %>
        'ngAnnotate',
        'concat',
        'uglify',
        <% if(cdn){ %>'cdnify',<% } %>
        'htmlmin'
        ]);
    grunt.registerTask('test', ['dom_munger:read', 'karma:phantom']);
    grunt.registerTask('test-browsers', ['dom_munger:read', 'karma:all']);
    grunt.registerTask('teste2e', ['protractor_webdriver', 'protractor:run']);
    grunt.registerTask('release', 'build a release target', function(target) {
        var new_dist = 'dist/' + target;
        grunt.config('conf.dist', new_dist);
        
        grunt.task.run('build');
        
        var compress_conf = {
            options: {
                mode: 'zip',
                archive: new_dist+'/'+target+'.zip',
            },
            expand: true,
            cwd: new_dist+'/',
            src: '**/*',
            dest: ''
        }
        grunt.config('compress.main', compress_conf);
        grunt.task.run('compress');
        
    });

};
