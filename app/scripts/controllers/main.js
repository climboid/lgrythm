'use strict';

/**
 * @ngdoc function
 * @name logRythmTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the logRythmTestApp
 */
angular.module('logRythmTestApp')
  .controller('MainCtrl',['$scope','localStorageService', function ($scope,localStorageService) { 
    // ----------- using ['dependency to assure that minification wont break the code']

    $scope.students = localStorageService.get('students') || [];

    /*
      A function that empties the form values
    */
    function cleanForm () {
      $scope.studentName = '';
      $scope.studentGrade = '';
    }

    /*
      A function that checks for the passed params
    */
    function validateForm (name, grade) {
      if (!name || !grade){
        makeMsg('Please fill out the form fully');
        return false;
      }
      return true;
    }

    /*
      A function that checks to see if the student has been added to our array of students.
      Ideally we would match on id or something rather than a String but keeping it as a String
      for simplicity
    */
    function studentExists () {
      var std = _.find($scope.students, function(student) {
        return student.name === $scope.studentName;
      });

      if (std) {
        makeMsg('This student already exists');
        return true;
      }
      return false;

    }


    /*
      A function that pushes the values of the form to the students array as an object
      with given properties
    */
    function addStudent () {
      $scope.students.push({'name':$scope.studentName, 'grade':$scope.studentGrade});
    }

    /*
      A function that receives a message and populates the alert message box with it
    */
    function makeMsg (msg) {
      $scope.alertMsg = msg;
    }

    function passesValidations() {
      return !studentExists() && validateForm($scope.studentName, $scope.studentGrade) ? true : false;
    }

    function getGrades () {
      var grades = _.map($scope.students, function(item){
        return item.grade;
      });
      return grades;
    }

    $scope.getMinScore = function () {
      if ($scope.students.length) {
        return _.min(getGrades());
      }
    };

    $scope.getMaxScore = function () {
      if ($scope.students.length) {
        return _.max(getGrades());
      }
    };

    $scope.triggerBlur = function (student, prop) {
      student[prop] = false;
      localStorageService.set('students', $scope.students);
    };

    $scope.getAverage = function () {
      var avg;
      if ($scope.students.length) {
        var grades = getGrades();
        avg = _.reduce(grades, function(memo, num){
          return memo + num;
        }, 0) / grades.length;  
      }
      return avg;
      
    };

    $scope.findKey = function (student, field) {
      if (event.which === 13 && student.grade <= 100) {
        student[field] = false;
        localStorageService.set('students', $scope.students);
      }
    };

    /*
      A function that is triggered uppon submitting the form.
      It checks if the form is valid and then checks to see if the user has been added.
      Only when previous pass will the student be added to the list.
    */
    $scope.submitForm = function () {
      if (passesValidations()) {
        addStudent();
        cleanForm();
        localStorageService.set('students', $scope.students);
      }
    };

    // Used mainly for unit tests
    // potentially this could be removed from controller and into its own service
    // keeping it here for ease of review
    return {
      makeMsg : makeMsg,
      validateForm : validateForm,
      studentExists : studentExists,
      addStudent : addStudent,
      passesValidations : passesValidations
    };


  }]);
