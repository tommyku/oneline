<!DOCTYPE html>
<html ng-app="link">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Quote - random quote for your inspiration</title>

    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />  
    <meta name="description" content="Light-weight search engine for stored links" />

    <script type="text/javascript" src="js/angular/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script type="text/javascript" src="js/angular-resource/angular-resource.min.js"></script>
    <script type="text/javascript" src="js/ngInfiniteScroll/build/ng-infinite-scroll.min.js"></script>
    <script type="text/javascript" src="js/app.js"></script>

    <link rel="shortcut icon" href="" />
    <link rel="apple-touch-icon" href="" />
    
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/animate.css" />

  </head>
  <body ng-controller="mainCtrl">
    <header id="header">
      <div id="app-name">LINK</div>
    </header>
    
    <div id="content">
      <!-- links -->
      <div class="link-block">
	<input type="text" ng-model="search" placeholder="SEARCH" ng-keyup="$event.keyCode == 13 && find();" />
      </div>

      <div id="loading-msg" class="animated shake" ng-show="nothing">
	<p id="loading-text">found nothing...</p>
      </div>

      <div id="loading-msg" class="animdated hinge bounce" ng-show="initiate">
	<p id="loading-text">hey wait...</p>
      </div>

      <div id="loading-msg" class="animated bounce" ng-show="fail">
	<p id="loading-text">didn't got it</p>
      </div>

      <ul class="main-list">
	<li class="link-block animated fadeInUp" ng-repeat="item in pack" style="-webkit-animation-delay:{{$index*0.1}}s; animation-delay:{{$index*0.1}}s;">
	  <a href="post/{{item.id}}/bounce" target="_blank" title="{{item.link}}">
	    <div class="data-wrapper">
	      <div class="title" ng-bind-html="item.title">{{(item.title) ? item.title : item.link}}</div>
	      <div class="description">{{item.description}}</div>
	      <div class="domain">{{item.domain}}</div>
	    </div>
	  </a>
	</li>
      </ul>

      <div class="clearfix"></div>
      
    </div>

  </body>
</html>
