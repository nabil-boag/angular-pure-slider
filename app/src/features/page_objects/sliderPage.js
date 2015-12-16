/* global module, by, element, browser */

module.exports = function () {

  var page = {};

  page.getSliderLocation = function () {
    return element(by.css('.slider'))
      .getWebElement()
      .getLocation();
  };

  /**
   * Used to unfocus from an element
   */
  page.unfocus = function () {
    return browser
      .actions()
      // click any element that is not on the slider to unfocus
      .mouseMove(element(by.css('h1')))
      .click()
      .perform();
  };

  page.getSliderElementWidth = function () {
    return element(by.css('.slider'))
      .getCssValue('width');
  };

  page.getSelectedWidth = function () {
    return element(by.css('.slider-selected'))
      .getCssValue('width');
  };

  page.get = function () {
    browser.get('');
    return this;
  };

  page.getPageWithJquery = function () {
    return browser.get('with-jquery.html');
  };

  /**
   * Returns the percentage value of a slider
   */
  page.getSliderWidth = function () {
    return element(by.css('.slider')).getCssValue('width');
  };

  page.getSelectedStyle = function () {
    return element(by.css('.slider-selected')).getAttribute('style');
  };

  /**
   * Sets the slider ng-model value
   */
  page.setSliderValue = function (value) {
    return element(by.model('sliderInputValue')).clear().sendKeys(value);
  };

  /**
   * Gets the slider ng-model value
   */
  page.getSliderValue = function () {
    return element(by.model('sliderInputValue')).getAttribute('value');
  };

  page.setSliderRange = function (min, max) {
    element(by.model('minValue')).clear().sendKeys(min);
    return element(by.model('maxValue')).clear().sendKeys(max);
  };

  page.fixSliderWidth = function (width) {
    return browser
      .driver
      .executeScript(
        'document.querySelector(".slider").style.width="' + width + 'px";'
        );
  };

  page.clickSlider = function (mousePos) {
    return browser
      .actions()
      .mouseMove(element(by.css('.slider')),
        {x: parseInt(mousePos)})
      // .click() - Does not work with Firefox v11 Windows & Selenium v2.41
      .mouseDown().mouseUp()
      .perform();
  };

  /**
   * Drags the slider to specific pixel position on the slider, this
   * is relative from the beginning of the slider.
   */
  page.dragSlider = function (xPixelPosition) {
    return page.getSelectedWidth().then(function (width) {
      // get the offset from the current pointer
      var xOffSet = parseInt(xPixelPosition) - parseInt(width.slice(0, -2));

      return browser
        .actions()
        .mouseMove(element(by.css('.slider-pointer')))
        .mouseDown()
        .mouseMove({
          x: xOffSet
        })
        .mouseUp()
        .perform();
    });
  };

  return page;

};