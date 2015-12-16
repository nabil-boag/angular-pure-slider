/* global module, require */

require('chai').should();

module.exports = function () {
  var SliderPage = require('./../page_objects/sliderPage');

  var sp = new SliderPage().get();

  this.Given(/^a slider that is set to (\d+)$/, function (initialValue, done) {
    sp.setSliderValue(initialValue).then(function () {
      sp.unfocus().then(function () {
        done();
      });
    });
  });

  this.Given(/^a slider width of (\d+)px$/, function (sliderWidth, done) {
    sp.fixSliderWidth(sliderWidth).then(function () {
      done();
    });
  });

  this.Given(/^a range of (\d+) to (\d+)$/, function (min, max, done) {
    sp.setSliderRange(min, max).then(function () {
      done();
    });
  });

  this.Given(/^a page with jQuery$/, function (done) {
    sp.getPageWithJquery().then(function () {
      done();
    });
  });

  this.When(/^I drag the slider to (\d+)px$/, function (xPixelPosition, done) {
    sp.dragSlider(xPixelPosition)
      .then(function () {
        done();
      });
  });

  this.When(/^the input is changed to (\d+)$/, function (value, done) {
    sp.setSliderValue(value).then(function () {
      sp.unfocus().then(function () {
        done();
      });
    });
  });

  this.When(/^the input is changed to "([^"]*)"$/, function (value, done) {
    sp.setSliderValue(value).then(function () {
      sp.unfocus().then(function () {
        done();
      });
    });
  });

  this.When(/^I click the slider at (\d+)px$/, function (xPixelPosition, done) {
    sp.clickSlider(xPixelPosition).then(function () {
      done();
    });
  });

  this.Then(/^the input should be set to (\d+)$/, function (value, done) {
    sp.getSliderValue().then(function (modelValue) {
      value.should.equal(modelValue);
      done();
    });
  });

  this.Then(/^the handle should be at "([^"]*)"$/, function (percentage, done) {
    sp.getSelectedStyle().then(function (selectedWidth) {

      selectedWidth = ((selectedWidth
        .split('width:')[1])
        .split(';')[0]);

      // String comparison to include the percentage symbol
      selectedWidth.trim().should.equal(percentage);

      done();
    });
  });

  this.Then(/^the slider should be at (\d+)$/,
    function (sliderPercentage, done) {
      sp.getSliderValue().then(function (value) {
        value.should.equal(sliderPercentage);
        done();
      });
    });
};