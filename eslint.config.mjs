import globals from 'globals';

export default [
    {
        files: ['*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: globals.node,
        },
        rules: {
            'no-console': 'off',
            indent: ['error', 4],
            quotes: ['error', 'single'],
        },
    },
    {
        ignores: ['node_modules/**'],
    },
];

