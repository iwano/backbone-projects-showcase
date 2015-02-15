'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'handlebars'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
                    'test/spec/**/*.js'
                ]
            },
            handlebars: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/*.hbs'
                ],
                tasks: ['handlebars']
            },
            test: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test:true']
            },
            styles: {
              files: ['<%= yeoman.app %>/styles/{,*/}*.{scss, sass}'],
              tasks: ['compass', 'autoprefixer']
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                httpFontsPath: '/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dev: {
                environment: 'development'
            },
            dist: {
                environment: 'production'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        jasmine: {
            all:{
                src : [
                    '<%= yeoman.app %>/scripts/main.js',
                    '<%= yeoman.app %>/scripts/projectsFixtures.js',
                    '<%= yeoman.app %>/scripts/templates.js',
                    '<%= yeoman.app %>/scripts/helpers/formatDate.js',
                    '<%= yeoman.app %>/scripts/helpers/isActive.js',
                    '<%= yeoman.app %>/scripts/helpers/isFilterActive.js',
                    '<%= yeoman.app %>/scripts/helpers/ownerImage.js',
                    '<%= yeoman.app %>/scripts/helpers/projectDetailsTitle.js',
                    '<%= yeoman.app %>/scripts/helpers/showProgress.js',
                    '<%= yeoman.app %>/scripts/routes/projects-router.js',
                    '<%= yeoman.app %>/scripts/models/project.js',
                    '<%= yeoman.app %>/scripts/collections/projects.js',
                    '<%= yeoman.app %>/scripts/views/base-view.js',
                    '<%= yeoman.app %>/scripts/views/projects-view.js',
                    '<%= yeoman.app %>/scripts/views/project-view.js',
                    '<%= yeoman.app %>/scripts/views/projectDetails-view.js'
                ],
                options: {
                    keepRunner: true,
                    specs : 'test/spec/**/*.js',
                    vendor : [
                        'node_modules/sinon/pkg/sinon.js',
                        '<%= yeoman.app %>/bower_components/jquery/dist/jquery.js',
                        '<%= yeoman.app %>/bower_components/lodash/dist/lodash.js',
                        '<%= yeoman.app %>/bower_components/backbone/backbone.js',
                        '<%= yeoman.app %>/bower_components/handlebars/handlebars.js',
                        '<%= yeoman.app %>/bower_components/Backbone.localStorage/backbone.localStorage.js',
                        '<%= yeoman.app %>/bower_components/backbone-query-parameters/backbone.queryparams-1.1-shim.js',
                        '<%= yeoman.app %>/bower_components/backbone-query-parameters/backbone.queryparams.js',
                        '<%= yeoman.app %>/bower_components/pickadate/lib/picker.js',
                        '<%= yeoman.app %>/bower_components/pickadate/lib/picker.date.js',
                        '<%= yeoman.app %>/bower_components/pickadate/lib/legacy.js',
                        '<%= yeoman.app %>/bower_components/moment/moment.js',
                        '.tmp/scripts/templates.js'
                    ]
                }
            }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                      expand: true,
                      dot: true,
                      cwd: '<%= yeoman.app %>',
                      dest: '<%= yeoman.dist %>',
                      src: [
                          '*.{ico,txt}',
                          'images/{,*/}*.{webp,gif,svg}',
                          'fonts/{,*/}*.*',
                      ]
                    },
                    {
                        src: 'node_modules/apache-server-configs/dist/.htaccess',
                        dest: '<%= yeoman.dist %>/.htaccess'
                    },
                    {
                        expand: true,
                        dest: '<%= yeoman.dist %>',
                        cwd: 'heroku',
                        src: '*',
                        rename: function (dest, src) {
                            var path = require('path');
                            if (src === 'distpackage.json') {
                              return path.join(dest, 'package.json');
                          }
                            return path.join(dest, src);
                        }
                    }
                ]
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'JST'
                },
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.hbs']
                }
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*',
                    ]
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'compass:dev',
                'autoprefixer',
                'createDefaultTemplate',
                'handlebars',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'compass:dev',
            'autoprefixer',
            'createDefaultTemplate',
            'handlebars',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', function (isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
                'clean:server',
                'compass:dev',
                'autoprefixer',
                'createDefaultTemplate',
                'handlebars',
                'jasmine'
            ];

        if(!isConnected) {
            return grunt.task.run(testTasks);
        } else {
            // already connected so not going to connect again, remove the connect:test task
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'autoprefixer',
        'createDefaultTemplate',
        'handlebars',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
