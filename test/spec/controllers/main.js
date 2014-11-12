'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('logRythmTestApp'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have a make msg method', function () {
    MainCtrl.makeMsg('hello');
    expect(scope.alertMsg).toEqual('hello');
  });

  it('should have a method that validates a form accordingly', function () {
    expect(MainCtrl.validateForm()).toBeFalsy();
    expect(MainCtrl.validateForm('name')).toBeFalsy();
    expect(MainCtrl.validateForm('name',95)).toBeTruthy();
  });

  describe('studentExists', function() {
    it('should return true if a student exists', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'oscar';
      expect(MainCtrl.studentExists()).toBeTruthy();
    });

    it('should return false if a student doesnt exists', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'albert';
      expect(MainCtrl.studentExists()).toBeFalsy();
    });

    it('should alert with the right message', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'oscar';
      MainCtrl.studentExists();
      expect(scope.alertMsg).toEqual('This student already exists');
    });
  });

  it('should add a student to the list', function() {
    scope.students = [];
    scope.studentName = 'test';
    scope.grade = 100;
    MainCtrl.addStudent();
    expect(scope.students.length).toEqual(1);
  });

  describe('passesValidation', function(){
    it('should fail the form validation if a student exists', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'oscar';
      expect(MainCtrl.passesValidations()).toBeFalsy();
    });

    it('should fail the form validation according to validateForm criteria', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = '';
      expect(MainCtrl.passesValidations()).toBeFalsy();
    });

    it('should fail the form validation according to validateForm criteria', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'francisco';
      expect(MainCtrl.passesValidations()).toBeFalsy();
    });

    it('should pass the form validation according to validateForm criteria', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'Robert';
      scope.studentGrade = 50;
      expect(MainCtrl.passesValidations()).toBeTruthy();
    });
  });

  it('should return the min score', function () {
    scope.students = [
      {'name':'a', 'grade':100},
      {'name':'b', 'grade':5}
    ];
    
  });

  describe('submitForm', function(){
    it('should submit the form', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'Robert';
      scope.studentGrade = 50;
      scope.submitForm();
      expect(scope.students.length).toEqual(2);
    });

    it('should cleanup the form', function () {
      scope.students = [{name:'oscar',grade:100}];
      scope.studentName = 'Robert';
      scope.studentGrade = 50;
      scope.submitForm();
      expect(scope.studentName).toEqual('');
      
    });
  });

  
  
});
