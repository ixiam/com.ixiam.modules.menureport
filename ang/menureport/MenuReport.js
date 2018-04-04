(function(angular, $, _) {

  angular.module('menureport').config(function($routeProvider) {
      $routeProvider.when('/menureport', {
        controller: 'MenureportMenuReport',
        templateUrl: '~/menureport/MenuReport.html',
        styleUrls: ['./menureport/MenuReport.css'],
        styles: ['.crm-container .reportsList td{padding: 5px 10px;}', '.crm-container .reportsList tr{  border: 1px solid;  padding: 5;  cursor: pointer;  background-color: white;}'],

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: {
          reportsList: function(crmApi) {
            return crmApi('ReportInstance', 'get', {
              sequential: '1',
              'option.limit': 0
            });
          },
          orderReportsList: function(crmApi) {
            return crmApi('reportlistorder', 'get', {
              sequential: '1'
            });
          }
        }
      });
    }
  );

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('menureport').controller('MenureportMenuReport', function($scope, crmApi, crmStatus, crmUiHelp, reportsList, orderReportsList) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('menureport');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/menureport/MenuReport'}); // See: templates/CRM/menureport/MenuReport.hlp

    var orderReportsListArray = orderReportsList.values.split(",");

    var  reportsListvalues = reportsList.values;

    reportsListvalues.sort(sortFunc);

    $scope.list = reportsList.values;

    var tmpList = reportsList.values;

    $scope.sortableOptions = {
      update: function(e, ui) {
        var logEntry = tmpList
          .map(function(i) {
            return i.id;
          })
          .join(", ");
          CRM.api3('reportlistorder', 'set', {
              "sequential": 1,
              "value": logEntry
            }).done(function(result) {
              console.log(logEntry);
          });
        //$scope.sortingLog.push("Update: " + logEntry);
      },
      stop: function(e, ui) {
        // this callback has the changed model
        var logEntry = tmpList
          .map(function(i) {
            return i.id;
          })
          .join(", ");
          CRM.api3('reportlistorder', 'set', {
              "sequential": 1,
              "value": logEntry
            }).done(function(result) {
              console.log(logEntry);

          });
      },
    };

    function sortFunc(a, b) {
      return arraySearch(orderReportsListArray, a["id"] ) - arraySearch(orderReportsListArray, b["id"] );
    }
    function arraySearch(arr,val) {

      for (var i=0; i<arr.length; i++){
        if (parseInt(arr[i]) === parseInt(val)){
          return i;
        }
      }
      return false;

    }

  });

})(angular, CRM.$, CRM._);
