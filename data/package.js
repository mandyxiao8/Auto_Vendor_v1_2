require('dotenv').config();

const device = {
  udid: process.env.IOS_UDID,
  ios_device_name: process.env.IOS_DEVICE_NAME,
  ios_version: process.env.IOS_VERSION,
  android_device_name: process.env.ANDROID_DEVICE_NAME,
  android_version: process.env.ANDROID_VERSION,
}

module.exports = {
  device
}