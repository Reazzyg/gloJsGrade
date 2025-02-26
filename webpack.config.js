const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    watchFiles: path.resolve(__dirname, 'src/**/*.html'), // Следим за изменениями в HTML
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true, // Включаем Hot Module Replacement
    port: 8080,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['**/js/**', '**/components/**'], // Исключаем другие папки
          },
        },
      ],
    }),
  ],
};
