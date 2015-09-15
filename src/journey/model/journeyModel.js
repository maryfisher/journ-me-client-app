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
            jmJourneyVO.aliasJourneyLink = updateAliasJourneyLink(jmJourneyVO);
        };

        var updateUser = function (journey) {
            journey.isAlias = journey.alias._id === jmAliasVO._id;
        };

        var updateFollowing = function (journey) {
            if (journey.alias._id === jmAliasVO._id || !jmAliasVO._id) {
                return;
            }
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
            journey.joinedLinkedJourneys.length = 0;
            var i, j, len, len2;
            for (i = 0, len = journey.linkedFromJourneys.length; i < len; ++i) {
                for (j = 0, len2 = journey.linkedToJourneys.length; j < len2; ++j) {
                    if (journey.linkedFromJourneys[i]._id === journey.linkedToJourneys[j]._id) {
                        journey.joinedLinkedJourneys.push(journey.linkedFromJourneys[i]);
                        //NOTE probably gonna throw an error, have to keep an eye on this
                        journey.linkedFromJourneys.splice(i, 1);
                        journey.linkedToJourneys.splice(j, 1);
                    }
                }
            }
        };

        var updateAliasJourneyLink = function (journey) {
            if (journey.alias._id === jmAliasVO._id || !jmAliasVO._id || !jmAliasVO.journeys) {
                return;
            }
            var i, j, len, len2;
            var allJourneys = journey.joinedLinkedJourneys.concat(journey.linkedFromJourneys);
            for (i = 0, len = allJourneys.length; i < len; i++) {
                for (j = 0, len2 = jmAliasVO.journeys.length; j < len2; j++) {
                    if (allJourneys[i]._id === jmAliasVO.journeys[j]._id || allJourneys[i]._id === jmAliasVO.journeys[j]) {
                        return allJourneys[i];
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
            refreshJourney: function () {
                if (!jmJourneyVO._id) {
                    return;
                }
                jmJourneyVO.aliasJourneyLink = updateAliasJourneyLink(jmJourneyVO);
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
            linkJourney: function (userLinkJourney, journey) {
                if (!journey) {
                    journey = jmJourneyVO;
                }
                return jmJourneyActionService.linkJourney(userLinkJourney._id, journey._id).then(
                    function () {
                        journey.linkedFromJourneys.push(userLinkJourney);
                        if (!journey.joinedLinkedJourneys) {
                            journey.joinedLinkedJourneys = [];
                        }
                        updateLinks(journey);
                        journey.aliasJourneyLink = userLinkJourney;
                    }
                );
            },
            linkBackJourney: function (userLinkJourney, journey) {
                if (userLinkJourney._id === jmJourneyVO._id) {
                    userLinkJourney = jmJourneyVO;
                }
                return jmJourneyActionService.linkJourney(userLinkJourney._id, journey._id).then(
                    function () {
                        userLinkJourney.linkedToJourneys.push(journey);
                        updateLinks(userLinkJourney);
                    }
                );
            },
            unlinkJourney: function (journey, userLinkJourney) {
                return jmJourneyActionService.unlinkJourney(userLinkJourney._id, journey._id).then(
                    function (response) {
                        journey.linkedToJourneys = response.data.linkedToJourneys;
                        journey.linkedFromJourneys = response.data.linkedFromJourneys;
                        updateLinks(journey);

                        journey.aliasJourneyLink = undefined;
                    }
                );
            }
        };

        return model;
    });

}(window.angular));