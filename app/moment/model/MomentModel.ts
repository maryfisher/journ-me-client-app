module jm.moment {

    import AliasDetailVO = jm.user.AliasDetailVO;
    import IPromise = ng.IPromise;

    export class MomentModel {

        static NG_NAME: string = 'momentModel';

        private currentMoment: MomentDetailVO;
        private momentService: MomentDAO;
        private currentAlias: AliasDetailVO;

        constructor($injector: ng.auto.IInjectorService) {
            this.momentService = $injector.get < MomentDAO > (MomentDAO.NG_NAME);
            this.currentMoment = new MomentDetailVO();
            _.bindAll(this, 'setMoment');
        }

        private setMoment(data: IMomentDetailVO) {
            this.currentMoment.parseData(data);
            this.updateAlias(this.currentMoment);
        }

        private updateAlias(moment: MomentDetailVO) {
            if (!this.currentAlias) {
                return;
            }
            moment.isAlias = moment.alias === this.currentAlias._id;
        }

        getCurrentMoment(id ? : string): MomentDetailVO {
            if (id) {
                if (this.currentMoment._id !== id) {
                    this.currentMoment.invalidateData();
                }
                this.momentService.getMoment(id).$promise.then(this.setMoment);
            }
            return this.currentMoment;
        }

        refreshMoment(alias: AliasDetailVO) {
            this.currentAlias = alias;
            this.updateAlias(this.currentMoment);
        }

        createMoment(moment: MomentBaseVO, journeyId: string): IPromise < void > {
            moment.alias = this.currentAlias._id;
            moment.journey = journeyId;
            return this.momentService.createMoment(moment).then(this.setMoment);
            /*function (data) {
                this.setMoment(data);
                //TODO do we really need to do this?
                //this.journeyModel.getCurrentJourney().moments.push(data);
            });*/
        }
        updateMoment(moment): IPromise < void > {
            return this.momentService.updateMoment(moment).then(this.setMoment);
        }
    }
}

/*
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.factory('jmMomentModel', function (jmMomentService, jmAliasVO, jmMomentVO, jmJourneyVO) {

        var setMoment = function (data) {
            jmMomentVO.setMoment(data);
            updateUser(jmMomentVO);
        };

        var updateUser = function (moment) {
            moment.isAlias = moment.alias === jmAliasVO._id;
        };

        var model = {
            getCurrentMoment: function (id) {
                if (id) {
                    if (jmMomentVO._id !== id) {
                        jmMomentVO.invalidateMoment();
                    }
                    jmMomentService.getMoment(id).then(setMoment);
                }
                return jmMomentVO;
            },
            createMoment: function (moment, journeyId) {
                moment.aliasId = jmAliasVO._id;
                return jmMomentService.createMoment(moment, journeyId, jmAliasVO._id).then(
                    function (data) {
                        setMoment(data);
                        jmJourneyVO.moments.push(data);
                    });
            },
            updateMoment: function (moment) {
                return jmMomentService.updateMoment(moment).then(setMoment);
            },
            getMoment: function (id) {
                if (id === jmMomentVO._id) {
                    return jmMomentVO;
                }
                return jmMomentService.getMoment(id);
            }
        };

        return model;
    });

}(window.angular));*/