const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {

    isProd = options.env === 'production';

    return {

        /**
         * The entry point for the bundle
         * Our Angular.js app
         *
         * See: http://webpack.github.io/docs/configuration.html#entry
         */
        entry: {

            'polyfills': helpers.root('src/polyfills.browser.ts'),

            'main': AOT ? helpers.root('src/main.browser.aot.ts') : helpers.root('src/main.browser.ts')

        },

        /**
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {

            /**
             * An array of extensions that should be used to resolve modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions: ['.ts', '.js', '.json'],

            /**
             * An array of directory names to be resolved to the current directory
             */
            modules: [helpers.root('src'), helpers.root('node_modules')],

        },

        /**
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module: {

            /**
             * An array of applied pre and post loaders.
             *
             * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
             */
            rules: [

                /**
                 * Typescript loader support for .ts
                 *
                 * Component Template/Style integration using `angular2-template-loader`
                 * Angular 2 lazy loading (async routes) via `ng-router-loader`
                 *
                 * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
                 * order of the loader matter.
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 * See: https://github.com/TheLarkInn/angular2-template-loader
                 * See: https://github.com/shlomiassaf/ng-router-loader
                 */
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: '@angularclass/hmr-loader',
                            options: {
                                pretty: !isProd,
                                prod: isProd
                            }
                        },
                        {
                            // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                            loader: 'ng-router-loader',
                            options: {
                                loader: 'async-import',
                                genDir: 'compiled',
                                aot: AOT
                            }
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: 'tsconfig.webpack.json',
                                useCache: true
                            }
                        },
                        {
                            loader: 'angular2-template-loader'
                        }
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },

                /**
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test: /\.json$/,
                    use: 'json-loader',
                },

                /**
                 * Raw loader support for *.css files
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.css$/,
                    use: [
                        'to-string-loader',
                        'css-loader'
                    ],
                    exclude: [helpers.root('src', 'styles')]
                },

                /**
                 * Sass loader support for *.scss files
                 * Returns file content ascle
                 *
                 * See: https://github.com/jtangelder/sass-loader
                 */
                {
                    test: /\.scss$/,
                    use: [
                        'raw-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    helpers.root('src/assets/sass/variables.scss'),
                                    helpers.root('src/assets/sass/mixins.scss'),
                                ]
                            },
                        },
                    ],
                    exclude: [helpers.root('src', 'styles')]
                },

                /**
                 * Raw loader support for *.html
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: [helpers.root('src/index.html')]
                },

                /**
                 * File loader for supporting images, for example, in CSS files.
                 *
                 * See: https://github.com/webpack/file-loader
                 */
                {
                    test: /\.(jpg|png|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/images/[name].[ext]'
                            }
                        }
                    ]
                },

                /**
                 * URL loader for fonts and svg.
                 *
                 * See: https://github.com/webpack/url-loader
                 */
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                    loader: 'url-loader?limit=100000'
                }

            ]

        },

        /**
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins: [

            /**
             * Plugin: DotenvPlugin
             * Description: Use dotenv with webpack.
             *
             * See: https://github.com/nwinch/webpack-dotenv-plugin
             * See: https://github.com/lucaskatayama/webpack-dotenv-plugin
             */
            new DotenvPlugin({
                sample: '.env.default',
                path: '.env'
            }),

            /**
             * Plugin: AssetsPlugin
             */
            new AssetsPlugin({
                path: helpers.root('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),

            /**
             * Plugin: ForkCheckerPlugin
             * Description: Do type checking in a separate process, so webpack don't need to wait.
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
             */
            new CheckerPlugin(),

            /**
             * Plugin: CommonsChunkPlugin
             * Description: Shares common code between the pages.
             * It identifies common modules and put them into a commons chunk.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
             * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
             */
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),

            /**
             * Plugin: CommonsChunkPlugin
             * Description: This enables tree shaking of the vendor modules
             */
            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['main'],
                minChunks: module => /node_modules\//.test(module.resource)
            }),

            /**
             * Plugin: CommonsChunkPlugin
             * Description: Specify the correct order the scripts will be injected in
             */
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),

            /**
             * Plugin: ContextReplacementPlugin
             * Description: Provides context to Angular's use of System.import
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
             * See: https://github.com/angular/angular/issues/11580
             */
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.root('src')
            ),

            /**
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             *
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([
                { from: 'src/assets/images', to: 'assets/images' }, // images
                { from: 'src/assets/js', to: 'assets/js' }, // scripts
                { from: 'src/meta' },

                // Fonts
                { from: 'node_modules/font-awesome/fonts', to: 'assets/fonts' }, // FontAwesome
                { from: 'node_modules/bootstrap-sass/assets/fonts/bootstrap', to: 'assets/fonts' }, // Bootstrap
            ]),

            /**
             * Plugin: HtmlWebpackPlugin
             * Description: Simplifies creation of HTML files to serve your webpack bundles.
             * This is especially useful for webpack bundles that include a hash in the filename
             * which changes every compilation.
             *
             * See: https://github.com/ampedandwired/html-webpack-plugin
             */
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency',
                metadata: METADATA,
                inject: 'head'
            }),

            /**
             * Plugin: ScriptExtHtmlWebpackPlugin
             * Description: Enhances html-webpack-plugin functionality
             * with different deployment options for your scripts including:
             *
             * See: https://github.com/numical/script-ext-html-webpack-plugin
             */
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new LoaderOptionsPlugin({
                options: {
                    context: helpers.root('.')
                }
            }),

            // Fix Angular 2
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)async/,
                helpers.root('node_modules/@angular/core/src/facade/async.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)collection/,
                helpers.root('node_modules/@angular/core/src/facade/collection.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)errors/,
                helpers.root('node_modules/@angular/core/src/facade/errors.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)lang/,
                helpers.root('node_modules/@angular/core/src/facade/lang.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)math/,
                helpers.root('node_modules/@angular/core/src/facade/math.js')
            ),

            new ngcWebpack.NgcWebpackPlugin({
                disabled: !AOT,
                tsConfig: helpers.root('tsconfig.webpack.json'),
                resourceOverride: helpers.root('config/resource-override.js')
            }),

            /**
             * Plugin: BundleAnalyzerPlugin
             * Description: Utility that represents bundle content as
             * convenient interactive zoomable treemap
             *
             * See: https://github.com/th0r/webpack-bundle-analyzer
             */
            // new BundleAnalyzerPlugin()

        ],

        /**
         * Disable performance hints
         *
         * See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
         */
        performance: {
            hints: false
        },

        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }

    };

};
