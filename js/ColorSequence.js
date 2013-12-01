
var ColorSequence = function(options) {

    // ------------------------------------------------------------------------- //
    // Helpers
    // ------------------------------------------------------------------------- //

    // $.extend
    function extend() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    // https://raw.github.com/sterlingwes/RandomColor/master/rcolor.js
    function hsvToRgb( h, s, v ) {
        var h_i = Math.floor(h*6),
            f   = h*6 - h_i,
            p   = v * (1-s),
            q   = v * (1-f*s),
            t   = v * (1-(1-f)*s),
            r   = 255,
            g   = 255,
            b   = 255;
        switch(h_i) {
            case 0: r = v, g = t, b = p;    break;
            case 1: r = q, g = v, b = p;    break;
            case 2: r = p, g = v, b = t;    break;
            case 3: r = p, g = q, b = v;    break;
            case 4: r = t, g = p, b = v;    break;
            case 5: r = v, g = p, b = q;    break;
        }
        return [ Math.floor(r*256), Math.floor(g*256), Math.floor(b*256) ];
    }

    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function hexToRgb(hex) {

        // handle empty
        if (!hex) {
            return null;
        }

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var hexi = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexi);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // ------------------------------------------------------------------------- //
    // Modes
    // ------------------------------------------------------------------------- //

    function goldenRatio() {

        // var hue = Math.random();
        var goldenRatio = 0.618033988749895;

        console.log(this);

        function padHex(str) {
            if( str.length > 2 ) {
                return str;
            }
            return new Array(2 - str.length + 1).join('0') + str;
        };

        function get( saturation, value) {
            this.hue += goldenRatio;
            this.hue %= 1;
            if( typeof saturation !== 'number' ) {
                saturation = 0.5;
            }
            if( typeof value !== 'number' ) {
                value = 0.95;
            }
            var rgb = hsvToRgb( this.hue, saturation, value );
            return rgb;
        };

        var color = get();

        return color;

    }

    function randomOffset() {
        /*

        float value = (color.r + color.g + color.b)/3;
        float newValue = value + 2*Random() * offset – offset;
        float valueRatio = newValue / value;
        Color newColor;
        newColor.r = color.r * valueRatio;
        newColor.g = color.g * valueRatio;
        newColor.b = color.b * valueRatio;

         */
    }

    // ------------------------------------------------------------------------- //
    // Defaults
    // ------------------------------------------------------------------------- //

    var defaultOptions = {
        // mode of color generation
        mode : 'golden',
        // seed the color sequence
        startingColor : null,
        // set the sequence length
        length : null
    };

    // ------------------------------------------------------------------------- //
    // Constructor
    // ------------------------------------------------------------------------- //

    function ColorSequence(options) {

        // merge options with defaults
        this.opts = extend( defaultOptions, options );

        // set internals
        this.length = this.opts.length;
        // starting color used in some sequences
        this.startingColor = hexToRgb( this.opts.startingColor );
        // color mode
        this.mode = this.opts.mode;
        // position of the current color in a fixed length sequence
        this.position = 0;

        this.hue = Math.random();
    }

    // ------------------------------------------------------------------------- //
    // methods
    // ------------------------------------------------------------------------- //

    function nextColor() {
        // get next color

        // if sequence length, advance to next color

        // else generate a new color in the scheme
        var color = goldenRatio();

        return color;
    }


    // ------------------------------------------------------------------------- //
    // Prototype
    // ------------------------------------------------------------------------- //

    ColorSequence.prototype = {

        next : nextColor

    }

    // ------------------------------------------------------------------------- //
    // Return
    // ------------------------------------------------------------------------- //

    return new ColorSequence(options);

};

