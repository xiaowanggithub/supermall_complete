const path = require('path')

module.exports = {
  entry:'./src/main.js',
  output:{
    path: path.resolve(__dirname,'dist'),
    // resolve是对两个字符串进行一个拼接
    // __dirname是node里自带的一个变量，里面保存了当前文件所在路径
    filename:'bundle.js'
  },
  module:{
    rules:[
      {
          test:/\.css$/,
          use:[
              'style-loader',
              'css-loader'
          ],
          exclude:/node_modules/
      },{
          test:/\.(png|svg|jpg|gif)$/,
          use:[
              'file-loader'
          ],
          exclude:/node_modules/,
      },{
        test: /.vue$/,
        loader: "vue-loader",
        exclude:/node_modules/,
      },{
        test:/\.js$/,
        use:'babel-loader',//配置babel来转换高级的语法
        exclude:/node_modules/
      }
    ]
  }
}