
<a name="0.1.19"></a>
# 0.1.19 (2017-02-09)

### Bug fix

* **gutter height on Safari:** fix a weird bug about anormal gutter height when direction is 'vertical' on Safari only [issue5](https://github.com/bertrandg/angular-split/issues/5).


<a name="0.1.18"></a>
# 0.1.18 (2017-02-04)

### Bug fix

* **visibility toggle:** fix a bug I introduced in 0.1.17 while merging [pr10](https://github.com/bertrandg/angular-split/pull/10).


<a name="0.1.17"></a>
# 0.1.17 (2017-02-03)

### Feature

* **visibility toggle:** add possibility to show/hide areas using `<split-area [visible]="boolean">` without removing them from the DOM, useful for specific case [like with router](https://github.com/jitsmaster/angular-split/commit/c7c92b9a1d1c00623660aeb7bc048509255e763b). Thanks to [jitsmaster](https://github.com/jitsmaster) ([pr8](https://github.com/bertrandg/angular-split/pull/8) / [pr10](https://github.com/bertrandg/angular-split/pull/10))