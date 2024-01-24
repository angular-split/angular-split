# Changelog

## [17.2.0](https://github.com/angular-split/angular-split/compare/angular-split-v17.1.1...angular-split-v17.2.0) (2024-01-24)


### Features

* add keyboard accessibility ([#317](https://github.com/angular-split/angular-split/issues/317)) ([5b45039](https://github.com/angular-split/angular-split/commit/5b450398cffed30642ffc133b3d578f3fd8f303b))
* add wildcard support for percent mode ([ceab929](https://github.com/angular-split/angular-split/commit/ceab929a4c2539109f758b29c3faa061da7b7fe1))
* allow for setting global config ([#309](https://github.com/angular-split/angular-split/issues/309)) ([65a11d7](https://github.com/angular-split/angular-split/commit/65a11d70e3c46111e778fe1c3b5ee737bc04f822))
* deprecate .forRoot() and .forChild() methods ([07636fc](https://github.com/angular-split/angular-split/commit/07636fc4a0ad691da204bc98673cf945015b988c))
* integrate iframe fix ([37db046](https://github.com/angular-split/angular-split/commit/37db046f731ade7021ff91ebd0c175f11f79dcd9))
* introduce eslint and remove tslint closes ([#374](https://github.com/angular-split/angular-split/issues/374)) ([#382](https://github.com/angular-split/angular-split/issues/382)) ([b8431f4](https://github.com/angular-split/angular-split/commit/b8431f4631a3ed3b658729e89c95ec11297e1971))
* support angular compiler strict templates ([#353](https://github.com/angular-split/angular-split/issues/353)) ([2f77a67](https://github.com/angular-split/angular-split/commit/2f77a67b43c2eaa131f5c2d56b4fdda17af2e268))
* support custom gutter template ([2337745](https://github.com/angular-split/angular-split/commit/233774535909a19c1b04962c20de51557a402b6f))


### Bug Fixes

* add a delta to mouse click/double click to make sure double click gets recognized ([97967ed](https://github.com/angular-split/angular-split/commit/97967ed0fd58c83e4daf6fef2c43fcb9eeca76aa))
* aria-valuenow incorrectly set to wildcard ([#368](https://github.com/angular-split/angular-split/issues/368)) ([bcb4aa0](https://github.com/angular-split/angular-split/commit/bcb4aa0bd319dd5ba84fd135186e1454911d3d7e))
* change default area size from null to * ([#358](https://github.com/angular-split/angular-split/issues/358)) ([21f1004](https://github.com/angular-split/angular-split/commit/21f100453f4406559bcf5ee0a04213a157e37f45))
* export internal interfaces ([#315](https://github.com/angular-split/angular-split/issues/315)) ([77db412](https://github.com/angular-split/angular-split/commit/77db412694c1265799984a5070534e6f6ea3a384))
* fire dragStart event only when a cursor is moved ([#283](https://github.com/angular-split/angular-split/issues/283)) ([00a6755](https://github.com/angular-split/angular-split/commit/00a675578915d6172ca0174d3761cf84bc5ca024))
* handle rtl in vertical direction correctly ([#335](https://github.com/angular-split/angular-split/issues/335)) ([97aa0e3](https://github.com/angular-split/angular-split/commit/97aa0e3863e9129f4e1da165be894b429c47039c))
* migrate cypress configuration ([d251ac0](https://github.com/angular-split/angular-split/commit/d251ac04b7566fe2132617b92af41ce8ef5459e9))
* remove deprecated forRoot and forChild ([#352](https://github.com/angular-split/angular-split/issues/352)) ([44e22b7](https://github.com/angular-split/angular-split/commit/44e22b7351a96a561c6552308c5263779378d3bc))
* role should be separator and not slider ([3c30521](https://github.com/angular-split/angular-split/commit/3c30521a7731fdf718810303c8fe8d734bb011a5))
* spurious network call due to empty background image [#316](https://github.com/angular-split/angular-split/issues/316) ([#322](https://github.com/angular-split/angular-split/issues/322)) ([cf0f2d0](https://github.com/angular-split/angular-split/commit/cf0f2d043f7d1fd9ece7148c0362dbdbb3b892e7))
* use correct peerDependencies versions ([4f897b6](https://github.com/angular-split/angular-split/commit/4f897b6fc26002f1a5146a5933909a6ee616089b))
