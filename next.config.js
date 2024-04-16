/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_PREFIX: '/apps/wenhao-javaw',
    // PATH_PREFIX: '',
  },
  async rewrites() {
    let destination;

    switch (process.env.RUNTIME_IDC_NAME) {
      case 'local':
        destination = 'http://127.0.0.1:8085/:slug*'; // Local development destination
        break;
      case 'sg':
        destination = 'http://wms-server-service.wms:8085/:slug*'; // Production destination in China
        break;
      case 'cn':
        destination = 'http://office.unibutton.com:6585//:slug*'; // Example destination for Singapore
        break;
      default:
        destination = 'http://127.0.0.1:8085/:slug*'; // Default or fallback destination
    }

    return [
      {
        source: '/wmsbackendapi/:slug*',
        destination: destination,
      },
    ];
  },
  output: 'export',
  assetPrefix: '/apps/wenhao-javaw', //加前缀
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:slug*',
  //       destination: `http://office.unibutton.com:6585//:slug*`,
  //       // destination: `http://localhost:8085/:slug*`,
  //     },
  //     //destination: `http://47.236.10.165:30085/:slug*`,
  //   ];
  // },
};

module.exports = nextConfig;
