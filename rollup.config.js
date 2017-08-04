export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/angular-split.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'angular-split',
    globals: {
        "@angular/common": "ng.common",
        "@angular/compiler": "ng.compiler",
        "@angular/core": "ng.core",
        "rxjs/Subject": "Rx"
    },
    external: ['@angular/common', '@angular/core', 'rxjs/Subject', 'rxjs/add/operator/debounceTime']
}