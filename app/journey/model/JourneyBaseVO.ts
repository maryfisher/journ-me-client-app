///<reference path="..\..\user\model\AliasBaseVO.ts"/>
module jm.journey {

    import IAliasBaseVO = jm.user.IAliasBaseVO;
    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IJourneyBaseVO {
        id: string;
        name: string;
        descript: string;
        alias: AliasBaseVO;
        hasLocation: boolean;
        location: string;
        isPublic: boolean;
        join: number;
        categoryWeights: CategoryWeightVO[];
        topics: string[];
    }

    export class JourneyBaseVO implements IJourneyBaseVO {
        id: string;
        name: string;
        descript: string;
        alias: AliasBaseVO;
        hasLocation: boolean;
        location: string;
        isPublic: boolean;
        join: number;
        categoryWeights: CategoryWeightVO[];
        topics: string[];

        isAlias: boolean;

        constructor(data ?: IJourneyBaseVO) {
            this.setDefault();
            this.categoryWeights = [];
            this.topics = [];
            this.parseJson(data);
        }

        setDefault() {
            this.hasLocation = false;
            this.join = JourneyJoinEnum.selected;
            this.isPublic = true;
            this.isAlias = false;
        }

        parseJson(data: IJourneyBaseVO) {
            if (data) {
                this.id = data.id;
                this.name = data.name;
                this.descript = data.descript;
                this.alias = this.alias ? this.alias : new AliasBaseVO(data.alias);
                this.hasLocation = data.hasLocation;
                this.location = data.location;
                this.isPublic = data.isPublic;
                this.join = data.join;
                this.categoryWeights.length = 0;
                if (data.categoryWeights) {
                    this.categoryWeights = data.categoryWeights.map(v => {
                        return new CategoryWeightVO(v)
                    });
                }
                this.topics = data.topics;
            }
        }

        invalidateData() {
            this.setDefault();
            this.id = undefined;
            this.name = undefined;
            this.descript = undefined;
            this.alias = undefined;
            this.location = undefined;
            this.categoryWeights.length = 0;
            this.topics.length = 0;
        }

        updateAlias(alias: IAliasBaseVO) {
            this.isAlias = this.alias.id === alias.id;
        }
    }
}