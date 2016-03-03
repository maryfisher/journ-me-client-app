///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\..\journey\dao\JourneyDAO.ts"/>
///<reference path="..\..\..\journey\model\JourneyBaseVO.ts"/>
///<reference path="..\..\..\journey\model\CategoryWeightVO.ts"/>
///<reference path="..\..\..\journey\model\CategoryVO.ts"/>
///<reference path="..\..\..\common/model/PageVO.ts"/>
///<reference path="..\..\..\journey\model\JourneySearchFilterVO.ts"/>
///<reference path="..\..\..\journey\model\TopicVO.ts"/>
module jm.main.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import JMConfigConst = jm.common.JMConfigConst;
    import JourneyDAO = jm.journey.JourneyDAO;
    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import JourneyBaseVO = jm.journey.JourneyBaseVO;
    import CategoryWeightVO = jm.journey.CategoryWeightVO;
    import ICategoryVO = jm.journey.ICategoryVO;
    import ITopicVO = jm.journey.ITopicVO;
    import PageVO = jm.common.PageVO;
    import IPage = jm.common.IPage;
    import JourneySearchFilterVO = jm.journey.JourneySearchFilterVO;

    export interface IBrowseScope extends ng.IScope {
        searchFilter: JourneySearchFilterVO,
        categories: ICategoryVO[],
        selectedTopic: string,  // dummy model object for typeahead selection
        searchPage: PageVO < IJourneyBaseVO >
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

            var queryParams = locationService.search();
            if (queryParams && queryParams["search"]) {
                $scope.searchFilter.text = queryParams["search"];
                this.searchJourneys();
            }
        }

        selectCategory = (category: ICategoryVO) => {
            this.$scope.searchFilter = new JourneySearchFilterVO();
            this.$scope.searchFilter.categories.push(category.id);
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
            this.journeyService.getJourneys(this.$scope.searchPage.toPageRequest(), this.$scope.searchFilter)
                .then(this.searchJourneysSuccess);
        };

        searchJourneysSuccess = (data: PageVO < JourneyBaseVO >) => {
            //this.$scope.searchPage.parseData(data);
            this.$scope.searchPage = data;
        };

        switchToggleSort = (sortField: string): void => {
            this.$scope.searchPage.switchToggleSort(sortField);
            this.searchJourneys();
        };
    }
}
