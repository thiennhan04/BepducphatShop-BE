module.exports = {
  apps: [
    {
      name: 'bepducphat-BE',
      script: 'node_modules/tsx/dist/cli.mjs',
      args: './src/index.js',
      cwd: './',
      watch: false,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
}
