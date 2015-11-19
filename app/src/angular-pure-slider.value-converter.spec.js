/* global describe, beforeEach, module, inject, it, expect */

/**
 * Tests for Value Converter Service
 */
describe('slider value converter service', function () {
  var valueConverter;

  beforeEach(module('angular-pure-slider.value-converter'));

  beforeEach(inject(function (_valueConverter_) {
    valueConverter = _valueConverter_;
  }));

  it('should convert a model value to a percentage based on the range',
    function () {
      // Act
      var percentage = valueConverter.valueToPercent(0, 100, 27);

      // Assert
      expect(percentage).toBe(27);
    });

  it('should convert a percentage to a model value', function () {
    // Act
    var value = valueConverter.percentToValue(20, 100, 50);

    // Assert
    expect(value).toBe(60);
  });
});