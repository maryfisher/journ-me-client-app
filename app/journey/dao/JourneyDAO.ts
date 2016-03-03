///<reference path="..\..\common\const\ServerConst.ts"/>
///<reference path="..\..\common\const\NGConst.ts"/>
///<reference path="..\..\common/model/PageVO.ts"/>
///<reference path="..\..\common/model/PageRequestVO.ts"/>
///<reference path="..\model\JourneySearchFilterVO.ts"/>
///<reference path="..\model\JourneyDetailVO.ts"/>
///<reference path="..\model\JourneyBaseVO.ts"/>
///<reference path="..\model\TopicVO.ts"/>
module jm.journey {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;
    import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
    import IPage = jm.common.IPage;
    import PageVO = jm.common.PageVO;
    import PageRequestVO = jm.common.PageRequestVO;

    export class JourneyDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'journeyDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.path = ServerConst.JOURNEY_PATH;
        }

        returnJourney = (response: IHttpPromiseCallbackArg<IJourneyDetailVO>): IJourneyDetailVO => {
            return response.data;
        };

        returnBaseJourney = (response: IHttpPromiseCallbackArg<IJourneyBaseVO>): IJourneyBaseVO => {
            return response.data;
        };

        returnPage = (response: IHttpPromiseCallbackArg<IPage< IJourneyBaseVO >>): PageVO < IJourneyBaseVO > => {
            var page: PageVO < IJourneyBaseVO > = new PageVO < IJourneyBaseVO >();
            page.parseData(response.data, v => {
                return new JourneyBaseVO(v);
            });
            return page;
        };

        returnTopics = (response: IHttpPromiseCallbackArg<ITopicVO[]>): ITopicVO[] => {
            return response.data;
        };

        getJourney(id): IPromise < IJourneyDetailVO > {
            return this.getOne(id, this.returnJourney);
        }

        createJourney(journey: JourneyBaseVO, aliasId: string): IPromise < IJourneyBaseVO > {
            return this.create(journey, this.returnBaseJourney, {'aliasId': aliasId});
        }

        updateJourney(journey: JourneyBaseVO): IPromise < IJourneyBaseVO > {
            return this.update(journey, this.returnBaseJourney);
        }

        getJourneys(queryParams ?: PageRequestVO, searchFilter ?: JourneySearchFilterVO): IPromise < PageVO < IJourneyBaseVO > > {
            return this.makeCall(
                this.post,
                this.getQueryParams(ServerConst.JOURNEY_SEARCH_PATH, queryParams),
                searchFilter,
                this.returnPage);
        }

        retrieveTopicsByCategory(category: ICategoryVO): IPromise < ITopicVO[] > {
            return this.makeCall(
                this.get,
                ServerConst.JOURNEY_TOPIC_PATH,
                {category: category.id},
                this.returnTopics);
        }

        retrieveTopicsByFragment(fragment: string): IPromise < ITopicVO[] > {
            return this.makeCall(
                this.get,
                ServerConst.JOURNEY_TOPIC_TAG_PATH,
                {tagFragment: fragment},
                this.returnTopics);
        }
    }
}