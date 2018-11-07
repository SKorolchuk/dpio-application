// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const {
    join
} = require('path');
const {
    constants
} = require('karma');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = () => {
    return {
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-junit-reporter'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            captureConsole: false
        },
        junitReporter: {
            outputDir: 'reports/junit/',
            outputFile: 'TESTS-xunit.xml',
            useBrowserName: false,
            suite: '' // Will become the package name attribute in xml testsuite element
        },
        coverageIstanbulReporter: {
            dir: join(__dirname, '../../coverage'),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['progress', 'kjhtml', 'junit'],
        port: 9876,
        colors: true,
        logLevel: constants.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false
    };
};