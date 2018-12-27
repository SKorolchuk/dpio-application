const path = require('path');
const project = require(path.join(process.cwd(), 'project.json'));
var nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const locales = Object.keys(project.locales);

const config = {
    entry: {
        server: './server.ts'
    },
    resolve: {
        modules: [".", "node_modules"],
        extensions: [".js", ".webpack.js", ".web.js", ".d.ts", ".ts"],
        alias: {}
    },
    target: 'node',
    externals: [nodeExternals({
        whitelist: []
    })],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        // ...
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true),
            'window': JSON.stringify(true)
        }),
        // ...
    ]
};

for (let i = 0; i < locales.length; i++) {
    config.resolve.alias[`main.server.${locales[i].toLowerCase()}`] = path.join(__dirname, 'dist', 'server', locales[i]
        .toLowerCase(), 'main.js')
}

module.exports = config;