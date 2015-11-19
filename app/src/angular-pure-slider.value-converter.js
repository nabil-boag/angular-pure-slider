/* global angular */

angular.module('angular-pure-slider.value-converter', [])
  /**
   * Service to convert a slider percentage to a model value and vice versa
   */
  .service('valueConverter', [function () {
    var valueConverter = {};

    /**
     * Converts a value to a percentage based on min/max
     *
     * @return Int
     *   The percentage based on the provided values.
     */
    valueConverter.valueToPercent = function (min, max, value) {
      var range = parseInt(max - min);
      return ((value - parseInt(min)) / range) * 100;
    };

    /**
     * Converts a percent to a value based on a min/max
     * @return Int
     */
    valueConverter.percentToValue = function (min, max, percent) {
      var range = parseInt(max - min);
      return Math.ceil(((range * percent) / 100) + parseInt(min));
    };

    return valueConverter;
  }]);