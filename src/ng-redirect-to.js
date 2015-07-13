"use strict";

;(function(ng)
{
  angular
    .module('emd.ng-redirect-to', [])
    .directive('emdRedirectTo', ['$window', '$location', '$log', function($window, $location, $log)
    {
      var _link = function(scope, element, attrs)
      {
        element.on('click', attrs.selector, function()
        {
          var _isHttp = /^http/;
          var _url = scope.dest;

          if (!ng.isString(_url) || !_url.length)
          {
            _url = _url || undefined;
            return $log.error('Path needed to use redirect. Got: ' + typeof _url);
          }

          if (_isHttp.test(_url))
          {
              $window.location.replace(_url);
          }
          else
          {
            scope.$apply(function()
            {
                $location.path(_url);
            });
          }
        });
      };

      var _scope = {dest: '@emdRedirectTo'};

      return {
                link: _link,
                scope: _scope
             };
    }]);
}(angular))
