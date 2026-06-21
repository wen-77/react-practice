import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[contenthash][ext]',
      clean: true,
      publicPath: './',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['@tailwindcss/postcss'],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL || './data.json'),
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './public/favicon.ico',
        minify: isProduction
          ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          }
          : false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
            noErrorOnMissing: true,
            globOptions: {
              ignore: ['**/favicon.ico', '**/index.html'],
            },
          },
          {
            from: 'data.json',
            to: '.',
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false, // 禁用 .LICENSE.txt 生成
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: 'single',
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      historyApiFallback: true,
      hot: true,
      compress: true,
      port: 8080,
      open: true,
    },
  };
};
