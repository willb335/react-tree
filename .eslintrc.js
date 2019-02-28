module.exports = {
  parser: 'babel-eslint',
  env: { browser: true, node: true },
  extends: ['react-app', 'airbnb', 'prettier'],
  rules: {
    'react/prop-types': 2,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 1
  }
};
