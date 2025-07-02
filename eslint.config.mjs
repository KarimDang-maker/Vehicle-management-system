import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // ✅ Utiliser ESM (import/export)
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      js,
    },
    extends: ['js/recommended'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
    },
  },

  // ✅ Spécifique aux fichiers de test
  {
    files: ['**/tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest, // ✅ Ajoute describe, test, expect, etc.
        ...globals.node,
      },
    },
  },
]);
