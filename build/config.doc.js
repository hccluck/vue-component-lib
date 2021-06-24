const { resolve } = require('./utils');
const mdLoader = require.resolve('./md-loader/index');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 移除console
const CompressionPlugin = require('compression-webpack-plugin'); // Gzip

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PRO = process.env.NODE_ENV === 'production';

const cdn = {
  // 使用cdn分离基础工程包大小，cdn加速
  css: [],
  js: ['./static/js/vue.min.js', './static/js/vue-router.min.js'],
};

module.exports = {
  // 使用相对路径
  publicPath: IS_DEV ? './' : '././',

  // 打包输出文件夹
  outputDir: 'dist',

  // 打包输出静态资源文件夹
  assetsDir: 'static',

  // 生产禁止打包资源地图
  productionSourceMap: !IS_PRO,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 转义node_module中第三方插件es6到es5
  transpileDependencies: [],

  chainWebpack: config => {
    // 取消预获取未到的页面
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    // 自定义文件夹别名
    config.resolve.alias.set('@', resolve('src')).set('@c', resolve('src/components')).set('main', resolve('packages'));

    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .tap((options = {}) => {
        options.compilerOptions = {
          preserveWhitespace: false,
        };
        return options;
      })
      .loader('vue-loader')
      .end()
      .use(mdLoader)
      .loader(mdLoader)
      .end();

    if (IS_PRO) {
      // 生产环境注入cdn
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }

    // 添加打包分析
    if (process.env.REPORT === 'TRUE') {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },

  configureWebpack: config => {
    // 生产and测试环境, 开启Gzip代码压缩
    let pluginsPro = [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true, // 移除console
            drop_debugger: true, // 移除debugger
          },
        },
        sourceMap: false,
        parallel: true,
      }),
      new CompressionPlugin({
        // 文件开启Gzip，也可以通过服务端(如：nginx)
        algorithm: 'gzip',
        test: new RegExp('.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ];

    if (IS_PRO) {
      // 为生产环境修改插件配置
      config.plugins = [...config.plugins, ...pluginsPro];
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
      };
    }
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, // IS_PRO,
    // 开启 CSS source maps
    // sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
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
        resolve(__dirname, './src/assets/css/theme.less'),
      ],
    },
  },
};
