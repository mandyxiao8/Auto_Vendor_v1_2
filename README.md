# Auto_Vendor_v1_2

## Install
```
# install package
npm install

#根目錄加入 .env 並且調整內容
cp .env.example .env

# 使用Appium2
npm install -g appium
appium driver install xcuitest@7.18.0
appium driver install uiautomator2@3.6.1
npm install codeceptjs webdriverio@8.6.3 --save
```

## Appium server run
```
appium --base-path=/wd/hub
```

## Running the test
```
# iOS
npm run app:i

# Android
npm run app:a
```