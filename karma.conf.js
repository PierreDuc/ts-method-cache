module.exports = function (config) {
    config.set({
        autoWatch: true,
        basePath: '',
        browsers: ['Chrome'],
        client: {
            clearContext: false
        },
        coverageReporter: {
            dir: 'coverage/',
            type: 'lcovonly',
            file: '../lcov.info'
        },
        files: [
            {pattern: 'src/**/*.ts'}
        ],
        frameworks: ['jasmine', 'karma-typescript'],
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            compilerOptions: {
                sourceMap: true,
                target: 'es6'
            }
        },
        plugins: [
            require('karma-typescript'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage')
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript', 'coverage']
        },
        reporters: ['progress', 'karma-typescript', 'coverage'],
        singleRun: true
    });
};
