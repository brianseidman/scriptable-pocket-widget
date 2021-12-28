// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: chevron-circle-down;

let attributes = {
	"consumerKey": "YOUR-CONSUMER-KEY",
	"accessToken": "YOUR-ACCESS-TOKEN",
	"favorite": 1  // Enter 0 for "Unread"; enter 1 for "Favorites"
} 

let pocket_widget = importModule("/pocket_widget/pocket_widget_code.js"),	
	w = new ListWidget();
	w.url = 'pocket://'

pocket_widget.titleLine(w, attributes.favorite)

await pocket_widget.articleEntries(w, 
	await pocket_widget.data(attributes))

w.presentMedium()
Script.setWidget(w)
