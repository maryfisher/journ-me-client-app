// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.factory('jmAliasModel', function (jmAliasService, jmAliasVO, jmJourneyModel, Upload) {

        var setAlias = function (data) {
            jmAliasVO.setAlias(data);
            jmJourneyModel.refreshJourney();
        };

        var model = {
            getCurrentAlias: function () {
                //for now we have no way of checking whether an extensive GET was already performed
                //should maybe rethink this together with current authentication flow
                if (jmAliasVO._id) {
                    jmAliasService.getAlias(jmAliasVO._id).$promise.then(setAlias);
                }
                return jmAliasVO;

            },
            updateAlias: function (file) {
                Upload.upload({
                    url: 'api/user/profile/' + jmAliasVO._id,
                    fields: jmAliasVO,
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (status) {
                    console.log('error status: ' + status);
                });
            }
        };

        return model;
    });

}(window.angular));