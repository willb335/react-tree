module.exports = {
  parser: 'babel-eslint',
  env: { browser: true, node: true },
  extends: ['react-app', 'airbnb', 'prettier'],
  rules: {
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 0
  }
};
