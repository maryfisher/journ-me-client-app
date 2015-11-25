///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\..\journey\dao\JourneyDAO.ts"/>
///<reference path="..\..\..\journey\model\JourneyBaseVO.ts"/>
///<reference path="..\..\..\journey\model\CategoryWeightVO.ts"/>
///<reference path="..\..\..\journey\model\CategoryVO.ts"/>
///<reference path="..\..\model\PageVO.ts"/>
///<reference path="..\..\..\journey\model\JourneySearchFilterVO.ts"/>
///<reference path="..\..\..\journey\model\TopicVO.ts"/>
module jm.main.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import JMConfigConst = jm.common.JMConfigConst;
    import JourneyDAO = jm.journey.JourneyDAO;
    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import CategoryWeightVO = jm.journey.CategoryWeightVO;
    import ICategoryVO = jm.journey.ICategoryVO;
    import ITopicVO = jm.journey.ITopicVO;
    import PageVO = jm.main.PageVO;
    import JourneySearchFilterVO = jm.journey.JourneySearchFilterVO;

    export interface IBrowseScope extends ng.IScope {
        searchFilter: JourneySearchFilterVO,
        categories: ICategoryVO[],
        retrieveTopics(val: string): ng.IPromise < ITopicVO[] >,
        searchJourneys(),
        searchPage: PageVO < IJourneyBaseVO >,
        joinCategoryWeights(categoryWeights: CategoryWeightVO[]): string,
        selectTopic(topic: any): void,
        selectedTopic: string,  // dummy model object for typeahead selection
        removeTopic(topic: string): void,
        switchToggleSort(sortField: string): void,
        selectCategory(category: ICategoryVO)
    }

    export class BrowseController extends jm.common.BaseController {

        static NG_NAME: string = 'BrowseController';

        static $inject: string[] = [NGConst.$SCOPE, JMConfigConst.CATEGORIES, JourneyDAO.NG_NAME, NGConst.$LOCATION_SERVICE];

        constructor(private $scope: IBrowseScope,
                    private categoriesConst: ICategoryVO[],
                    private journeyService: JourneyDAO,
                    private locationService: ng.ILocationService) {
            super($scope);

            $scope.searchFilter = new JourneySearchFilterVO();
            $scope.searchPage = new PageVO < IJourneyBaseVO >();
            $scope.categories = categoriesConst;

            $scope.joinCategoryWeights = this.joinCategoryWeights;
            $scope.retrieveTopics = this.retrieveTopics;
            $scope.selectTopic = this.selectTopic;
            $scope.removeTopic = this.removeTopic;
            $scope.searchJourneys = this.searchJourneys;
            $scope.switchToggleSort = this.switchToggleSort;
            $scope.selectCategory = this.selectCategory;

            var queryParams = locationService.search();
            if (queryParams && queryParams["search"]) {
                $scope.searchFilter.text = queryParams["search"];
                $scope.searchJourneys();
            }
        }

        selectCategory = (category: ICategoryVO) => {
            this.$scope.searchFilter.categories = [category.id];
            this.searchJourneys();
        };

        joinCategoryWeights = (categoryWeights: CategoryWeightVO[]): string => {
            if (categoryWeights && categoryWeights.length > 0) {
                var joinStr: string = categoryWeights[0].category;
                for (var i: number = 1; i < categoryWeights.length; i++) {
                    joinStr += ', ' + categoryWeights[i].category;
                }
                return joinStr;
            }
        };

        retrieveTopics = (val: string): ng.IPromise < ITopicVO[] > => {
            return this.journeyService.retrieveTopicsByFragment(val);
        };

        selectTopic = (topic: ITopicVO): void => {
            this.$scope.searchFilter.topics.push(topic.tag);
            this.$scope.selectedTopic = undefined;
        };

        removeTopic = (string: string): void => {
            var topics = this.$scope.searchFilter.topics;
            topics.splice(topics.indexOf(string), 1);
        };

        searchJourneys = () => {
            this.journeyService.searchJourneys(this.$scope.searchFilter, this.$scope.searchPage.toPageRequest())
                .then(this.searchJourneysSuccess);
        };

        searchJourneysSuccess = (data: IPage < IJourneyBaseVO >) => {
            this.$scope.searchPage.parseData(data);
        };

        switchToggleSort = (sortField: string): void => {
            this.$scope.searchPage.switchToggleSort(sortField);
            this.$scope.searchJourneys();
        };
    }
}
