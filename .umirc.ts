import { IConfig } from 'umi-types';

const config: IConfig = {
  plugins: [
    [
      'umi-plugin-block-dev',
      {
        layout: process.env.LAYOUT || 'ant-design-pro',
        menu: {
          name: process.env.BLOCK,
          icon: 'home',
        },
      },
    ],
    [
      'umi-plugin-react',
      {
        dva: true,
        locale: true,
        antd: true,
      },
    ],
  ],
};

export default config;
