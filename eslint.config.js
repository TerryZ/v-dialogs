import pluginVue from 'eslint-plugin-vue'
import standard from '@vue/eslint-config-standard'
import globals from 'globals'

export default [
  {
    ignores: [
      'types/**'
    ]
  },
  ...pluginVue.configs[
    'flat/strongly-recommended'
    // 'plugin:vue/strongly-recommended'
  ],
  ...standard,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true // 启用 JSX 支持
        }
      }
    }
  }
]
