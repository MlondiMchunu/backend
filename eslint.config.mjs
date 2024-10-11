import globals from "globals";
import pluginJs from "@eslint/js"
import js from "@eslint/js"
import stylisticJs from '@stylistic/eslint-plugin-js'


export default [
  js.configs.recommend,
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs" 
    } 
  },
  { 
    languageOptions: { 
      globals: { 
        ...globals.browser, ...globals.node 
      } 
    } 
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
    },
  },
  pluginJs.configs.recommended,
];