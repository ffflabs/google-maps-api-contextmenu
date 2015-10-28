google-maps-api-contextmenu
===========================

This is a fork of [Martin Pearman's ContextMenu](http://code.martinpearman.co.uk/googlemapsapi/contextmenu/)

A contextMenu for google.maps.api v3

usage:

```js
var menuStyle = {
		menu: 'context_menu',
		menuSeparator: 'context_menu_separator',
		menuItem: 'context_menu_item'
	};

	var contextMenuOptions  = {
		id: "map_rightclick",
		eventName: "menu_item_selected",
		classNames: menuStyle,
		menuitems: 
		[
		   {label:'option1', id:'menu_option1'},
		   {label:'option2', id:'menu_option2'},
		]
	};

var contextMenu = new google.maps.ContextMenu(map, contextMenuOptions, function() {
      console.log('optional callback');
});
google.maps.event.addListener(map, 'rightclick', function(mouseEvent) {
  contextMenu.show(mouseEvent.latLng);
});


```
