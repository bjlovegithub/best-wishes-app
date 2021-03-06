## Introduction

This is an iOS app for Best Wishes Project. Best Wishes App provides a Platform
to publish wishes and support people's wish.

## Features

* Look and Support other people's wish
* Modify your own wish
* Publish your own wish
* Signin with Google/Wechat/Facebook

## Development Notes

### create-react-native-app` vs `react-native init

`create-react-native-app` is quite easy to setup an environment to play with
React Native Apps. `react-native init` is going to create the whole file set,
including xcode project files for iOS.
To have xcode project files for apps created by `create-react-native-app`,
`react-native eject` to get those files.

### Google SignIn

Following [this](https://www.codementor.io/microsem31/react-native-google-and-facebook-authentication-cohpznykf) to enable Google Sign In. Currently I am using [react-native-google-signin](https://github.com/react-native-community/react-native-google-signin). Basically, by following the steps mentioned in the [README.md](https://github.com/react-native-community/react-native-google-signin/blob/master/README.md), you could set up the flow to support Google Signin.

**Note**:

* If you create app from `create-react-native-app`, you have to `eject` it first to get files for Xcode.
* Update Xcode to the latest version.
* After using `pod` install dependent libraries for Google Signin. Open the project by Xcode through opening `Wishes.xcworkspace`, not `Wishes.xcodeproj`.
* Get the Google Signin Token for iOS and set up the `URL Type` for the project. Files for the Google Auth from Firebase are not included in the code base. So to make it work, the following steps should be done:
  * Run `react-native link react-native-google-signin`
  * Install the Google Signin SDK with [CocoaPods](https://cocoapods.org/) (add `pod 'GoogleSignIn'` in your Podfile and run `pod install`)
  * In Firebase, create a project. Go to project overview page, add an iOS app. Then enable the auth function for this app. Remeber to download the `GoogleService-Info.plist` after adding the iOS app.
  * Configure URL types in the Info panel
    - add a URL with scheme set to your `REVERSED_CLIENT_ID` (found inside the plist)
    - add a URL with scheme set to your `bundle id`
  * Add `openURL` function in `AppDelegate.m`
  * Refer to [this link](https://github.com/react-native-community/react-native-google-signin/blob/master/ios-guide.md) for detailed steps.

## TODO

* Support feedback

* Support wechat/facebook login