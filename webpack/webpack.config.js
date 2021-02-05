const webpack = require('webpack')
module.exports={
    entry: {
        app:["webpack-hot-middleware/client?noInfo=true&reload=true","./src/dev.js"],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}