import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Build config, Cloudflare Worker / Pages Functions and tests run outside the browser.
    files: ['vite.config.js', 'vitest.config.js', 'worker-entry.js', 'functions/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.serviceworker },
    },
  },
])
