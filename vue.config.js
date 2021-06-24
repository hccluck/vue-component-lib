module.exports = process.env.VUE_APP_ENV === 'lib' ? require('./build/config.lib') : require('./build/config.doc');
