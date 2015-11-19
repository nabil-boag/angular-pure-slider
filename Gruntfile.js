/* global module, require */

module.exports = function (grunt) {

  var os = require('os');

  grunt.registerTask('build', [
    'jshint',
    'jscs',
    'clean:build',
    'copy:build'
  ]);
  grunt.registerTask('test', [
    'test:unit',
    'test:service'
  ]);
  grunt.registerTask('test:local', [
    'test:unit',
    'test:service:local'
  ]);
  grunt.registerTask('test:unit', ['karma:headless_unit']);
  grunt.registerTask('test:service', [
    'connect:dev',
    'protractor:acceptance'
  ]);
  grunt.registerTask('test:service:local', [
    'connect:dev',
    'protractor:acceptanceLocal'
  ]);
  grunt.registerTask('package', [
    'clean:package',
    'concat:package',
    'uglify:package'
  ]);
  grunt.registerTask('workflow:dev', [
    'connect:dev',
    'build',
    'open:dev',
    'watch:dev'
  ]);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.initConfig({
    app: {
      name: 'angular-pure-slider',
      source_dir: 'app/src',
      build_dir: 'app/build',
      package_dir: 'app/package',
      connect_port: grunt.option('connect_port') || 2302,
      hostname: os.hostname()
    },

    jshint: {
      source: [
        '*.js',
        '<%= app.source_dir %>/**/*.js',
        '!<%= app.source_dir %>/bower_components/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      source: [
        '*.js',
        '<%= app.source_dir %>/**/*.js',
        '!<%= app.source_dir %>/bower_components/**/*.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },

    karma: {
      headless_unit: {
        options: {
          configFile: 'karma-unit.conf.js',
          browsers: ['PhantomJS']
        }
      }
    },

    concat: {
      package: {
        src: [
          // include the converter first
          '<%= app.build_dir %>/*converter.js',
          '<%= app.build_dir %>/*.js',
          '!<%= app.build_dir %>/*.spec.js'
        ],
        dest: '<%= app.package_dir %>/<%= app.name %>.js'
      }
    },

    uglify: {
      package: {
        files: {
          '<%= app.package_dir %>/<%= app.name %>.min.js': [
            '<%= app.package_dir %>/<%= app.name %>.js'
          ]
        }
      }
    },

    connect: {
      options: {
        hostname: '*'
      },
      dev: {
        options: {
          port: '<%= app.connect_port %>',
          base: '<%= app.build_dir %>'
        }
      }
    },

    protractor: {
      acceptance: {
        options: {
          configFile: 'protractor.conf.js',
          args: {
            baseUrl: 'http://<%= app.hostname %>:<%= app.connect_port %>',
            seleniumAddress: 'http://localhost:4444/wd/hub'
          }
        }
      },
      acceptanceLocal: {
        options: {
          configFile: 'protractor.local.conf.js',
          args: {
            directConnect: true,
            baseUrl: 'http://<%= app.hostname %>:<%= app.connect_port %>',
            capabilities: {
              browserName: 'chrome'
            }
          }
        }
      }
    },

    open: {
      dev: {
        url: 'http://<%= app.hostname %>:<%= app.connect_port %>'
      }
    },

    watch: {
      dev: {
        files: ['<%= app.source_dir %>/**/*'],
        tasks: ['build', 'test:unit'],
        options: {
          livereload: true
        }
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= app.source_dir %>',
            src: ['**', '!css/**'],
            dest: '<%= app.build_dir %>'
          },
          {
            expand: true,
            src: 'bower.json',
            dest: '<%= app.build_dir %>'
          }
        ]
      },
      package: {
        files: [
          {
            expand: true,
            cwd: '<%= app.build_dir %>',
            src: ['bower.json', '*.js', '!*.spec.js'],
            dest: '<%= app.package_dir %>'
          }
        ]
      }
    },

    clean: {
      build: '<%= app.build_dir %>',
      package: '<%= app.package_dir %>'
    }
  });
};
