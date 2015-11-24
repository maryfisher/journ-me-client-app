module jm.main.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import JMConfigConst = jm.common.JMConfigConst;
    import JourneyDAO = jm.journey.JourneyDAO;
    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import CategoryWeightVO = jm.main.CategoryWeightVO;
    import PageVO = jm.main.PageVO;
    import JourneySearchFilterVO = jm.journey.JourneySearchFilterVO;

    export interface IBrowseScope extends ng.IScope {
        searchFilter: JourneySearchFilterVO,
        categories: ICategoryVO[],
        retrieveRelevantTopics(val: string): ng.IPromise < string[] >,
        searchJourneys(): ng.IPromise < IPage < IJourneyBaseVO > >,
        searchPage: PageVO < IJourneyBaseVO >,
        joinCategoryWeights(categoryWeights: CategoryWeightVO[]): string,
        selectTopic(topic: any): void,
        selectedTopic: string,  // dummy model object for typeahead selection
        removeTopic(topic: string): void,
        switchToggleSort(sortField: string): void
    }

    export class BrowseController extends jm.common.BaseController {

        static NG_NAME: string = 'BrowseController';

        static $inject = [NGConst.$SCOPE, JMConfigConst.CATEGORIES, JourneyDAO.NG_NAME, NGConst.$LOCATION_SERVICE];

        constructor(private $scope: IBrowseScope, private categoriesConst: ICategoryVO[], private journeyService: JourneyDAO, private locationService: ng.ILocationService) {
            super($scope);

            $scope.searchFilter = new JourneySearchFilterVO();
            $scope.searchPage = new PageVO < IJourneyBaseVO >();
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

            $scope.retrieveRelevantTopics = function (val: string): ng.IPromise < string[] > {
                return journeyService.retrieveRelevantTopics({
                    tagFragment: val
                }).then(function (response) {
                    return response.data;
                });
            };

            $scope.selectTopic = function (topic: any): void {
                $scope.searchFilter.topics.push(topic.tag);
                $scope.selectedTopic = undefined;
            };

            $scope.removeTopic = function (string: string): void {
                var topics = $scope.searchFilter.topics;
                topics.splice(topics.indexOf(string), 1);
            };

            $scope.searchJourneys = function (): ng.IPromise < IPage < IJourneyBaseVO > > {
                return journeyService.searchJourneys($scope.searchFilter, $scope.searchPage.toPageRequest())
                    .then(function (response) {
                        $scope.searchPage.parseData(response.data);
                        return response.data;
                    });
            };

            $scope.switchToggleSort = function (sortField: string): void {
                $scope.searchPage.switchToggleSort(sortField);
                $scope.searchJourneys();
            };

            var queryParams = locationService.search();
            if (queryParams && queryParams["search"]) {
                $scope.searchFilter.text = queryParams["search"];
                $scope.searchJourneys();
            }
        };
    }
}
