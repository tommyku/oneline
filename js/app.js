var app = angular.module("link", ['ui.router', 'ngResource', 'infinite-scroll']);

app.factory('Quote', function($resource) {
    return $resource(
	'/quote',
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
	    url: '/view',
	    templateUrl: 'partials/view.html',
	    controller: 'viewCtrl'
	});

    $urlRouterProvider.otherwise('/');
});

app.controller("mainCtrl", function($scope, Quote, $rootScope) {
    $scope.sp = 0;
    $scope.pack = [];

    $scope.quote = {
	'quote': '',
	'author': '',
	'image': ''
    };

    $scope.post = function() {
	var quote = Quote($scope.quote);
	quote.$save()
	    .then(function(response) {
		console.log(response);
		$rootScope.$broadcast('post-done');
	    })
	    .catch(function(response) {
		console.log(response);
		$rootScope.$broadcast('post-fail');
	    });
    }

    $scope.fetch = function() {
	$rootScope.$broadcast('fetch-initiate');
	var quote = new Quote();
	post.$get({'sp': $scope.sp})
	    .then(function(response) {
		$scope.sp = response.sp;

		$scope.pack = response.quotes.concat($scope.pack);

		$rootScope.$broadcast('fetch-done');

		if (response.quotes.length == 0) {
		    $rootScope.$broadcast('fetch-nomore');
		}
	    })
	    .catch(function(response) {
		$rootScope.$broadcast('fetch-fail');
	    });
    };

    $scope.$on('fetch-initiate', function(e, data) {
    });

    $scope.$on('fetch-done', function(e, data) {
    });

    $scope.$on('fetch-fail', function(e, data) {
    });

    $scope.$on('fetch-nomore', function(e, data) {
    });

    $scope.$on('post-done', function(e, data) {
    });

    $scope.$on('post-fail', function(e, data) {
    });
});
