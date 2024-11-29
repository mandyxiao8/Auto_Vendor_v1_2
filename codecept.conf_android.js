const package = require('./data/package');

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    Appium: {
      appiumV2: true,
      platform: 'android',
      device: package.device.android_device_name,
      waitForTimeout: 20000,
      timeouts: {
        "script": 60000,
        "page load": 30000
      },
      desiredCapabilities: {
        deviceName: package.device.android_device_name,
        platformVersion: package.device.android_version,
        automationName: 'uiautomator2',
        browserName: 'Chrome',
        chromedriver: {
          autodownload: true,
          chromedriverExecutable: './node_modules/.bin/chromedriver',
        },
        restart: true,
        cleanSession: true,
        autoGrantPermissions: true,
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'Auto_Vendor_v1_2'
}