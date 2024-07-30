module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'vue', 'json'],
    testMatch: [
        '**/tests/*.spec.[jt]s?(x)',
        '**/__tests__/*.[jt]s?(x)'
    ],
    testEnvironment: 'jsdom'
};
