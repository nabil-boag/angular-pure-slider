Angular Pure Slider
====================

Angular slider component which provides a horizontal slider without third party
libraries.

Demo: [Demo Page Link](/app/src/index.html 'Demo Page')

Maintainers:
* [Douglas Eggleton](douglas.eggleton@wonga.com 'Douglas Eggleton')
* [Nabil Boag](nabil.boag@wonga.com 'Nabil Boag')
* [Chris Conolly](chris.conolly@wonga.com 'Chris Conolly')

Features
--------

* A horizontal slider bar
* Configurable with minimum and maximum values
* Returns the result as a percentage or a value based on the percentage
* Mobile compatible
* Pre-themed (css)
* Supports IE 8+

Installation
------------

NPM:

```sh
npm install
```

Bower:

```sh
bower install
```

Install the ChromeDriver:

```
./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
```

Usage
-----

Add the module 'angular-pure-slider' as a dependency to your application:

```
var app = angular.module('demo', ['angular-pure-slider']);
```

The directive can then be used as below, with the following configurations:

* min = The floor/min value of the slider.
* max = The maximum/ceiling of the slider.
* ng-model = The model to update when the slider has changed (and vice versa).

```
<wn-slider ng-model="slider" min="min" max="max"/>
```

Example to listen for a change in the slider value:
```
$scope.$watch('slider', function (newValue) {
  $scope.myMessage = 'The slider value is: ' + newValue;
});
```

Contributing
------------

We :heart: pull requests!

To contribute:

- Fork the repo
- Run `npm install`
- Run `bower install`
- Run `grunt workflow:dev` to watch for changes, lint, build and run tests as
  you're working
- Write your unit tests for your change
- Run the unit+service tests `grunt build test`
- Update README.md
