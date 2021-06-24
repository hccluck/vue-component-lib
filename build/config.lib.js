const { resolve, getComponentEntries } = require('./utils');

module.exports = {
  outputDir: resolve('lib'),
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages'),
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'vue-component-lib',
    },
    resolve: {
      extensions: ['.js', '.css', '.less', '.vue', '.json'],
      alias: {
        src: resolve('src'),
        main: resolve('packages/index.js'),
      },
    },
  },
  css: {
    sourceMap: true,
    extract: {
      filename: '[name]/style.css',
    },
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 引入全局less样式变量
        // path.resolve(__dirname, './src/assets/css/theme.less'),
      ],
    },
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    config.plugins.delete('copy');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.plugins.delete('html');
    config.plugins.delete('hmr');
    config.entryPoints.delete('app');

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]';
        return option;
      });
  },
};
