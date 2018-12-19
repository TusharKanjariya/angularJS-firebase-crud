
var app = angular.module("studentApp", ['ngRoute', 'firebase', 'toastr']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'fetchStudent'
    })
        .when('/add', {
            templateUrl: 'add.html',
            controller: 'addStudent'
        })
        .when('/edit/:id', {
            templateUrl: 'edit.html',
            controller: 'editStudent'
        })
        .otherwise({
            templateUrl: '404.html'
        });
});

app.controller("fetchStudent", function ($scope, $firebaseArray) {
    var ref = firebase.database().ref("students");
    $scope.records = $firebaseArray(ref);

    $scope.removeData = function (info) {
        $scope.records.$remove(info).then(function () {
            console.log(info);
        },
            function (error) {
                console.log(error);
            });
    }
});
app.controller("addStudent", function ($scope, $firebaseArray, toastr) {
    var ref = firebase.database().ref("students");
    $scope.add = function () {
        console.log($scope.student);
        $firebaseArray(ref).$add($scope.student).then(function (ref) {
            toastr.success('', 'Data stored successfully.');
            $scope.student.name = '';
            $scope.student.dept = '';
            $scope.student.sem = '';
        });
    }
});
app.controller("editStudent", function ($scope, $firebaseArray, toastr, $firebaseObject, $routeParams) {
    var id = $routeParams.id;
    var ref = firebase.database().ref("students/" + id);
    $scope.student = $firebaseObject(ref);

    $scope.edit = function (id) {
        var ref = firebase.database().ref("students/" + id);
        ref.update({
                name: $scope.student.name,
                dept: $scope.student.dept,
                sem: $scope.student.sem
            }).then(function(ref){
                toastr.success("","Data Updated Successfully");
            },function(error){
                toastr.error('','Data is not Upload');
            });
    }

})