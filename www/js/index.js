/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

          
            

            function onSuccess(position) {

                var element = document.getElementById('geolocation');
                element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                        'Longitude: ' + position.coords.longitude + '<br />' +
                        'Altitude: ' + position.coords.altitude + '<br />' +
                        'Accuracy: ' + position.coords.accuracy + '<br />' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                        'Heading: ' + position.coords.heading + '<br />' +
                        'Speed: ' + position.coords.speed + '<br />' +
                        'Timestamp: ' + position.timestamp + '<br />';
            }
            function onError(error) {
                var element = document.getElementById('geolocation');
                element.innerHTML = 'WTF! ' + error.code + '<br />' +
                'message: ' + error.message + '<br />';
            }
             var element = document.getElementById('geolocation');
                element.innerHTML = 'Nothing happened <br />'
            function checkConnection() {
                var networkState = navigator.connection.type;
                var states = {};
                states[Connection.UNKNOWN]  = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI]     = 'WiFi connection';
                states[Connection.CELL_2G]  = 'Cell 2G connection';
                states[Connection.CELL_3G]  = 'Cell 3G connection';
                states[Connection.CELL_4G]  = 'Cell 4G connection';
                states[Connection.CELL]     = 'Cell generic connection';
                states[Connection.NONE]     = 'No network connection';
                var element = document.getElementById('connection');
                element.innerHTML = 'Connection: ' + states[networkState] + '<br />' ;
            }
            function onOnline() {
                checkConnection();
            }
            function onOffline() {
                var element = document.getElementById('connection');
                checkConnection(); 
            }

            tlantic.plugins.socket.connect(
              function (connectionId) {
                console.log('worked! This is the connection ID: ', connectionId);  
                var element = document.getElementById('socketsend');
                element.innerHTML = 'ConId: ' + connectionId + ' ' ;
              },

              function () {
                console.log('failed!');
                var element = document.getElementById('socketsend');
                element.innerHTML = 'Failed!' ;
              },
              '192.168.1.102',
              8081
            );

            document.addEventListener("online", onOnline, false);
            document.addEventListener("offline", onOffline, false);
           
            checkConnection();
            // navigator.geolocation.getCurrentPosition(onSuccess, onError,{enableHighAccuracy:true, maximumAge:0, timeout: 60000} );
            navigator.geolocation.watchPosition(onSuccess, onError,{enableHighAccuracy:true, maximumAge:0, timeout: 60000, frequency: 1000} );


            // hier KOT rein
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
