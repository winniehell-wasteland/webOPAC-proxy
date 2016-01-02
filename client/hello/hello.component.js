var module = angular.module('webOPAC-proxy')

module.directive('hello', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/hello/hello.html',
        controllerAs: 'hello',
        controller: HelloCtrl
    }
})

HelloCtrl.$inject = [
    '$scope',
    '$reactive'
]

function HelloCtrl ($scope, $reactive) {
    var vm = this;

    $reactive(vm).attach($scope)

    vm.helpers({
        serverMessage: ''
    })

    vm.loadMessage = () => {
        Meteor.call('loadMessage', (error, result) => {
            if (error) {
                vm.serverMessage = 'Could not load server message!'
                console.error(error)
                return
            }

            vm.serverMessage = 'Server message is: ' + result
        })
    }
}
