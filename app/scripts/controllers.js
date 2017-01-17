'use strict';
angular.module('confusionApp')

    .controller('MenuController', ['$scope','menuFactory',function($scope,menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';

        $scope.showDetails = false;

        //$scope.dishes = dishes;

        //$scope.dishes = menuFactory.getDishes();

        $scope.showMenu = false;
        $scope.message = "Loading...";

        /* use Http
        $scope.dishes = [];

        menuFactory.getDishes()
            .then(
            function(response){
                $scope.dishes = response.data;
                $scope.showMenu = true;
            },
            function(response){
                $scope.message = "Error:"+response.status + " "+response.statusText;
            }
        );
*/
        //$scope.dishes = menuFactory.getDishes().query();


        menuFactory.getDishes().query(

            function(response){
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response){
                $scope.message = "Error:"+response.status + " "+response.statusText;
            }
        );

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };



    }])

    /*
    .controller('DishDetailController', ['$scope', '$routeParams','menuFactory', function($scope, $routeParams, menuFactory) {

        //$scope.dish= menuFactory.getDish(3);

        $scope.dish = menuFactory.getDish(parseInt($routeParams.id,10));

    }])*/


    .controller('DishDetailController', ['$scope', '$stateParams','menuFactory', function($scope, $stateParams, menuFactory) {

        //$scope.dish= menuFactory.getDish(3);

        //$scope.dish = menuFactory.getDish(parseInt($stateParams.id,10));



        $scope.showDish = false;

        $scope.message = "Loading...";

        /* use Http
         $scope.dish = {};

        menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
            function(response){
                $scope.dish = response.data;
                $scope.showDish = true;
            },
            function(response){
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
*/
        //$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});

        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(

            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response){
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );

    }])
/*
    .controller('IndexController', ['$scope','menuFactory', 'corporateFactory',function($scope,  menuFactory, corporateFactory) {

        //$scope.dish= menuFactory.getDish(3);

        //$scope.dish = menuFactory.getDish(parseInt($stateParams.id,10));

        $scope.dish = {};

        menuFactory.getDish(0)
            .then(
            function(response){
                $scope.dish = response.data;
                $scope.showDish = true;
            }
        );

        $scope.leader = corporateFactory.getLeader(3);

        $scope.promotion = menuFactory.getPromotion(0);
    }])
*/
    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

        $scope.submitComment = function () {
            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);
            $scope.dish.comments.push($scope.mycomment);

            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            $scope.commentForm.$setPristine();
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
        }

    }])

    .controller('ContactController', ['$scope',function($scope) {

        $scope.feedback = {
            //mychannel:"",
            firstName:"",
            lastName:"", agree:false, email:""
        };

        $scope.channels  = [{value:'tel', label:"Tel."},
            {value:"Email", label: "Email"}];


        $scope.invalidChannelSelection = false;
    }])


    .controller('FeedbackController', ['$scope',function($scope) {

        $scope.sendFeedback = function(){
            console.log($scope.feedback);

            if($scope.feedback.agree&&($scope.feedback.mychannel==="")){

                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else{
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"",
                    lastName:"", agree:false, email:""};
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);

            }

        };
    }])

;