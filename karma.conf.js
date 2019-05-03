module.exports = function(config) {
  config.set({
    autoWatch: true,
    client: {
      clearContext: false
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      compilerOptions: {
        sourceMap: true,
        target: 'es6'
      },
      reports: {
        lcovonly: {
          directory: '.',
          filename: 'lcov.info',
          subdirectory: 'coverage'
        },
        html: {
          directory: '.',
          subdirectory: 'coverage'
        }
      }
    },
    frameworks: ['jasmine', 'karma-typescript'],
    files: ['src/**/*.ts'],
    preprocessors: {
      '**/*.ts': 'karma-typescript'
    },
    reporters: ['progress', 'karma-typescript'],
    browsers: ['Chrome'],
    singleRun: true
  });
};
