# React Native Prototype

Evaluation Prototype for IMSmobile/app.  
Progress is tracked in [IMSmobile/app/issue/5](https://github.com/IMSmobile/app/issues/5)

## Setup
Basic Setup according to [Install React Native](https://facebook.github.io/react-native/releases/next/docs/getting-started.html).  
As IDE I'll try out [Visual Studio Code](https://code.visualstudio.com/) with the [React Native Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native) and [Flow Language Support](https://marketplace.visualstudio.com/items?itemname=flowtype.flow-for-vscode) extension.

## Inspiration
Fundamentals: http://www.reactnativeexpress.com/  
Login Navigation:  https://scotch.io/tutorials/react-native-app-with-authentication-and-user-management-in-15-minutes  
Login Screen Design: https://www.youtube.com/watch?v=1xu1eeRCPEk  
Style: https://github.com/facebook/react-native/blob/master/CONTRIBUTING.md#style-guide
Flow: https://medium.com/react-native-training/getting-started-with-react-native-and-flow-d40f55746809

## Playground
https://sketch.expo.io/

## Package Catalog
https://js.coach/react-native

## Ecosystem evaluation

### Name global players using it (req 53)  
Based on the [Showcase](https://facebook.github.io/react-native/showcase.html) the big ones are Facebook with Instagram and Airbnb. But parts of their apps are contain React Native, most ist still written in the native language.
Lots of smaller devs are using it for very fast development speed and ease of development. Generally there currently seems to be huge momentum in the React ecosystems, see for example [React VR](https://facebookincubator.github.io/react-vr/).

### Challenge documentation: Report on how useful it was when developing prototype app, ist there a upgrade guide, do example work (try three)
The official docs could be better: a few pages are very minimalistic and some examples use additional things which are not relevant for the example.

The style of code can be wildly different, some prefer classes and more imperative code, while others use functions everywhere. This is more of a general JavaScript issue.

### Challenge community: how useful were the search results (req 52)
Lots of community learning content. Some error messages where too generic to be useful. One has to learn to distinguish between JavaScript, React and React Native and Tooling-Errors to find a possible solution.

### Calculate expected financial cost for project (req 50)
React Native is licensed under BSD with some [special protection for Facebook](
https://arielelkin.github.io/articles/why-im-not-a-react-native-developer.html#patently-daunting). A lot of services in the ecosystem are vying for marketshare and are or may be using a freemium model. This may lead to recurring financial costs, depending on the amount of services one wants to depend on.

Some Examples
- [Expo](https://expo.io/)
- [Appetize.io](https://appetize.io/)

### Apps can also run in a Browser (req 3)
Yes, with third-party projects like [react-native-web](https://github.com/necolas/react-native-web), which also lists [similar projects](https://github.com/necolas/react-native-web#related-projects). Although it may make more sense to develop a webpage in React and not in React Native.

### Has been shown to work with CI and CD (req 9, 10)
#### CI
The React Native Project itself runs extensive tests on [Travis](https://travis-ci.org/facebook/react-native/) and [Circle](https://circleci.com/gh/facebook/react-native) on every PR.

A random [example PR](https://github.com/facebook/react-native/pull/12948) leads to these two CI builds
- https://travis-ci.org/facebook/react-native/builds/211286556
- https://circleci.com/gh/facebook/react-native/16607

#### CD
Can be done with [CodePush](https://microsoft.github.io/code-push/docs/react-native.html) or similar services.

## Additional Requirements

### Https Communication (req 14)
Yes, implemented with prototype.

### Dynamic Fields (req 21)
Yes, implemented with prototype.

### Pin Code Protection (req 22)
**No**, but could probably be implemented in native code ([Android Docs](https://developer.android.com/work/device-management-policy.html)).

### Loading Icon (req 23)
Yes, implemented with prototype on login screen.

### Error Handling (req 24)
Yes, implemented with prototype on login screen.

### Lazy Loading of List (Performance) (req 25)
Yes, with [ListView](https://facebook.github.io/react-native/docs/listview.html), not implemented/tested.

### Async Uploading (App Switch) (req 26)
Yes, with packages like [react-native-background-upload](https://github.com/Vydia/react-native-background-upload), not implemented/tested.

### Network Connection Close (req 27)
Yes, with normal JavaScript methods (Promises).
