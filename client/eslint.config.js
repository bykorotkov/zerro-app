import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import unusedImports from 'eslint-plugin-unused-imports'
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['dist', 'storybook-static', '.storybook', 'node_modules'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            prettierConfig
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks, // Правила для useEffect/useCallback
            'react-refresh': reactRefresh, // Валидация Fast Refresh
            'unused-imports': unusedImports, // Поиск неиспользуемых импортов
            '@stylistic': stylistic, // Стилистические правила (бывший eslint-plugin-prettier)
            prettier: prettierPlugin,
        },
        rules: {
            /* ========== Базовые правила ========== */
            'no-console': ['error', { allow: ['error'] }], // Запрет console.log (кроме console.error)
            'prettier/prettier': 'error', // Интеграция с Prettier

            /* ========== Стилистические правила ========== */
            '@stylistic/quotes': ['error', 'backtick', { avoidEscape: true }], // Обратные кавычки `
            '@stylistic/quote-props': ['error', 'as-needed'], // Кавычки в свойствах только при необходимости
            '@stylistic/jsx-quotes': ['error', 'prefer-double'], // Двойные кавычки в JSX
            '@stylistic/arrow-parens': ['error', 'always'], // Всегда скобки в стрелочных функциях: (x) => {}
            '@stylistic/comma-dangle': 'off', // Висящие запятые в многострочных объектах
            '@stylistic/no-confusing-arrow': 'error', // Запрет неочевидных стрелочных функций
            '@stylistic/no-multi-spaces': 'error', // Запрет множественных пробелов

            /* ========== Неиспользуемые импорты ========== */
            'no-unused-vars': 'off', // Отключаем встроенное правило (заменяем на TS-версию)
            'unused-imports/no-unused-imports': 'error', // Ошибка для неиспользуемых импортов
            'unused-imports/no-unused-vars': [ // Варнинги для неиспользуемых переменных
                'warn',
                {
                    vars: 'all', // Проверять все переменные
                    varsIgnorePattern: '^_', // Игнорировать переменные, начинающиеся с _
                    args: 'none', // Не проверять аргументы функций
                    argsIgnorePattern: '^_' // Игнорировать аргументы, начинающиеся с _
                }
            ],

            /* ========== React правила ========== */
            'react-hooks/exhaustive-deps': 'error', // Проверка зависимостей хуков
            'react-refresh/only-export-components': [ // Валидация Fast Refresh
                'warn',
                { allowConstantExport: true } // Разрешает экспорт констант
            ],

            /* ========== TypeScript правила ========== */
            '@typescript-eslint/no-explicit-any': 'off', // Разрешаем использование `any`
            '@typescript-eslint/ban-ts-comment': [ // Контроль TS-комментариев
                'error',
                {
                    'ts-expect-error': 'allow-with-description', // Разрешить с описанием
                    'minimumDescriptionLength': 0 // Минимальная длина описания
                }
            ],
            '@typescript-eslint/no-var-requires': 'off', // Разрешаем require()
            '@typescript-eslint/no-unused-vars': 'off', // Отключаем в пользу unused-imports
            '@typescript-eslint/consistent-type-imports': [ // Единообразие импортов типов
                'error',
                {
                    prefer: 'type-imports', // Предпочитать import type {}
                    fixStyle: 'separate-type-imports' // Отдельные импорты для типов
                }
            ],
            '@typescript-eslint/no-require-imports': 'off' // Разрешаем require()
        },
    },
)