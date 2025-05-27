
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/UserVault/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Program%20Files/Git/UserVault/loginsignup",
    "route": "/Program%20Files/Git/UserVault"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WTO244NA.js",
      "chunk-4QPBWJYH.js"
    ],
    "route": "/Program%20Files/Git/UserVault/loginsignup"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R5MTVFJO.js",
      "chunk-4QPBWJYH.js"
    ],
    "route": "/Program%20Files/Git/UserVault/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7WZ7RWU3.js"
    ],
    "route": "/Program%20Files/Git/UserVault/dashboard"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 777, hash: 'eba41eb9c77f0dfb878d9a9e25a7efb0a53678bc0c8297c95a5d226705b7e811', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1292, hash: 'e9651d1c6faa7d9bb2b3686f0325685bd0e98c0d79bbb35bc08e26be10ab5b0c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
