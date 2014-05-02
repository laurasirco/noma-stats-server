var nomaApp = angular.module('nomaApp', []);

nomaApp.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'MainController'
            })

            // route for the about page
            .when('/games', {
                templateUrl : 'pages/list.html',
                controller  : 'ListController'
            })

            // route for the contact page
            .when('/game/:username', {
                templateUrl : 'pages/game.html',
                controller  : 'GameController'
            });

            if(window.history && window.history.pushState){
                  $locationProvider.html5Mode(true);
            } 
    });

nomaApp.controller('MainController', function($scope){
    $scope.message = 'Página principal';
});

nomaApp.controller('GameController', function($scope, $http, $routeParams){
        
    $scope.message = 'Partida';

    $scope.username = $routeParams.username;

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/game/'+ $routeParams.username)
        .success(function(data) {
            $scope.game = data;
            //console.log(data)
        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });

});

nomaApp.controller('ListController', function($scope, $http){
    
    $scope.message = 'Lista de partidas';

    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/games')
        .success(function(data) {
            $scope.games = data;
            //console.log(data)
        })
        .error(function(data) {
            //console.log('Error: ' + data);
        });
});

/*function mainController($scope, $http) {
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/games')
        .success(function(data) {
            $scope.players = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}*/