var configuration = {
    rootUrl:"/qds-online-test-with-db/quodisystest/",
    rootImage:"/qds-online-test-with-db/quodisystest/asset/images/",
    rootTemplate:"/qds-online-test-with-db/quodisystest/template/"
};

var QuodisysApp = angular.module('QuodisysApp', ['ngRoute', 'ngAnimate','ui.router'])
// .constant('configuration',{
//     rootImage:"/quodisystest/asset/images/",
//     rootTemplate:"/quodisystest/template/"
// })
.factory('httpInterceptor', function ($q, $rootScope, $log, $timeout) {
    var loadingCount = 0;
    var isViewRequest = false;
    return {
        request: function (config) {
            if (config.url.indexOf('.html') > -1) {
                isViewRequest = true;
            }
            else {
                isViewRequest = false;
                $rootScope.$broadcast('loading:progress');
            }
            return config || $q.when(config);
        },
        response: function (response) {
            if (isViewRequest === true) {
                return response;
            } else {
                var defer = $q.defer();
                $timeout(function () {
                    $rootScope.$broadcast('loading:finish');
                    defer.resolve(response);
                    //$q.when(response);

                }, 200);
                return defer.promise;
            }
        },
        responseError: function (response) {
            $rootScope.$broadcast('loading:finish');
            return $q.reject(response);
        }
    };
})
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
    // .when('/login', {
    //     templateUrl: configuration.rootTemplate+'login.html',
    //     controller: 'LoginController'
    // })
    .when('/information', {
        templateUrl: configuration.rootTemplate+'information.html',
        controller: 'InformationController'
    })
    .when('/IQ', {
        templateUrl: configuration.rootTemplate+'IQ.html',
        controller: 'IQController'
    })
    .when('/MI', {
        templateUrl: configuration.rootTemplate+'MI.html',
        controller: 'MIController'
    })
    .when('/Honesty', {
        templateUrl: configuration.rootTemplate+'Honesty.html',
        controller: 'HonestyController'
    })
    .when('/Attitude', {
        templateUrl: configuration.rootTemplate+'Attitude.html',
        controller: 'AttitudeController'
    })
    .when('/Finish', {
        templateUrl: configuration.rootTemplate+'Thank.html',
        controller: 'ThankController'
    })
    .when('/Result', {
        templateUrl: configuration.rootTemplate+'Result.html',
        controller: 'ResultController'
    })
    .when('/Recovery', {
        templateUrl:  configuration.rootTemplate+'Recovery.html',
        controller: 'RecoveryController'
    })
    .otherwise({
        redirectTo: '/information'
    });

    $httpProvider.interceptors.push('httpInterceptor');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

    //$locationProvider.html5Mode(true);
}])

.run(function ($rootScope, $location, Authentication) {
    $rootScope.globalConfig = configuration;

    // $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    //     alert("Error ! Check your internet");
    //     if (previous) {
    //         $window.history.back();
    //     }        
    // });

    $rootScope.$on('$routeChangeStart', function (event) {
        // console.log(Authentication.GetUser());
        var path = $location.path();
        // console.log(path);
        // console.log(['/information','/recovery'].indexOf(path.toLowerCase()));
        if (!Authentication.IsAuthentication() &&
            ['/information','/recovery'].indexOf(path.toLowerCase()) === -1
        ) {
            if (sessionStorage.getItem("company") == 'Quodisys') {
                sessionStorage.clear();
                window.location.href = "https://qdsasia.com";

            }else if (sessionStorage.getItem("company") == 'Compliy') {
                sessionStorage.clear();
                window.location.href = "https://compliy.com";
            }else {
                event.preventDefault();
                $location.path('/information');
            }
        }
        
    });

});
