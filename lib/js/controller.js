angular.module("app", ['ngMaterial', 'ngMask'])
angular.module("app").directive('loading', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />Enviando...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
})
    .controller("appCtrl", function ($scope, $element) {


        $scope.searchTerm;
        $scope.clearSearchTerm = function () {
            $scope.searchTerm = '';
        };

        $element.find('input').on('keydown', function (ev) {
            ev.stopPropagation();
        });

        $scope.exibir = true;

        $scope.resetarDados = function () {

            $scope.dados = [];
            $scope.exibir = true;
            $scope.cpf = '';

        }

        $scope.buscarDados = function (cpf) {
            $scope.loading = true;
            $scope.btnDown = true;
            cpf = cpf.replace(/\D+/g, '');


            URLAPI = "www.enderecodaapi.com/";
            $.post(
                URLAPI,
                {
                    cpf
                },
                function (response, status) {
                    $scope.loading = false;
                    $scope.mensagem_retorno = "";
                    $scope.dados = response;
                    $scope.exibir = false;
                    $scope.$apply();
                    //console.log(response);

                }).fail(function (response) {
                    console.log(response);
                    $scope.mensagem_retorno = "Cpf inválido ou aluno sem diploma!";
                    $scope.loading = false;
                    $scope.$apply();
                });




        }

    });