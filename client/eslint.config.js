import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
// import react from 'eslint-plugin-react'
// import jsxA11y from 'eslint-plugin-jsx-a11y'
// import lintPlugin from '@typescript-eslint/eslint-plugin'
// import regexp from 'eslint-plugin-regexp'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended,
            // 'plugin:react/recommended',
            // 'plugin:jsx-a11y/recommended',
            // 'plugin:@typescript-eslint/recommended',
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            // 'react': react, // Добавляем плагин React
            // 'jsx-a11y': jsxA11y, // Добавляем плагин для доступности JSX
            // '@typescript-eslint': lintPlugin, // Плагин для TypeScript
            // 'regexp': regexp, // Плагин для регулярных выражений
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error"]
        },
    },
)