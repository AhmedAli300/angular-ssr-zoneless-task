
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-JFKRMD65.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BKTB3KZ7.js",
      "chunk-D6HA4G5G.js",
      "chunk-FHMNUYFH.js",
      "chunk-OPA3Z56J.js",
      "chunk-2LSM4HRV.js",
      "chunk-AHJBMYKP.js",
      "chunk-3WHQVLHO.js"
    ],
    "route": "/done"
  },
  {
    "renderMode": 0,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4746, hash: '61eda22d8e2e5ec5aa3b9189b8dd75c995b4376e0cc8e2d71b144bc355eae7c2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3148, hash: '9c7b01cf5d0afbba9a990fa5dd0dcf47e9658b2912546bcff6134f29590e1b87', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 84401, hash: 'd38ce169bb659531234cc9698ef4f0670fd2374f02c43e4c4178750bc411d6b5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-PANZDP3D.css': {size: 4661, hash: 'ClaTpk/fKPc', text: () => import('./assets-chunks/styles-PANZDP3D_css.mjs').then(m => m.default)}
  },
};
