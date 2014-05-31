var app = angular.module('TTNRelay', [
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
  ])

.config(function($routeProvider, $locationProvider){

    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'TrackerCtrl'
    });

    $routeProvider.when('/thing/:thingId', {
      templateUrl: 'views/thing/view.html',
      controller: 'ThingCtrl'
    });

    $locationProvider.html5Mode(false);

  })

.controller('AppCtrl', ['$scope', '$timeout', '$http', '$rootScope', function($scope, $timeout, $http, $rootScope) {

  if ($scope.things == undefined){
    $scope.thingsSummary = [];

    $http.get('tracker.json').success(function(data) {

      $scope.things = {};

      for (var i = 0; i < data.things.length; i++) {
        var thing = data.things[i];
        $scope.things[thing.id] = thing;
        $scope.thingsSummary.push({
          id: thing.id,
          title: thing.title,
          description: thing.description,
          thumbnailURL: (thing.thumbnailUrls&&thing.thumbnailUrls[0])||undefined
        });
      };
    });
  }
}])

.controller('TrackerCtrl', ['$rootScope', function($rootScope) {
  $rootScope.appTitle = "Thing Tracker"
}])

.controller('ThingCtrl', ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope) {

  $scope.thingId = $routeParams.thingId;

  if ($scope.thingId === undefined){
    console.error("No Thing ID given.");
    $location.path( "/" );
  };

  $scope.thing = $scope.things[$scope.thingId];

  $rootScope.appTitle = "Thing Tracker : " + $scope.thing.title

}])
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})
.filter('nl2br', function () {
  return function(text){
    if (text == undefined){
      return undefined;
    }
    return text.replace(/\\n/g,'<br>');
  }
})
.filter('stripUrlProtocol', function () {
  return function(text){
    if (text == undefined){
      return undefined;
    }
    return text.replace(/^(?:(ht|f)tp(s?)\:\/\/)?/,'');
  }
})
.filter('truncate', function () {
  return function (text, length, end) {
    if (text == undefined){
      return undefined;
    }
    if (isNaN(length))
        length = 10;

    if (end === undefined)
        end = "...";

    if (text.length <= length || text.length - end.length <= length) {
        return text;
    }
    else {
        return String(text).substring(0, length-end.length) + end;
    }
  };
});