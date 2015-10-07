/// <reference path="../user/IAliasBaseVO.ts" />
module jm {
    export module journey {
        export interface IJourneyBaseVO {
            _id: string;
            name: string;
            descript: string;
            alias: jm.user.IAliasBaseVO;
            hasLocation: boolean;
            location: string;
            isPublic: boolean;
            join: number;
        }
    }
}