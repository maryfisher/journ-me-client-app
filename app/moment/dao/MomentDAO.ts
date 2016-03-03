///<reference path="..\..\common\model\PageRequestVO.ts"/>
///<reference path="..\..\common\model\PageVO.ts"/>
///<reference path="..\..\common\const\ServerConst.ts"/>
///<reference path="..\..\common\const\NGConst.ts"/>
module jm.moment {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;
    import IPage = jm.common.IPage;
    import PageVO = jm.common.PageVO;
    import PageRequestVO = jm.common.PageRequestVO;
    import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;

    export class MomentDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'momentDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.path = ServerConst.MOMENT_PATH;
        }

        returnMoment = (response): IMomentDetailVO => {
            return response.data;
        };

        returnBaseMoment = (response): IMomentBaseVO => {
            return response.data;
        };

        returnPage = (response: IHttpPromiseCallbackArg<IPage< IMomentBaseVO >>): PageVO < IMomentBaseVO > => {
            var page: PageVO < IMomentBaseVO > = new PageVO < IMomentBaseVO >();
            page.parseData(response.data, v => {
                return new MomentBaseVO(v);
            });
            return page;
        };

        getMoment(id: string): IPromise < IMomentDetailVO > {
            return this.getOne(id, this.returnMoment);
        }

        createMoment(moment: MomentBaseVO, aliasId: string, journeyId: string): IPromise < IMomentBaseVO > {
            return this.create(moment, this.returnBaseMoment, {'aliasId': aliasId, 'journeyId': journeyId});
        }

        updateMoment(moment: MomentBaseVO): IPromise < IMomentBaseVO > {
            return this.update(moment, this.returnBaseMoment);
        }

        getMoments(queryParams ?: PageRequestVO, searchFilter ?: MomentSearchFilterVO): IPromise < PageVO < IMomentBaseVO > > {
            return this.makeCall(
                this.post,
                this.getQueryParams(ServerConst.MOMENT_SEARCH_PATH, queryParams),
                searchFilter,
                this.returnPage);
        }
    }
}