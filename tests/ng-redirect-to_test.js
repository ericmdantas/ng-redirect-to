"use strict";

describe('emd.ng-redirect-to', function () {
  var _scope, _compile, _element, _windowMock, _locationMock, _logMock;

  beforeEach(module('emd.ng-redirect-to', function ($provide) {
    $provide.constant('$window',
      {
        location: {
          replace: angular.noop
        }
      })
  }));


  beforeEach(inject(function ($injector) {
    _scope = $injector.get('$rootScope').$new();
    _compile = $injector.get('$compile');
    _windowMock = $injector.get('$window');
    _locationMock = $injector.get('$location');
    _logMock = $injector.get('$log');
  }))

  describe('creation', function () {
    it('should have element created and available', function () {
      var _html = '<div emd-redirect-to></div>';

      _element = angular.element(_html);

      _compile(_element)(_scope);

      _scope.$digest();

      expect(_element).toBeDefined();
    })
  })

  describe('redirect', function () {
    it('should throw an error, no string as a param', function () {
      spyOn(_logMock, 'error').and.callFake(angular.noop);
      spyOn(_locationMock, 'path').and.callFake(angular.noop);
      spyOn(_windowMock.location, 'replace').and.callFake(angular.noop);

      var _html = '<div emd-redirect-to></div>';

      _element = angular.element(_html);

      _compile(_element)(_scope);

      _scope.$digest();

      _element.click();

      expect(_logMock.error).toHaveBeenCalledWith('Path needed to use redirect. Got: undefined');
      expect(_locationMock.path).not.toHaveBeenCalled();
      expect(_windowMock.location.replace).not.toHaveBeenCalled();
    })

    it('should redirect the path to - /abc', function () {
      spyOn(_logMock, 'error').and.callFake(angular.noop);
      spyOn(_locationMock, 'path').and.callFake(angular.noop);
      spyOn(_windowMock.location, 'replace').and.callFake(angular.noop);

      var _html = '<div emd-redirect-to="/abc"></div>';

      _element = angular.element(_html);

      _compile(_element)(_scope);

      _scope.$digest();

      _element.click();

      expect(_logMock.error).not.toHaveBeenCalled();
      expect(_locationMock.path).toHaveBeenCalledWith('/abc');
      expect(_windowMock.location.replace).not.toHaveBeenCalled();
    })

    it('should replace the window location with http://google.com', function () {
      spyOn(_logMock, 'error').and.callFake(angular.noop);
      spyOn(_locationMock, 'path').and.callFake(angular.noop);
      spyOn(_windowMock.location, 'replace').and.callFake(angular.noop);

      var _html = '<div emd-redirect-to="http://google.com"></div>';

      _element = angular.element(_html);

      _compile(_element)(_scope);

      _scope.$digest();

      _element.click();

      expect(_logMock.error).not.toHaveBeenCalled();
      expect(_locationMock.path).not.toHaveBeenCalled();
      expect(_windowMock.location.replace).toHaveBeenCalledWith('http://google.com');
    })

    it('should replace the window location with https://google.com', function () {
      spyOn(_logMock, 'error').and.callFake(angular.noop);
      spyOn(_locationMock, 'path').and.callFake(angular.noop);
      spyOn(_windowMock.location, 'replace').and.callFake(angular.noop);

      var _html = '<div emd-redirect-to="https://google.com"></div>';

      _element = angular.element(_html);

      _compile(_element)(_scope);

      _scope.$digest();

      _element.click();

      expect(_logMock.error).not.toHaveBeenCalled();
      expect(_locationMock.path).not.toHaveBeenCalled();
      expect(_windowMock.location.replace).toHaveBeenCalledWith('https://google.com');
    })

    it('should redirect only when elements on selector were clicked', function () {
      spyOn(_logMock, 'error').and.callFake(angular.noop);
      spyOn(_locationMock, 'path').and.callFake(angular.noop);
      spyOn(_windowMock.location, 'replace').and.callFake(angular.noop);

      var _html = '<div emd-redirect-to="/abc" selector=".redirect"><button class="redirect"></button></div>';

      _element = angular.element(_html);

      _compile(_element)(_scope);

      _scope.$digest();

      _element.click();

      expect(_logMock.error).not.toHaveBeenCalled();
      expect(_locationMock.path).not.toHaveBeenCalledWith('/abc');
      expect(_windowMock.location.replace).not.toHaveBeenCalled();

      _element.find('.redirect').click();

      expect(_logMock.error).not.toHaveBeenCalled();
      expect(_locationMock.path).toHaveBeenCalledWith('/abc');
      expect(_windowMock.location.replace).not.toHaveBeenCalled();
    });
  })
})
