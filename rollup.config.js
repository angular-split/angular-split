export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/angular-split.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.rsi',
  globals: {
    "@angular/common": "ng.common",
    "@angular/compiler": "ng.compiler",
    '@angular/core': 'ng.core'
  }
}