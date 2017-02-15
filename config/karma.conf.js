
module.exports = function(config) {

    var testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

    var configuration = {

        /**
         * Base path that will be used to resolve all patterns (e.g. files, exclude)
         */
        basePath: '',

        /**
         * Frameworks to use
         *
         * Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         */
        frameworks: ['jasmine', 'jasmine-matchers'],

        /**
         * List of files to exclude
         */
        exclude: [],

        client: {
            captureConsole: false
        },

        /**
         * List of files / patterns to load in the browser
         * We are building the test environment in ./spec-bundle.js
         */
        files: [
            { pattern: './config/spec-bundle.js', watched: false },
            { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
        ],

        /**
         * By default all assets are served at http://localhost:[PORT]/base/
         */
        proxies: {
            '/assets/': '/base/src/assets/'
        },

        /**
         * Preprocess matching files before serving them to the browser
         *
         * Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
         */
        preprocessors: {
            './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
        },

        webpack: testWebpackConfig,

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },

        /**
         * Webpack please don't spam the console when running in karma!
         */
        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },

        /**
         * Test results reporter to use
         *
         * Available reporters: https://npmjs.org/browse/keyword/karma-reporter
         */
        reporters: ['mocha', 'coverage', 'remap-coverage'],

        /**
         * Web server port
         */
        port: 9876,

        /**
         * Enable / disable colors in the output (reporters and logs)
         */
        colors: true,

        /**
         * Level of logging
         *
         * Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,

        /**
         * Enable / disable watching file and executing tests whenever any file changes
         */
        autoWatch: true,

        /**
         * Start these browsers
         *
         * Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         */
        browsers: [
            'Chrome'
        ],

        customLaunchers: {
            ChromeTravisCi: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        /**
         * Continuous Integration mode
         * If true, Karma captures browsers, runs the tests and exits
         */
        singleRun: false
    };

    if (process.env.TRAVIS) {
        configuration.browsers = [
            'ChromeTravisCi'
        ];
    }

    config.set(configuration);
};
