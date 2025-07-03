// frontend/vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    // Ruta de salida del build, por defecto es 'dist'
    outputDir: 'dist',
    // Configuración del servidor de desarrollo (si lo usaras localmente sin Docker Compose)
    devServer: {
        // Permite que el servidor de desarrollo sea accesible desde fuera del contenedor
        host: '0.0.0.0',
        port: 8080, // Puerto por defecto de Vue CLI para desarrollo
        // Proxy para las llamadas al backend (si lo usaras localmente sin Docker Compose)
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     pathRewrite: { '^/api': '' }
        //   }
        // }
    },
    // Configuración para variables de entorno en el build del frontend
    chainWebpack: config => {
        config.plugin('define').tap(args => {
            // Inyecta la variable de entorno del backend en el frontend
            args[0]['process.env.VUE_APP_BACKEND_URL'] = JSON.stringify(process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000');
            return args;
        });
    }
})