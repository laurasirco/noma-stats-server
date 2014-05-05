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

function personalityChart(personality){

  if(personality.activity != 'undefined'){
    console.log("personality: " + personality.activity);
  }
$(function () {

    $('#personalityContainer').highcharts({
                
        chart: {
            polar: true,
        },
        
        title: {
            text: 'Budget vs spending',
            x: -80
        },
        
        pane: {
            size: '80%'
        },
        
        xAxis: {
            categories: ['Sales', 'Marketing', 'Development', 'Customer Support'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
            
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },

        series: [{
            name: 'Allocated Budget',
            data: [43000, 19000, 60000, 35000],
            pointPlacement: 'on'
        }]
    
    });
});
}

function environmentChart(environment) {

    console.log("function: "+environment);

    var series = [];
    /*for (var i = 0; i < environment.length; i++) {
        series.push(parseFloat(environment[i]);
    }*/

    if(environment != 'undefined'){
        
        var prev = 0;

        while(prev < environment.length - 2){
            
            var i = environment.indexOf(',', prev);
            var nS = '';
            for(var j = prev; j < i; j++)
                nS += environment[j];

            nS = nS.replace("undefined", "");
            series.push(parseInt(nS));

            //console.log("series:" + series);
            prev = i+1;
        }

        var nS = '';
        for(var j = prev; j < environment.length; j++)
            nS += environment[j];

        nS = nS.replace("undefined", "");
        series.push(parseInt(nS));
    
    }

    $(function () {
            $('#environmentContainer').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            yAxis: {
                title: {
                    text: 'Valor',
                    max: 100,
                    min: 0
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
                series: [{
                data: series
            }]
            });
    });
}


/*nomaApp.directive('environmentChart', function(){
return {
    restrict: 'E',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) {
      var scr = document.createElement('script');
      var text = document.createTextNode('environmentChart("' + scope + '")');
      scr.appendChild(text);
      elem.append(scr);
    }
  }*/

nomaApp.directive("environmentChart", function() {
  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, elem, attrs) {
        scope.$watch('game.environment', function (newMyData) {
            console.log("loaded env: "+newMyData);
            var scr = document.createElement('script');

            var text = document.createTextNode('environmentChart("' + newMyData+ '")');  
            scr.appendChild(text);
            elem.append(scr);
        });
    }
  };
});

nomaApp.directive("personalityChart", function() {
  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, elem, attrs) {
        console.log(scope);
        scope.$watch('game.personality', function (newMyData) {
            console.log("loaded: "+newMyData.activity+", "+newMyData.confidence+", "+newMyData.conversation+", "+newMyData.temperament);
            var scr = document.createElement('script');

            var text = document.createTextNode('personalityChart("' + newMyData+ '")');  
            scr.appendChild(text);
            elem.append(scr);
        });
    }
  };
});