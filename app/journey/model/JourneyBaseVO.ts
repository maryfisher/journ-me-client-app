///<reference path="..\..\user\model\AliasBaseVO.ts"/>
module jm.journey {

    import IAliasBaseVO = jm.user.IAliasBaseVO;
    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IJourneyBaseVO {
        id: string;
        name: string;
        descript: string;
        alias: IAliasBaseVO;
        hasLocation: boolean;
        location: string;
        isPublic: boolean;
        join: number;
    }

    export class JourneyBaseVO implements IJourneyBaseVO {
        id: string;
        name: string;
        descript: string;
        alias: IAliasBaseVO;
        isAlias: boolean;
        hasLocation: boolean;
        location: string;
        isPublic: boolean;
        join: number;

        constructor(data ?: IJourneyBaseVO) {
            this.hasLocation = false;
            this.join = JourneyJoinEnum.selected;
            this.isPublic = true;
            this.parseJson(data);
        }

        parseJson(data: IJourneyBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.alias = new AliasBaseVO(data.alias);
            }
        }

        invalidateData() {
            this.id = undefined;
            this.name = undefined;
            this.descript = undefined;
            this.alias = undefined;
            this.hasLocation = false;
            this.location = undefined;
            this.isPublic = true;
            this.join = JourneyJoinEnum.selected;
        }

        updateAlias(alias: IAliasBaseVO) {
            this.isAlias = this.alias.id === alias.id;
        }
    }
}