module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'semi': 1,
    'standard/object-curly-even-spacing': 1,
    'standard/array-bracket-even-spacing': 1,
    'comma-dangle': 1,
    'space-before-function-paren': 1,
    'space-before-blocks': 1,
    'no-trailing-spaces': 1,
    'keyword-spacing': 1,
    'no-unused-vars': 1,
    'key-spacing': 1,
    'comma-spacing': 1,
    'space-infix-ops': 1,
    'quotes': 1,
    'block-spacing': 1,
    'space-in-parens': 1,
    // no-undef has to be off for p5 to pass
    'no-undef': 1,
    'no-inner-declarations': 1,
    'no-floating-decimal': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    'indent': 0,
    'no-multiple-empty-lines': 0,
    'padded-blocks': 0,
    'no-trailing-spaces': 0,
    'spaced-comment': 0,
    'no-new-func': 0,
    'new-cap': 0
  },
  globals: {}
}
