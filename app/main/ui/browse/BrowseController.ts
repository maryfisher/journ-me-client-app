module jm.main.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import JMConfigConst = jm.common.JMConfigConst;
    import JourneyDAO = jm.journey.JourneyDAO;
    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import CategoryWeightVO = jm.main.CategoryWeightVO;
    import IJourneySearchFilter = jm.journey.IJourneySearchFilter;

    export interface IBrowseScope extends ng.IScope {
        searchFilter: IJourneySearchFilter,
        categories: ICategoryVO[],
        retrieveRelevantTopics(string),
        searchJourneys(),
        searchResult: IJourneyBaseVO[],
        totalItems: number,
        itemsPerPage: number,
        currentPage: number,
        joinCategoryWeights(categoryWeights: CategoryWeightVO[]): string,
        selectTopic(topic: any),
        selectedTopic: string,
        removeTopic(topic: string)
    }

    export class BrowseController extends jm.common.BaseController {

        static NG_NAME: string = 'BrowseController';

        static $inject = [NGConst.$SCOPE, JMConfigConst.CATEGORIES, JourneyDAO.NG_NAME];

        constructor(private $scope: IBrowseScope, private categoriesConst: ICategoryVO[], private journeyService: JourneyDAO) {
            super($scope);

            // default values when search filter is loaded initially
            $scope.searchFilter = {
                text: undefined,
                textMatcher: "0",
                join: undefined,
                joinMatcher: "0",
                categories: [],
                categoriesMatcher: "0",
                topics: [],
                topicsMatcher: "0",
                selectedTopic: undefined
            };
            $scope.categories = categoriesConst;

            $scope.joinCategoryWeights = function (categoryWeights: CategoryWeightVO[]): string {
                if (categoryWeights && categoryWeights.length > 0) {
                    var joinStr: string = categoryWeights[0].category;
                    for (var i = 1; i < categoryWeights.length; i++) {
                        joinStr += ', ' + categoryWeights[i].category;
                    }
                    return joinStr;
                }
            };

            $scope.retrieveRelevantTopics = function (val: string) {
                return journeyService.retrieveRelevantTopics({
                    tagFragment: val
                }).then(function (response) {
                    return response.data;
                });
            };

            $scope.selectTopic = function (topic: any) {
                $scope.searchFilter.topics.push(topic.tag);
                $scope.searchFilter.selectedTopic = undefined;
            };

            $scope.removeTopic = function (string: string) {
                var topics = $scope.searchFilter.topics;
                topics.splice(topics.indexOf(string), 1);
            };

            $scope.searchJourneys = function () {
                return journeyService.searchJourneys($scope.searchFilter, {
                    pageNumber: $scope.currentPage ? $scope.currentPage - 1 : 0,
                    pageSize: $scope.itemsPerPage || 10,
                    sortDirection: 'DESC',
                    sortProperty: 'created'
                }).then(function (response) {
                    $scope.searchResult = response.data["content"];
                    $scope.totalItems = response.data["totalElements"];
                    $scope.itemsPerPage = response.data["size"];
                    $scope.currentPage = response.data["number"] + 1; //Spring pagination uses 0 index, Angular Boostrap pagination uses 1 index
                    return response.data;
                });
            };

        };
    }
}
