(function (angular, mapboxgl, undefined) {
  'use strict';

  angular.module('app', ['mapboxgl-directive'])

  .run([function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }])

  .directive('testDirective', [function () {
    var directive = {
      restrict: 'EA',
      scope: true,
      template: '<div>Hola</div>',
      link: function ($scope, $element, $attrs) {
        console.log($scope, $element, $attrs);
      }
    };

    return directive;
  }])

  .controller('IndexController', ['$scope', '$window', '$timeout', 'mapboxglMapsData', '$compile', function ($scope, $window, $timeout, mapboxglMapsData, $compile) {
    $scope.glHeight = $window.innerHeight;
    $scope.glWidth = {
      value: $window.innerWidth
    };

    $window.onresize = function (event) {
      $scope.$apply(function () {
        $scope.glHeight = event.target.innerHeight;
        $scope.glWidth = {
          value: $window.innerWidth
        };
      });
    };

    $scope.onClick = function () {
      $scope.glWidth = {
        value: $window.innerWidth,
        animation: {
          enabled: true,
          transitionTime: 500
        }
      };
    };



    $scope.persistentGeojson = true;
    $scope.persistentImage = true;

    $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';
    $scope.glStyle2 = 'mapbox://styles/mapbox/dark-v9'

    $scope.deleteButtonClick = function (event) {
      console.log(event);
    };

    var htmlButton = '<button class="btn btn-primary" ng-click="deleteButtonClick($event);">aasgioagg</button>';
    var compiledHtml = $compile(htmlButton)($scope);

    $scope.$on('mapboxglMap:load', function (event, mapboxglMapEvent) {
      console.log(event, mapboxglMapEvent);

      mapboxglMapEvent.target.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': {
            'type': 'identity',
            'property': 'height'
          },
          'fill-extrusion-base': {
            'type': 'identity',
            'property': 'min_height'
          },
          'fill-extrusion-opacity': .6
        }
      });
    });

    $scope.$on('mapboxglMap:styleChanged', function (event, mapboxglMapEvent) {
      console.log(event, mapboxglMapEvent);
    });

    $scope.$on('mapboxglDirections:route', function (event, mapboxglDirectionsEvent) {
      console.log(event, mapboxglDirectionsEvent);
    });

    $scope.$on('mapboxglGeolocate:geolocate', function (event, mapboxglGeolocateEvent) {
      console.log(event, mapboxglGeolocateEvent);
    });

    $scope.$on('mapboxglGeocoder:loading', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:results', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:result', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:error', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglDraw:draw.create', function (event, mapboxglDrawEvent) {
      console.log(event, mapboxglDrawEvent);
    });

    $scope.glCenter = {
      lat: 41,
      lng: -2
    };

    /*$timeout(function () {
      $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';
      $scope.glStyle2 = 'mapbox://styles/mapbox/streets-v9';
    }, 6000, true);*/

    $scope.glZoom = {
      value: 12
    };

    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://placekitten.com/g/60/60/)';
    el.style.width = '60px';
    el.style.height = '60px';

    var el2 = document.createElement('div');
    el2.className = 'marker';
    el2.style.backgroundImage = 'url(https://placekitten.com/g/50/50/)';
    el2.style.width = '50px';
    el2.style.height = '50px';

    $scope.glMarkers = [
      {
        coordinates: [-3, 45],
        element: el
      }, {
        coordinates: [-2, 37],
        element: el2
      }
    ];

    $scope.glControls = {
      navigation: {
        enabled: true,
        options: {
          position: 'top-left'
        }
      },
      scale: {
        enabled: true,
        options: {
          position: 'bottom-left'
        }
      },
      attribution: {
        enabled: true,
        options: {
          compact: true
        }
      },
      geocoder: {
        enabled: true,
        options: {
          accessToken: mapboxgl.accessToken
        }
      },
      geolocate: {
        enabled: true
      }
    };

    $scope.glHandlers = {
      scrollZoom: true
    };

    $scope.glVideo = [
      {
        urls: [
          'https://www.mapbox.com/drone/video/drone.mp4',
          'https://www.mapbox.com/drone/video/drone.webm'
        ],
        coordinates: [
          [-122.51596391201019, 37.56238816766053],
          [-122.51467645168304, 37.56410183312965],
          [-122.51309394836426, 37.563391708549425],
          [-122.51423120498657, 37.56161849366671]
        ]
      }
    ];

    $scope.glSources = [];
    $scope.glLayers = [];

    var features = [];

    for (var iterator = 0; iterator < 8000; iterator++) {
      var tempLng = (Math.random() * (180 - (-180)) + 180).toFixed(5) * 1;
      var tempLat = (Math.random() * (90 - (-90)) + 90).toFixed(5) * 1;

      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [tempLng, tempLat]
        },
        properties: {
          lattitude: tempLat,
          longitude: tempLng
        }
      });
    }

    $scope.glSources = {
      id: 'circles',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    };

    $scope.glLayers = [
      {
        id: 'circles',
        type: 'circle',
        source: 'circles',
        paint: {
          'circle-radius': 5,
          'circle-color': '#0DAAFF'
          //'circle-color': '#FF620D'
        }
      }, {
        id: 'circles-external',
        type: 'circle',
        source: 'circles',
        before: 'circles',
        paint: {
          'circle-radius': 7,
          'circle-color': '#FFFFFF',
        }
      }
    ];

    var tempGlSources = [];
    var tempGlLayers = [];

    for (var iterator = 0; iterator < 10; iterator++) {
      var tempLng = Math.floor(Math.random() * -180) + 180;
      var tempLat = Math.floor(Math.random() * -90) + 90;

      tempGlSources.push({
        id: 'circle' + iterator,
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [tempLng, tempLat]
          }
        },
        /*animation: {
          enabled: true,
          animationData: {
            timeoutMilliseconds: 1000 / 15,
            radius: 20
          },
          animationFunction: function (map, sourceId, animationData, timestamp) {
            var newSourceData = {
              type: 'Point',
              coordinates: [
                Math.cos(timestamp / 1000) * animationData.radius,
                Math.sin(timestamp / 1000) * animationData.radius
              ]
            };

            map.getSource(sourceId).setData(newSourceData);
          }
        }*/
      });

      tempGlLayers.push({
        id: 'circle' + iterator,
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 8,
          'circle-color': '#007cbf',
          'circle-opacity': 1
        }
      });

      /*tempGlLayers.push({
        id: 'circle' + iterator + '_animation',
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 8,
          'circle-radius-transition': { duration: 0 },
          'circle-opacity-transition': { duration: 0 },
          'circle-color': '#007cbf',
        },
        animation: {
          enabled: true,
          animationData: {
            timeoutMilliseconds: 1000 / 25,
            initialOpacity: 1,
            opacity: 1,
            initialRadius: 11,
            radius: 11,
            maxRadius: 22
          },
          animationFunction: function (map, layerId, animationData) {
            animationData.radius += (animationData.maxRadius - animationData.radius) / animationData.speed;
            animationData.opacity -= (0.9 / animationData.speed);

            map.setPaintProperty(layerId, 'circle-radius', animationData.radius);
            map.setPaintProperty(layerId, 'circle-opacity', animationData.opacity);

            if (animationData.opacity <= 0) {
              animationData.radius = animationData.initialRadius;
              animationData.opacity = animationData.initialOpacity;
            }
          }
        }
      });*/

      tempGlLayers.push({
        id: 'circle' + iterator + '_before',
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 11,
          'circle-color': 'white',
          'circle-opacity': 1
        },
        before: 'circle' + iterator
      });
    }

    /*$timeout(function () {
      $scope.glSources = [
        {
          id: 'circle1',
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates:  [-2, 41]
            }
          }
        }
      ];

      var opacity = 1;
      var radius = 8;
      var maxRadius = 18;

      $scope.glLayers = [
        {
          id: 'circle1',
          type: 'circle',
          source: 'circle1',
          paint: {
            'circle-radius': 8,
            'circle-color': 'green',
            'circle-opacity': 1
          }
        }, {
          id: 'circle1_animation',
          type: 'circle',
          source: 'circle1',
          paint: {
            'circle-raidus': 8,
            'circle-radius-transition': { duration: 0 },
            'circle-opacity-transition': { duration: 0 },
            'circle-color': 'green',
          },
          isAnimated: true
        }
      ];
    }, 5000, true);*/
  }]);
})(window.angular, window.mapboxgl);
