import pluginVue from 'eslint-plugin-vue'
import standard from '@vue/eslint-config-standard'
import globals from 'globals'

export default [
  ...pluginVue.configs[
    'flat/strongly-recommended'
    // 'plugin:vue/strongly-recommended'
  ],
  ...standard,
  {
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
]
