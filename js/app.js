var app = angular.module("link", ['ui.router', 'ngResource', 'infinite-scroll', 'monospaced.elastic']);

app.factory('Quote', function($resource) {
  return $resource(
    'quote',
    null,
    {
      'get': {
	'method': "GET",
	'params': {
	  'sp': '0'
	}
      }
    }
  );
});

// http://stackoverflow.com/questions/13882077/angularjs-passing-scope-between-routes
// http://thewaterbear.com/nested-animations-in-angularjs-using-ui-router/


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'partials/main.html',
      controller: 'mainCtrl'
    })
    .state('post', {
      url: '/post',
      templateUrl: 'partials/post.html',
      controller: 'postCtrl'
    })
    .state('view', {
      url: '/view/?params',
      templateUrl: 'partials/view.html',
      controller: 'viewCtrl'
    });

  $urlRouterProvider.otherwise('/');
});

app.controller("mainCtrl", function($scope, Quote, $rootScope, $state) {
  $scope.sp = 0;
  $scope.nomore = false;
  $scope.loading = false;
  $scope.pack = [];

  $scope.fetch = function() {
    if ($scope.nomore || $scope.loading) {
      return;
    }

    $rootScope.$broadcast('fetch-initiate');
    var quote = new Quote();
    quote.$get({'sp': $scope.sp})
      .then(function(response) {
	$scope.sp = response.sp;

        console.log(response);

	$scope.pack = $scope.pack.concat(response.quotes);

	$rootScope.$broadcast('fetch-done');

	if (response.quotes.length == 0) {
	  $rootScope.$broadcast('fetch-nomore');
	}
      })
      .catch(function(response) {
	$rootScope.$broadcast('fetch-fail');
      });
  };

  $scope.goToView = function(item) {
    var param = angular.toJson(item);
    $state.go('view', {params: param});
  };

  $scope.$on('fetch-initiate', function(e, data) {
    $scope.loading = true;
    console.log('fetch initiated');
  });

  $scope.$on('fetch-done', function(e, data) {
    $scope.loading = false;
    console.log('fetch done');
  });

  $scope.$on('fetch-fail', function(e, data) {
    console.log('fetch failed');
  });

  $scope.$on('fetch-nomore', function(e, data) {
    $scope.nomore = true;
    console.log('fetch nomore');
  });
});

app.controller("postCtrl", function($scope, Quote, $rootScope, $state) {
  $scope.disabled = false;

  $scope.quote = {
    'quote': '',
    'author': '',
    'image': ''
  };

  $scope.post = function() {
    $rootScope.$broadcast('post-start');

    var quote = new Quote($scope.quote);
    quote.$save()
      .then(function(response) {
	console.log(response);
	$rootScope.$broadcast('post-done');
      })
      .catch(function(response) {
	console.log(response);
	$rootScope.$broadcast('post-fail');
      });
  };

  $scope.$on('post-start', function(e, data) {
    $scope.disabled = true;
  });

  $scope.$on('post-done', function(e, data) {
    // done and go to see the detail
    $state.go('view', {params: angular.toJson($scope.quote)});
  });

  $scope.$on('post-fail', function(e, data) {
    // enable the input
    $scope.disabled = false;
    // display error
  });
});

app.controller("viewCtrl", function($scope, $rootScope, $stateParams) {
  $scope.quote = angular.fromJson($stateParams.params);
});
