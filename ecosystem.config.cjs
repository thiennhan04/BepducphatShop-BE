module.exports = {
  apps: [
    {
      name: 'bepducphat-BE',
      script: './src/index.js',
      interpreter: 'node',
      interpreter_args: '--import tsx',
      watch: false,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
}
