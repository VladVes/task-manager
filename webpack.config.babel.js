import path from 'path';

export default () => ({
  entry: './client/index.js',
  output: {
    filename: 'application.js',
    path: path.join(__dirname, 'public', 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ]
  },
});
