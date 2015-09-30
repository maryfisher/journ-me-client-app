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
                var alias = angular.copy(jmAliasVO);
                alias.thumb = undefined;
                alias.journeys = undefined;
                alias.followedJourneys = undefined;
                Upload.upload({
                    url: 'api/user/profile/' + jmAliasVO._id,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    fields: {
                        alias: alias
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    jmAliasVO.setAlias(data);
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (status) {
                    console.log('error status: ' + status);
                });
            }
        };

        return model;
    });

}(window.angular));