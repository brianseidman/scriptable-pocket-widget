# Pocket Widgets (Unofficial)

"Unread" and "Favorites" iOS widgets for [Pocket](https://getpocket.com).

<p align="center"><img src="https://github.com/brianseidman/scriptable-pocket-widget/blob/72495ad9cc488b9790bb2ee6eac8dcedcf36dd96/Resources/scriptable-pocket-widget-image.png" width=400 alt="Scriptable Pocket Widget Screenshot"></p>

Pocket is Mozilla's popular read-it-later service. Unfortunately, on iOS Pocket only offers a "Discover" widget showing you trending articles; there aren't widgets to show your own favorite (starred) or unread articles. These scripts, deployed through the Scriptable app, bring those missing widgets to your device.

Easy set-up:
* 🧑‍💻 Install the [Scriptable](https://scriptable.app) app by [Simon Støvring](https://github.com/simonbs). 
* 📁 Download the Pocket widget files to your Scriptable folder.
* 😀 Add your Pocket credentials and choose between "Unread" and "Favorites." That's it!

## Usage

You will need a consumer key and access token to query your user data with the Pocket API. To create those credentials:
* Follow the documentation on the [Pocket: Developer API](https://getpocket.com/developer/) site.
* Use one of the many third-party Pocket credential creation tools like [OneClickPocket](http://reader.fxneumann.de/plugins/oneclickpocket/auth.php) or [pocket-auth](https://github.com/mheap/pocket-auth).

## Preferences

The Pocket widget can be easily modified with these three lines of code in the pocket_widget.js file:

```
let attributes = {
	"consumerKey": "YOUR-CONSUMER-KEY",
	"accessToken": "YOUR-ACCESS-TOKEN",
	"favorite": 1  // Enter 0 for "Unread"; enter 1 for "Favorites"
} 
```
Replace YOUR-CONSUMER-KEY and YOUR-ACCESS-TOKEN with the respective consumer key and access token for your account. To show your two most recent Pocket favorites in the widget, leave the "favorite" value as 1; changing the "favorite" value to 0 will show your two most recent unread saved articles. No modification of the pocket_widget/pocket_widget_code.js file is necessary.
