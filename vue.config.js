module.exports = {
    // 配置跨域代理
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:88/',    // 你自己的api接口地址
                changeOrigin: true,
                ws: true,
                // pathRewrite: {
                //     '^/api': '',  
                // }
            },
            '/my': {
                target: 'http://localhost:88/',    // 你自己的api接口地址
                changeOrigin: true,
                ws: true,
            //     // pathRewrite: {
            //     //     '^/api': '',  
            //     // }
            },
            '/comment': {
                target: 'http://localhost:88/',    // 你自己的api接口地址
                changeOrigin: true,
                ws: true,
            //     // pathRewrite: {
            //     //     '^/api': '',  
            //     // }
            },
            '/category': {
                target: 'http://localhost:88/',    // 你自己的api接口地址
                changeOrigin: true,
                ws: true,
            //     // pathRewrite: {
            //     //     '^/api': '',  
            //     // }
            },
            '/like': {
                target: 'http://localhost:88/',    // 你自己的api接口地址
                changeOrigin: true,
                ws: true,
            //     // pathRewrite: {
            //     //     '^/api': '',  
            //     // }
            },
            '/role': {
                target: 'http://localhost:88/',    // 你自己的api接口地址
                changeOrigin: true,
                ws: true,
            //     // pathRewrite: {
            //     //     '^/api': '',  
            //     // }
            },
            '/nav': {
                target: 'http://localhost:88/',    // 你自己的api接口地址
                changeOrigin: true,
                ws: true,
            //     // pathRewrite: {
            //     //     '^/api': '',  
            //     // }
            },
        }
    }
};
