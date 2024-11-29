const package = require('./data/package');

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    Appium: {
      appiumV2: true,
      platform: 'iOS',
      device: package.device.ios_device_name,
      desiredCapabilities: {
        deviceName: package.device.ios_device_name,
        platformVersion: package.device.ios_version,
        automationName: 'XCUITest',
        udid: package.device.udid,
        browserName: 'Safari',
        restart: true,
        cleanSession: true,
        autoAcceptAlerts: true
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'Auto_Vendor_v1_2'
}