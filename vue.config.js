const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
    // lintOnSave: process.env.NODE_ENV !== 'production'
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/demo0409/' : '/', //设置output.publicPath，区分生产环境和开发环境
    outputDir: 'demo0409', //生成的生产环境构建文件的目录,默认dist文件名
    assetsDir: 'static', //配置静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    productionSourceMap: false, //生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    configureWebpack: config => { //默认开启gzip压缩(https://www.buchang.com)中nginx支持
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets: true
                })
            );
        } else {

        }
    },
    devServer: { // 配置 webpack-dev-server 行为。
        open: process.env.NODE_ENV === "development",
        host: 'localhost',
        port: 8888,
        https: false,
        hot: true,
        hotOnly: true,
        open: true,
        proxy: '', // string | Object
        before: app => {}
    },
    css: {
        //向所有 less 样式传入共享的全局变量
        loaderOptions: {
            less: {
              javascriptEnabled: true
            }
        },
        extract: true,

        // 是否开启 CSS source map？
        sourceMap: false,

        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    chainWebpack: config => {
        //新增别名
        config.resolve.alias
        .set('@$', resolve('src'))
        .set('@img', resolve('src/assets/img'))
        //向所有 Less 样式传入共享的全局变量
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    }
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, 'src/assets/less/mixins.less'), // 需要全局导入的less
            ],
        })
}