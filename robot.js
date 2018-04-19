/*jslint browser: true*/
/*global $, ScratchExtensions, setTimeout */
"use strict";
(function (ext) {
    // Default step duration: 0.5s
    var sensors_depth = 0;
    var sensors_yaw = 0 ;
    var sensors_pitch = 0;
    var sensors_battery = 0;
    var sensors_temp = 0;
    var sensors_humidity = 0;
    var ws ;
    var STEP_DURATION = 0,
        API_BASE_URL1 =  "http://127.0.0.1:8900/set_leds?degrees=",
        API_BASE_URL2 =  "http://127.0.0.1:8900/set_forward?degrees=",
        API_BASE_URL3 =  "http://127.0.0.1:8900/set_backward?degrees=",
        API_BASE_URL4 =  "http://127.0.0.1:8900/set_depth?degrees=",
        API_BASE_URL5 =  "http://127.0.0.1:8900/set_up?degrees=",
        API_BASE_URL6 =  "http://127.0.0.1:8900/set_down?degrees=",
        API_BASE_URL7 =  "http://127.0.0.1:8900/set_north?degrees=",
        API_BASE_URL8 =  "http://127.0.0.1:8900/set_right?degrees=",
        API_BASE_URL9 =  "http://127.0.0.1:8900/set_left?degrees=",
        API_BASE_URL10 = "http://127.0.0.1:8900/set_drive_loop?degrees=",
       // API_BASE_URL10 = "http://127.0.0.1:8900/set_stop?degrees=",

        // Asynchronous HTTP Get Request
        httpGetAsync = function (theUrl, callback) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                   //return xmlHttp.responseText;
                      callback(xmlHttp.responseText); 
                 //  sensors_depth = xmlHttp.responseText ;
                   // return sensors_depth;
                }
            };
            xmlHttp.open("GET", theUrl, true); // true for asynchronous
            xmlHttp.send(null);
        },
    
    
    
        sendMove1 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL1 + duration);
        
           if (1) {
                setTimeout(function () {
                   // httpGetAsync(API_BASE_URL1 + "stop");
                    callback();
                }, 1000);
            }
        },
        sendMove2 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL2 + duration);
            
            if (1) {
                setTimeout(function () {
                    //httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, duration * 1000+500);
            }
        },
        sendMove3 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL3 + duration);
           
           if (1) {
                setTimeout(function () {
                   // httpGetAsync(API_BASE_URL3 + "stop");
                    callback();
                }, duration * 1000+500);
            }
        },
        sendMove4 = function (command, duration, callback) {
           httpGetAsync(API_BASE_URL4 + duration);
            
            if (1) {
                setTimeout(function () {
                    //httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, duration * 150+1000);
            }
        },
        sendMove5 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL5 + duration);
            
            if (1) {
                setTimeout(function () {
                    //httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, duration * 100+100);
            }
        },
        sendMove6 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL6 + duration);
            
            if (1) {
                setTimeout(function () {
                    //httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, duration * 100+100);
            }
        },
        sendMove7 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL7 + duration);
            
            if (1) {
                setTimeout(function () {
                    //httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, duration * 20+3000);
            }
        },
        sendMove8 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL8 + duration);
            
            if (1) {
                setTimeout(function () {
                    //httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, 1000);
            }
        },
        sendMove9 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL9 + duration);
            
            if (1) {
                setTimeout(function () {
                    //httpGetAsync(API_BASE_URL2 + "stop");
                    callback();
                }, 1000);
            }
        },
        sendMove10 = function (command, duration, callback) {
            httpGetAsync(API_BASE_URL10 + duration);
        
           if (1) {
                setTimeout(function () {
                   // httpGetAsync(API_BASE_URL1 + "stop");
                    callback();
                }, 1000);
            }
        },
        

        // Block and block menu descriptions
        descriptor = {
            blocks: [
                ['w', '获取水下机器人数据', 'connect'],
                ['w', '开关灯 %n ', 'set_leds', STEP_DURATION],
                ['w', '前进 %n 秒', 'set_forward', STEP_DURATION],
                ['w', '后退 %n 秒', 'set_backward', STEP_DURATION],
                ['w', '设定机器深度水下 %n 厘米', 'set_depth', STEP_DURATION], 
                ['w', '上升 %n 厘米', 'set_up', STEP_DURATION],
                ['w', '下沉 %n 厘米', 'set_down', STEP_DURATION],
                ['w', '设定机器方向 %n ', 'set_north', STEP_DURATION],
                ['w', '右转 %n 度', 'set_right', STEP_DURATION],
                ['w', '左转 %n 度', 'set_left', STEP_DURATION],
                ['w', '电机解锁/加锁 %n', 'set_drive_loop', STEP_DURATION],
                ['r', '当前机器深度(厘米)', 'sensor_depth'],
                ['r', '当前机器方向角', 'sensor_yaw'],
                ['r', '当前机器俯仰角', 'sensor_pitch'],
                ['r', '当前机器电池电量（%）', 'sensor_battery'],
                ['r', '水温', 'sensor_temp'],
                ['r', '机器密封舱湿度', 'sensor_humidity']
               // 
               // ['w', 'turn right for %n seconds', 'turn_right', STEP_DURATION]
            ]
        };

    ext.set_leds = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove1("set_leds", duration, callback);
    };

    ext.set_forward = function (duration, callback) {
        // Robot API quirk: "backward" is actually "forward" at the moment
        sendMove2("set_forward", duration, callback);
    };

    ext.set_backward = function (duration, callback) {
        sendMove3("set_backward", duration, callback);
    };
     ext.set_depth = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
       sendMove4("set_depth", duration, callback);
    };
     ext.set_up = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove5("set_up", duration, callback);
    };
     ext.set_down = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove6("set_down", duration, callback);
    };
     ext.set_north = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove7("set_north", duration, callback);
    };
     ext.set_right = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove8("set_right", duration, callback);
    };
     ext.set_left = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove9("set_left", duration, callback);
    };
    ext.set_drive_loop = function (duration, callback) {
        // Robot API quirk: "forward" is actually "backward" at the moment
        sendMove10("set_drive_loop", duration, callback);
    };
     ext.connect = function() {  
      // addHeader(‘Access-Control-Allow-Origin:*’);//允许所有来源访问 
　　  // addHeader(‘Access-Control-Allow-Method:POST,GET’);//允许访问的方式
       var APICON  =  "http://127.0.0.1:8900" 
       var xmlHttp1 = new XMLHttpRequest(APICON);
           xmlHttp1.open("GET", APICON, true); // true for asynchronous
           xmlHttp1.send(null);
           xmlHttp1.onreadystatechange = function () {
                if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                    // sensors_depth = xmlHttp1.responseText ;
                var data = eval('('+xmlHttp1.responseText+')')  ;
                     sensors_depth = data.rov.depth ;
                     sensors_yaw = data.rov.yaw;
                     sensors_pitch = data.rov.pitch;
                     sensors_battery = data.rov.battery;
                     sensors_temp = data.rov.temp;
                     sensors_humidity = data.rov.humidity;
                };
           };  
    };
    
    
  
      ext.sensor_depth = function() {
          return sensors_depth;
    };
      ext.sensor_yaw = function() {
          return sensors_yaw;
    };
     ext.sensor_pitch = function() {
          return sensors_pitch;
    };
     ext.sensor_battery = function() {
          return sensors_battery;
    };
     ext.sensor_temp = function() {
          return sensors_temp;
    };
     ext.sensor_humidity = function() {
          return sensors_humidity;
    };
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function () {
        return {status: 2, msg: 'Ready'};
    };

    // Register the extension
    ScratchExtensions.register('Scratch2Discovery', descriptor, ext);
})({});
