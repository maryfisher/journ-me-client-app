module jm.journey {

    import IAliasBaseVO = jm.user.IAliasBaseVO;

    export class JourneyBaseVO implements IJourneyBaseVO {
        _id: string;
        name: string;
        descript: string;
        alias: IAliasBaseVO;
        isAlias: boolean;
        hasLocation: boolean = false;
        location: string;
        isPublic: boolean = true;
        join: number = JourneyJoinEnum.selected;

        constructor(data ?: IJourneyBaseVO) {
            this.parseJson(data);
        }

        parseJson(data: IJourneyBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }

        invalidateData() {
            this._id = undefined;
            this.name = undefined;
            this.descript = undefined;
            this.alias = undefined;
            this.hasLocation = false;
            this.location = undefined;
            this.isPublic = true;
            this.join = JourneyJoinEnum.selected;
        }

        updateAlias(alias: IAliasBaseVO) {
            this.isAlias = this.alias._id === alias._id;
        }
    }
}