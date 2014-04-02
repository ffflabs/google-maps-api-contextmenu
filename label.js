define(['gmaps'], function() {
    // Define the overlay, derived from google.maps.OverlayView
    window.google.maps.Label = function(opt_options, cssStyle) {
        // Initialization
        this.setValues(opt_options);
        if (!cssStyle) cssStyle = 'ruler1';

        arrayStyles = {
            'default': 'position: relative; left: 20%; top: -8px; ' +
                'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
                'padding: 2px; background-color: #fff; ' +
                'opacity: .95; ' +
                'filter: alpha(opacity=75); ' +
                '-ms-filter: "alpha(opacity=75)"; ' +
                '-khtml-opacity: .75; ' +
                '-moz-opacity: .75;',

            'grid': 'position: relative; left: -30%; top: -65%; ' +
                'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
                'padding: 3px 4px; background-color: #fff; ' +
                'z-index: 2500; ' +
                'opacity: .95; ' +
                'filter: alpha(opacity=95); ' +
                '-ms-filter: "alpha(opacity=95)"; ' +
                '-khtml-opacity: .95; ' +
                '-moz-opacity: .95;',

            'ruler1': 'position: relative; left: 25%; top: -20%; ' +
                'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
                'padding: 2px; background-color: #fff; ' +
                'opacity: .95; ' +
                'filter: alpha(opacity=75); ' +
                '-ms-filter: "alpha(opacity=75)"; ' +
                '-khtml-opacity: .75; ' +
                'z-index: 2000; ' +
                '-moz-opacity: .75;',

            'ruler2': 'position: relative; left: 25%; top: 20%; ' +
                'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
                'padding: 2px; background-color: #fff; ' +
                'opacity: .95; ' +
                'filter: alpha(opacity=75); ' +
                '-ms-filter: "alpha(opacity=75)"; ' +
                '-khtml-opacity: .75; ' +
                'z-index: 2000; ' +
                '-moz-opacity: .75;',

            'elementlabel': 'position: relative; left: -50%; top: -8px; ' +
                'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
                'padding: 2px; background-color: rgba(255,255,255,0.9); ' +
                'opacity: .85; ' +
                'filter: alpha(opacity=75); ' +
                '-ms-filter: "alpha(opacity=75)"; ' +
                '-khtml-opacity: .75; ' +
                '-moz-opacity: .75;z-index:600;border-radius:4px',

            'tooltip': 'position: relative; left: -50%; top: -48px;display:block; ' +
                'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
                'padding: 2px; background-color: white; ' +
                ' border-radius: 5px; ' +
                'opacity: .75; ' +
                'filter: alpha(opacity=75); ' +
                '-ms-filter: "alpha(opacity=75)"; ' +
                '-khtml-opacity: .75; ' +
                'width: 400px; ' +
                'z-index: 2400; ' +
                '-moz-opacity: .75;',
        };
        // Label specific
        var span = this.span_ = document.createElement('span');
        span.style.cssText = arrayStyles[cssStyle];

        var div = this.div_ = document.createElement('div');
        div.appendChild(span);
        div.style.cssText = 'position: absolute; display: none';
    };
    window.google.maps.Label.prototype = new google.maps.OverlayView();

    // Implement onAdd
    window.google.maps.Label.prototype.onAdd = function() {
        var pane = this.getPanes().overlayLayer;
        pane.appendChild(this.div_);


        // Ensures the label is redrawn if the text or position is changed.
        var me = this;
        this.listeners_ = [
            google.maps.event.addListener(this, 'position_changed',
                function() {
                    me.draw();
                }),
            google.maps.event.addListener(this, 'text_changed',
                function() {
                    me.draw();
                }),
            google.maps.event.addListener(this, 'dblclick',
                function(mouseEvent) {
                    console.log('dblclick en label', mouseEvent);
                })
        ];

    };

    // Implement onRemove
    window.google.maps.Label.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        // Label is removed from the map, stop updating its position/text.
        for (var i = 0, I = this.listeners_.length; i < I; ++i) {
            google.maps.event.removeListener(this.listeners_[i]);
        }
    };

    // Implement draw
    window.google.maps.Label.prototype.draw = function() {
        var projection = this.getProjection();
        var position = projection.fromLatLngToDivPixel(this.get('position'));

        var div = this.div_;
        if (position) {
            div.style.left = position.x + 'px';
            div.style.top = position.y + 'px';
        }
        div.style.display = 'block';

        this.span_.innerHTML = this.get('text').toString();
    };

    return window.google.maps.Label;
});