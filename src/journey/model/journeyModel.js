// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyModel', function (jmJourneyService, jmJourneyActionService, jmAliasVO, jmJourneyVO) {

        var setJourney = function (data) {
            jmJourneyVO.setJourney(data);
            updateUser(jmJourneyVO);
            updateFollowing(jmJourneyVO);
            updateLinks(jmJourneyVO);
        };

        var updateUser = function (journey) {
            journey.isUser = journey.alias._id === jmAliasVO._id;
        };

        var updateFollowing = function (journey) {
            journey.isFollowing = false;
            var index, len;
            var aliasId = jmAliasVO._id;
            for (index = 0, len = journey.followers.length; index < len; ++index) {
                if (journey.followers[index]._id === aliasId) {
                    journey.isFollowing = true;
                    break;
                }
            }
        };

        var updateLinks = function (journey) {
            var i, j, len, len2;
            for (i = 0, len = journey.linkedFromJourneys.length; i < len; ++i) {
                for (j = 0, len2 = journey.linkedToJourneys.length; j < len2; ++j) {
                    if (journey.linkedFromJourneys[i]._id === journey.linkedToJourneys[j]._id) {
                        journey.joinedLinkedJourneys.push(journey.linkedFromJourneys[i]);
                        journey.linkedFromJourneys.splice(i, 1);
                        journey.linkedToJourneys.splice(j, 1);
                    }
                }
            }
        };

        var model = {
            getCurrentJourney: function (id) {
                if (id) {
                    if (jmJourneyVO._id !== id) {
                        jmJourneyVO.invalidateJourney();
                    }
                    jmJourneyService.getJourney(id).$promise.then(setJourney);
                }
                return jmJourneyVO;
            },
            createJourney: function (journey) {
                journey.aliasId = jmAliasVO._id;
                return jmJourneyService.createJourney(journey).then(setJourney);
            },
            updateJourney: function (journey) {
                return jmJourneyService.updateJourney(journey).then(setJourney);
            },
            getJourney: function (id) {
                if (!id) {
                    return {};
                }
                if (id === jmJourneyVO._id) {
                    return jmJourneyVO;
                }
                return jmJourneyService.getJourney(id);
            },
            getEmptyJourney: function () {
                return {
                    hasLocation: false,
                    isPublic: true,
                    join: 'all'
                };
            },
            followJourney: function (journey) {
                if (!journey) {
                    journey = jmJourneyVO;
                }
                return jmJourneyActionService.followJourney(journey._id, jmAliasVO._id).then(
                    function () {
                        if (!journey.followers) {
                            journey.followers = [];
                        }
                        journey.followers.push(jmAliasVO);
                        journey.isFollowing = true;
                    });
            },
            unfollowJourney: function (journey) {
                if (!journey) {
                    journey = jmJourneyVO;
                }
                return jmJourneyActionService.unfollowJourney(journey._id, jmAliasVO._id).then(
                    function () {
                        var index, len;
                        for (index = 0, len = journey.followers.length; index < len; ++index) {
                            if (journey.followers[index]._id === jmAliasVO._id) {
                                break;
                            }
                        }
                        journey.followers.splice(index, 1);
                        journey.isFollowing = false;
                    });
            },
            linkJourney: function (journey) {
                return jmJourneyActionService.linkJourney(journey._id, jmJourneyVO._id).then(
                    function () {
                        jmJourneyVO.linkedFromJourneys.push(journey);
                        updateLinks(jmJourneyVO);
                    }
                );
            }
        };

        return model;
    });

}(window.angular));