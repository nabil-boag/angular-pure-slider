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
/* global angular, TouchEvent, MouseEvent */

angular.module('angular-pure-slider', ['angular-pure-slider.value-converter'])
  /**
   * Slider Directive
   */
  .directive('wnSlider', ['$document', 'valueConverter',
    function ($document, valueConverter) {

      var template = '<div class="slider"><span class="slider-selected">' +
        '<span class="slider-pointer" tabindex="0"></span></span></div>';

      /**
       * Get the users mouse position.
       * If jQuery is included on the page before angular, the touch and
       * mouse events are wrapped within a jQuery object.
       * http://stackoverflow.com/questions/16674963/event-originalevent-jquery
       */
      function getEventXPosition(e) {
        // Native mouse event.
        if (e instanceof MouseEvent) {
          return e.pageX;
        }

        // Native touch event.
        if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent) {
          return e.touches.item(0).pageX;
        }

        // jQuery mouse event
        if (e.originalEvent instanceof MouseEvent) {
          return e.originalEvent.pageX;
        }

        // jQuery touch event.
        if (typeof TouchEvent !== 'undefined' &&
          e.originalEvent instanceof TouchEvent) {
          return e.originalEvent.touches[0].pageX;
        }

      }

      return {
        template: template,
        require: 'ngModel',
        restrict: 'EA',
        link: function ($scope, element, attributes) {

          // Declare elements
          var
            sliderElement = element.find('div'),
            selected = angular.element(element.find('span')[0]);

          /**
           * Updates the model value based on a mouse or touch click.
           *
           * @param TouchEvent/MouseEvent
           */
          var updateModelOnAction = function (e) {

            /**
             * Set to current position on slider, use the ValueService
             * to calculate the model percentage value, given a min/max.
             */
            var
              xMin = sliderElement[0].getBoundingClientRect().left,
              xMax = sliderElement[0].offsetWidth + xMin,
              xVal = getEventXPosition(e),
              percentage = valueConverter.valueToPercent(xMin, xMax, xVal);

            // set the model value
            $scope[attributes.ngModel] =
              valueConverter.percentToValue(
                $scope[attributes.min],
                $scope[attributes.max],
                percentage);

            $scope.$apply();
          };

          /**
           * Sets the slider css percentage width
           */
          var setSliderPercentage = function (percentage) {
            selected.css('width', percentage + '%');
          };

          /**
           * Forces a value to be within the sliders range
           */
          var getValueWithinRange = function (newVal) {
            if (newVal > $scope[attributes.max]) {
              newVal = $scope[attributes.max];
            }
            if (newVal < $scope[attributes.min]) {
              newVal = $scope[attributes.min];
            }
            return newVal;
          };

          /**
           *	Updates the slider presentation when the model value has changed
           */
          var updateSlider = function (newVal, oldValue) {
            newVal = parseFloat(newVal);

            if (isNaN(newVal)) {
              newVal = oldValue;
            }

            // Rounds up the model value to the nearest whole number
            $scope[attributes.ngModel] = getValueWithinRange(Math.ceil(newVal));

            setSliderPercentage(valueConverter.valueToPercent(
              $scope[attributes.min],
              $scope[attributes.max],
              newVal));
          };

          // Watch for value changes
          $scope.$watch(attributes.ngModel, updateSlider);

          /**
           * Update the min value only if it doesn't exceed the max
           */
          $scope.$watch(attributes.min, function (newValue, oldValue) {
            if (newValue > $scope[attributes.max]) {
              $scope[attributes.min] = oldValue;
            } else {
              updateSlider($scope[attributes.ngModel]);
            }
          });

          /**
           * Update the max value only if it doesn't drop below min
           */
          $scope.$watch(attributes.max, function (newValue, oldValue) {
            if (newValue < $scope[attributes.min]) {
              $scope[attributes.max] = oldValue;
            } else {
              updateSlider($scope[attributes.ngModel]);
            }
          });

          // Bind events for touch/mouse
          sliderElement.on('mousedown touchstart', function (e) {

            // Prevent ghostclick (mousedown/click firing after touchstart)
            e.preventDefault();

            // Move the pointer straight away
            updateModelOnAction(e);

            /*
             *	Bind to the document so that the drag+drop remains whilst
             * the user has clicked the handle, but not yet released it.
             */
            $document.on('mousemove touchmove', function (e) {
              // prevent other events firing whilst interacting with the slider
              e.preventDefault();
              updateModelOnAction(e);
            });

          });

          // Remove touch/mouse move events when we release the pointer
          $document.on('mouseup touchend', function () {
            $document.off('mousemove touchmove');
          });
        }
      };
    }]);