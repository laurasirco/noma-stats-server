var angularNoma = angular.module('angularNoma', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/players')
        .success(function(data) {
            $scope.players = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}