import pluginVue from 'eslint-plugin-vue'
import standard from '@vue/eslint-config-standard'
import globals from 'globals'

export default [
  // {
  //   // ignores: [
  //   //   'types/**'
  //   // ],
  //   languageOptions: {
  //     sourceType: 'module',
  //     globals: {
  //       ...globals.browser,
  //       ...globals.node
  //     }
  //   }
  // },

  // {
  //   name: 'app/files-to-lint',
  //   files: ['**/*.{js,mjs,jsx,vue}']
  // },

  ...pluginVue.configs[
    // 'flat/essential'
    'flat/strongly-recommended'
    // 'flat/recommended'
  ],
  ...standard,
  { ignores: ['.gitignore', '**/dist/**', '**/coverage/**', 'types/**'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'vue/no-unused-vars': 'error',
      'vue/jsx-uses-vars': 'error'
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        // ecmaVersion: 'latest',
        // sourceType: 'module',
        ecmaFeatures: {
          jsx: true // 启用 JSX 支持
        }
      }
    }
  }
]
