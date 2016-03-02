///<reference path="..\..\..\common\const\JMConfigConst.ts"/>
///<reference path="..\..\..\common\const\NGConst.ts"/>
///<reference path="..\..\..\common\util\RouteUtil.ts"/>
///<reference path="..\..\model\CategoryVO.ts"/>
///<reference path="..\..\model\CategoryWeightVO.ts"/>
///<reference path="..\..\model\TopicVO.ts"/>
///<reference path="..\..\dao\JourneyDAO.ts"/>
module jm.journey.ctrl {
    'use strict';

    import RouteUtil = jm.common.RouteUtil;
    import NGConst = jm.common.NGConst;
    import JMConfigConst = jm.common.JMConfigConst;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;

    export interface IJourneyFormScope extends jm.common.ctrl.IBaseModalInstanceScope {
        hasJourney: boolean;
        journey: JourneyBaseVO;
        journeyForm: ng.IFormController;
        save();
        missingCategories: ICategoryVO[];
        selectedCategory: string;
        selectCategory (cat: ICategoryVO);
        deleteCategory (categoryWeight: CategoryWeightVO);
        selectTopic(topic: any): void;
        selectedTopic: string;  // dummy model object for typeahead selection
        removeTopic(topic: string): void;
        topics: ITopicVO[];
    }

    export class JourneyEditFormController extends jm.common.ctrl.BaseModalInstanceController {

        static $inject: string[] = [NGConst.$SCOPE, NGConst.$MODAL_INSTANCE, JourneyModel.NG_NAME, RouteUtil.NG_NAME,
            JMConfigConst.CATEGORIES, JourneyDAO.NG_NAME];
        static NG_NAME: string = 'JourneyEditFormController';

        constructor(private $scope: IJourneyFormScope,
                    $modalInstance: IModalServiceInstance,
                    private journeyModel: JourneyModel,
                    private routeUtil: RouteUtil,
                    private categories: ICategoryVO[],
                    private journeyService: JourneyDAO) {
            super($scope, $modalInstance);

            $scope.hasJourney = (!!$scope.journey);

            if ($scope.hasJourney) {
                $scope.journey = new JourneyBaseVO($scope.journey);
                $scope.missingCategories = [];
                for (var i = 0; i < this.categories.length; i++) {
                    var add: boolean = true;
                    for (var j = 0; j < $scope.journey.categoryWeights.length; j++) {
                        if ($scope.journey.categoryWeights[j].category === this.categories[i].id) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        $scope.missingCategories.push(this.categories[i]);
                    }
                }
            } else {
                $scope.journey = new JourneyBaseVO();
                $scope.missingCategories = this.categories.slice();
            }

            $scope.topics = [];

            this.addScopeMethods('save', 'selectCategory', 'deleteCategory', 'selectTopic', 'removeTopic', 'createTopic');
        }

        selectCategory = (cat: ICategoryVO) => {
            var weight: CategoryWeightVO = new CategoryWeightVO();
            weight.category = cat.id;
            weight.weight = 100 / (this.$scope.journey.categoryWeights.length + 1);
            this.adjustWeights(weight.weight);
            this.$scope.journey.categoryWeights.push(weight);
            this.$scope.missingCategories.splice(this.$scope.missingCategories.indexOf(cat), 1);
            this.$scope.selectedCategory = '';
            this.journeyService.retrieveTopicsByCategory(cat).then(this.addTopics);
        };

        addTopics = (data: ITopicVO[]) => {
            //TODO watch out for doubles
            this.$scope.topics = this.$scope.topics.concat(data);
        };

        deleteCategory = (categoryWeight: CategoryWeightVO) => {
            this.$scope.journey.categoryWeights.splice(this.$scope.journey.categoryWeights.indexOf(categoryWeight), 1);
            this.adjustWeights(100 / (this.$scope.journey.categoryWeights.length));
            this.$scope.missingCategories.push(this.journeyModel.getCategory(categoryWeight));
            //TODO remove topics - but which ones?
        };

        adjustWeights(weight: number) {
            for (var i: number = 0; i < this.$scope.journey.categoryWeights.length; i++) {
                this.$scope.journey.categoryWeights[i].weight = weight;
            }
        }

        selectTopic = (topic: ITopicVO): void => {
            this.$scope.journey.topics.push(topic.id);
            this.$scope.selectedTopic = undefined;
        };

        createTopic = (topicName: string): void => {
            this.$scope.journey.topics.push(topicName);
            this.$scope.selectedTopic = undefined;
        };

        removeTopic = (string: string): void => {
            var topics = this.$scope.journey.topics;
            topics.splice(topics.indexOf(string), 1);
        };

        save = () => {
            if (this.$scope.journeyForm.$valid) {
                if (!this.$scope.hasJourney) {
                    this.journeyModel.createJourney(this.$scope.journey).then(this.saveSuccess);
                } else {
                    this.journeyModel.updateJourney(this.$scope.journey).then(this.close);
                }
            }
        };

        saveSuccess = () => {
            this.routeUtil.redirectToJourney(this.journeyModel.getCurrentJourney().id);
            this.close();
        };
    }
}