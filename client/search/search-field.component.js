var module = angular.module('webOPAC-proxy')

module.directive('searchField', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/search/search-field.html',
    controllerAs: 'searchField',
    controller: SearchFieldCtrl
  }
})

SearchFieldCtrl.$inject = [
  '$scope',
  '$reactive'
]

function SearchFieldCtrl ($scope, $reactive) {
  var vm = this

  $reactive(vm).attach($scope)

  vm.helpers({
    searchText: '',
    selectedItem: 0
  })

  vm.runSearch = runSearch

  function runSearch (query) {
    var promise = new Promise((fulfill, reject) => {
      Meteor.call('findNumber', query, (error, results) => {
        if (error) {
          return reject(error)
        }

        fulfill(results)
      })
    })

    // workaround for https://github.com/angular/material/pull/6521
    if (!promise.finally) {
      promise.finally = promise.then
    }

    return promise
  }
}
