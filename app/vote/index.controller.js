(function () {
 
    angular
        .module('app')
        .controller('Vote.IndexController', Controller);
 
    function Controller(UserService) {
        var vm = this;
        
        vm.user = null;
 
        initController();
 
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
    }
 
})();