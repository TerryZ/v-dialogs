/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const path = require('node:path')
const createAliasSetting = require('@vue/eslint-config-standard/createAliasSetting')
// '@vue/eslint-config-prettier/skip-formatting'
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: [
    'types/'
  ],
  settings: {
    ...createAliasSetting({
      '@': `${path.resolve(__dirname, './src')}`
    })
  }
}
