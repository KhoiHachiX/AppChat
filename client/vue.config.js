const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
},
  devServer = {
    port : 'http://localhost:3000/'
  }
)
