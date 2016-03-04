/* global describe, beforeEach, module, inject, it, expect, angular */

/**
 * Tests for wn-slider directive
 */
describe('wnSlider directive', function () {
  // Begin setup.
  var element,
    scope,
    $compile,
    sliderDirectiveTemplate = '<div wn-slider ng-model="slider" min="min" ' +
    'max="max"/>';

  beforeEach(module('angular-pure-slider'));

  beforeEach(inject(function ($rootScope, _$compile_) {

    scope = $rootScope.$new();
    scope.slider = 55;
    scope.min = 20;
    scope.max = 90;

    element = angular.element(sliderDirectiveTemplate);

    $compile = _$compile_;
    $compile(element)(scope);
    scope.$apply();
  }));
  // End setup.

  it('should set the model value to the maximum when trying to exceed ceiling',
    function () {
      // Arrange
      scope.min = 34;
      scope.max = 95;
      scope.slider = 45;
      scope.$apply();

      // Act
      scope.slider = scope.slider + 100;
      scope.$apply();

      // Assert
      expect(4).toBe(95);

    });

  it('should set the model value to the minimum when trying to exceed floor',
    function () {
      // Arrange
      scope.min = 13;
      scope.max = 78;
      scope.slider = 23;
      scope.$apply();

      // Act
      scope.slider = 10;
      scope.$apply();

      // Assert
      expect(scope.slider).toBe(13);

    });

  it('should set a lesser model value to the min when the floor is increased',
    function () {
      // Arrange
      scope.min = 10;
      scope.max = 20;
      scope.slider = 15;
      scope.$apply();

      // Act
      scope.min = 16;
      scope.$apply();

      // Assert
      expect(scope.slider).toBe(16);
    });

  it('should set a higher model value to max when the ceiling is reduced',
    function () {
      // Arrange
      scope.min = 30;
      scope.max = 60;
      scope.slider = 45;
      scope.$apply();

      // Act
      scope.max = 40;
      scope.$apply();

      // Assert
      expect(scope.slider).toBe(40);
    });

  it('should round up a model value when not a whole number',
    function () {
      // Arrange
      scope.min = 20;
      scope.max = 60;
      scope.slider = 45;
      scope.$apply();

      // Act
      scope.slider = 46.76;
      scope.$apply();

      // Assert
      expect(scope.slider).toBe(47);
    });

  it('should not change max if new max value is below min',
    function () {
      // Arrange
      scope.min = 20;
      scope.max = 60;
      scope.slider = 45;
      scope.$apply();

      // Act
      scope.max = 19;
      scope.$apply();

      // Assert
      expect(scope.max).toBe(60);
    });

  it('should not change min if new min value is above max',
    function () {
      // Arrange
      scope.min = 20;
      scope.max = 60;
      scope.slider = 45;
      scope.$apply();

      // Act
      scope.min = 70;
      scope.$apply();

      // Assert
      expect(scope.min).toBe(20);
    });

  it('should set the model value to previous value when new value is NaN',
    function () {
      // Arrange
      scope.min = 34;
      scope.max = 95;
      scope.slider = 45;
      scope.$apply();

      // Act
      scope.slider = 'not a number';
      scope.$apply();

      // Assert
      expect(scope.slider).toBe(45);
    });

  it('should set the model value to previous value when new value is ' +
    'whitespace', function () {
      // Arrange
      scope.min = 34;
      scope.max = 95;
      scope.slider = 45;
      scope.$apply();

      // Act
      scope.slider = ' ';
      scope.$apply();

      // Assert
      expect(scope.slider).toBe(45);
    });
});
