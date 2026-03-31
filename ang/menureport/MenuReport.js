(function(angular, $, _) {

  angular.module('menureport').config(function($routeProvider) {
    $routeProvider.when('/menureport', {
      controller: 'MenureportMenuReport',
      templateUrl: '~/menureport/MenuReport.html',
      resolve: {
        // APIv4: returns array directly (no .values wrapper)
        reportsList: function(crmApi4) {
          return crmApi4('ReportInstance', 'get', {
            select: ['id', 'title', 'description'],
            limit: 0
          });
        },
        orderReportsList: function(crmApi4) {
          return crmApi4('ReportListOrder', 'get', {});
        }
      }
    });
  });

  angular.module('menureport').controller('MenureportMenuReport', function($scope, crmUiHelp, reportsList, orderReportsList) {
    var ts = $scope.ts = CRM.ts('menureport');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/menureport/MenuReport'});

    // APIv4: orderReportsList is array directly; first record has .value
    var savedValue = (orderReportsList.length > 0) ? orderReportsList[0].value : null;
    var orderReportsListArray = savedValue ? savedValue.split(",") : [];

    // APIv4: reportsList is array directly (no .values)
    reportsList.sort(sortFunc);

    $scope.list = reportsList;
    $scope.searchTerm = '';

    // tmpList is same reference — used inside sortable callback
    var tmpList = reportsList;

    $scope.sortableOptions = {
      stop: function(e, ui) {
        // 'stop' fires after Angular has synced the model — tmpList has correct new order
        var logEntry = tmpList
          .map(function(i) { return i.id; })
          .join(", ");
        // APIv4 save
        CRM.api4('ReportListOrder', 'set', { value: logEntry })
          .then(function(result) {});
      },
    };

    // Disable sorting while searching to avoid model corruption
    $scope.$watch('searchTerm', function(val) {
      $scope.sortableOptions.disabled = !!val;
    });

    function sortFunc(a, b) {
      return arraySearch(orderReportsListArray, a["id"]) - arraySearch(orderReportsListArray, b["id"]);
    }

    function arraySearch(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i]) === parseInt(val)) {
          return i;
        }
      }
      return false;
    }
  });

})(angular, CRM.$, CRM._);
