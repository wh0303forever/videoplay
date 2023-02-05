module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.cugxp.top:8282/', //接口域名
                changeOrigin: true,             //是否跨域
                ws: true,                       //是否代理 websockets
                secure: false,                   //是否https接口
                pathRewrite: {                  //路径重置
                    '^/api': ''
                }
            }
        }
    },
    // 基本路径 baseURL已经过时
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    assetsDir:'static'
};