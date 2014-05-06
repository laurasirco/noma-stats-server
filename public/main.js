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

  if(personality != 'undefined'){
    console.log("personality: " + personality);

    //Retrieve values
    var series = [];
    var prev = 0;

    while(prev < personality.length - 2){
        
        var i = personality.indexOf(',', prev);
        var nS = '';
        for(var j = prev; j < i; j++)
            nS += personality[j];

        nS = nS.replace("undefined", "");
        series.push(parseInt(nS));

        //console.log("series:" + series);
        prev = i+1;
    }

    var nS = '';
    for(var j = prev; j < personality.length; j++)
        nS += personality[j];

    nS = nS.replace("undefined", "");
    series.push(parseInt(nS));

$(function () {

    $('#personalityContainer').highcharts({
                
        chart: {
            polar: true,
        },

        colors: ['#058DC7'],
        
        title: {
            text: '',
        },

        tooltip: {
            shadow: false,
            borderRadius: 0,
            headerFormat: '',
            pointFormat: '{point.y}',
        },
        
        xAxis: {
            categories: ['Actividad', 'Confianza', 'Conversación', 'Humor'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
            
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },

        series: [{
            name: '',
            type: 'area',
            data: series,
            pointPlacement: 'on'
        }]
    
    });
});
}
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
                type: 'spline',
                alignTicks: false,
            },

            colors: ['#50B432'],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            tooltip: {
                shadow: false,
                borderRadius: 0,
                headerFormat: '',
                pointFormat: '{point.y}',
            },
            yAxis: {
                title: {
                    text: 'Ambiente',
                },
                max: 100,
                min: 0,
                tickInterval: 10,
                endOnTick: false,
                gridLineDashStyle: 'longdash'
            },
            xAxis: {
                title:{
                    text: 'Tiempo (min)',
                },
                tickInterval: 1
            },
            plotOptions: {

            },
                series: [{
                    data: series,
                    marker: {
                        enabled: false
                    }
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

            var text = document.createTextNode('personalityChart("'+newMyData.activity+','+newMyData.confidence+','+newMyData.conversation+','+newMyData.temperament+'")');  
            scr.appendChild(text);
            elem.append(scr);
        });
    }
  };
});