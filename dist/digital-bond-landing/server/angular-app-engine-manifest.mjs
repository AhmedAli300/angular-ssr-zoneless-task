
export default {
  basePath: '/',
  allowedHosts: [
  "localhost:4000",
  "localhost",
  "127.0.0.1"
],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
