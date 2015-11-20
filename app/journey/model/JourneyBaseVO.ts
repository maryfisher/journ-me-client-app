///<reference path="..\..\user\model\AliasBaseVO.ts"/>
///<reference path="..\..\main\model\CategoryWeightVO.ts"/>
module jm.journey {

    import IAliasBaseVO = jm.user.IAliasBaseVO;
    import AliasBaseVO = jm.user.AliasBaseVO;
    import CategoryWeightVO = jm.main.CategoryWeightVO;

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

        isAlias: boolean;

        constructor(data ?: IJourneyBaseVO, refs ?: Object) {
            this.setDefault();
            this.categoryWeights = [];
            this.parseJson(data, refs);
        }

        setDefault() {
            this.hasLocation = false;
            this.join = JourneyJoinEnum.selected;
            this.isPublic = true;
        }

        parseJson(data: IJourneyBaseVO, refs ?: Object) {
            if (data) {
                this.id = data.id;
                this.name = data.name;
                this.descript = data.descript;
                this.alias = this.alias ? this.alias : new AliasBaseVO(data.alias);
                this.hasLocation = data.hasLocation;
                this.location = data.location;
                this.isPublic = data.isPublic;
                this.join = data.join;
                if (data.categoryWeights) {
                    for (var i: number = 0; i < data.categoryWeights.length; i++) {
                        this.categoryWeights.push(new CategoryWeightVO(data.categoryWeights[i], refs));
                    }
                }
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
        }

        updateAlias(alias: IAliasBaseVO) {
            this.isAlias = this.alias.id === alias.id;
        }
    }
}