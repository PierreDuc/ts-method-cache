module.exports = function (config) {
    config.set({
        autoWatch: true,
        basePath: '',
        browsers: ['Chrome'],
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: [ 'html', 'istanbul' ],
            fixWebpackSourcePaths: true
        },
        files: [
            {pattern: "src/**/*.ts"}
        ],
        frameworks: ["jasmine", "karma-typescript"],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json",
            compilerOptions: {
                sourceMap: true,
                target: 'es6'
            }
        },
        plugins: [
            require('karma-typescript'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter')
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },
        reporters: ["progress", "karma-typescript", "kjhtml"],
        singleRun: true
    });
};