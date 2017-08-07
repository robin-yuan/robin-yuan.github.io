/*jslint browser: true*/
/*global $, ScratchExtensions, setTimeout */
"use strict";
(function (ext) {
    // Default step duration: 0.5s
    var STEP_DURATION = 0,
        API_BASE_URL1 = "http://127.0.0.1:8900/set_leds?/degrees=",
        API_BASE_URL2 = "http://127.0.0.1:8900/?set_yaw?/degrees=",
        API_BASE_URL3 = "http://127.0.0.1:8900/?set_depth?/degrees=",

        // Asynchronous HTTP Get Request
        httpGetAsync = function (theUrl, callback) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    callback(xmlHttp.responseText);
                }
            };
            xmlHttp.open("GET", theUrl, true); // true for asynchronous
            xmlHttp.send(null);
        },

        sendMove1 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL1 + duration);
            setTimeout(duration*1000);
           /* if (duration && duration > 0) {
                setTimeout(function () {
                    httpGetAsync(API_BASE_URL1 + "stop");
                    callback();
                }, duration * 1000);
            }*/
        },
        sendMove2 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL2 + duration);
            setTimeout(duration*1000);
           /* if (duration && duration > 0) {
                setTimeout(function () {
                    httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, duration * 1000);
            }*/
        },
        sendMove3 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL3 + duration);
            setTimeout(duration*1000);
           /* if (duration && duration > 0) {
                setTimeout(function () {
                    httpGetAsync(API_BASE_URL3 + "stop");
                    callback();
                }, duration * 1000);
            }*/
        },

        // Block and block menu descriptions
        descriptor = {
            blocks: [
                ['w', 'turn on/off the light %n ', 'set_leds', STEP_DURATION],
                ['w', 'turn to %n degrees', 'set_yaw', STEP_DURATION],
                ['w', 'move down to %n centimeters', 'set_depth', STEP_DURATION],
               // ['w', 'turn right for %n seconds', 'turn_right', STEP_DURATION]
            ]
        };

    ext.set_leds = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove1("set_leds", duration, callback);
    };

    ext.set_yaw = function (duration, callback) {
        // Robot API quirk: "backward" is actually "forward" at the moment
        sendMove2("set_yaw", duration, callback);
    };

    ext.set_depth = function (duration, callback) {
        sendMove3("set_depth", duration, callback);
    };

   /* ext.turn_left = function (duration, callback) {
        sendMove("turn_left", duration, callback);
    };   

    // Cleanup function when the extension is unloaded
    ext._shutdown = function () {
        sendMove("stop");
    };*/

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function () {
        return {status: 2, msg: 'Ready'};
    };

    // Register the extension
    ScratchExtensions.register('Robotics extension', descriptor, ext);
})({});
