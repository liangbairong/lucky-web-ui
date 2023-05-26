import { defineConfig } from 'dumi';

const name = 'lucky-web-ui';
export default defineConfig({
  title: name,
  base: `/${name}/`,
  publicPath: `/${name}/`,
  favicon: 'https://liangbairong.gitee.io/lucky-web/favicon.ico',
  logo: 'https://liangbairong.gitee.io/lucky-web/logo.png',
  outputPath: 'docs-dist',
  mode: 'doc',
  exportStatic: {},
  styles: [
    `.__dumi-default-mobile-demo-layout{padding: 0 !important;}*{list-style: none;margin: 0;padding: 0;}`,
  ],
  themeConfig: {
    hd: {
      rules: [],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    },
  },
  chainWebpack: (config: any) => {
    config.module
      .rule('mp4')
      .test(/\.(svga|mp4|zip)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
      });
  },
});
