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

  vm.numbers = [
    {title: 'One'},
    {title: 'Two'},
    {title: 'Three'},
    {title: 'Four'},
    {title: 'Five'},
    {title: 'Six'},
    {title: 'Seven'},
    {title: 'Eight'},
    {title: 'Nine'}
  ]
  vm.runSearch = runSearch

  function runSearch (query) {
    console.log('searching for ' + query)
    if (!query) {
      return vm.numbers
    }

    var results = vm.numbers.filter(createFilterFor(query))
    return results
  }

  function createFilterFor (query) {
    var lowercaseQuery = angular.lowercase(query)
    console.log('filter for ' + lowercaseQuery)
    return function filterFn (number) {
      return (angular.lowercase(number.title).indexOf(lowercaseQuery) > -1)
    }
  }
}
