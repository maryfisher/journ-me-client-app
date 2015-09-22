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

        constructor(data ? : IJourneyBaseVO) {
            if (data) {
                this.parseData(data);
            }
        }

        //maybe put this into super class and loop over properties to set them
        parseData(data: IJourneyBaseVO) {
            this._id = data._id;
            this.name = data.name;
            this.descript = data.descript;
            this.alias = this.alias ? this.alias : data.alias;
            this.hasLocation = data.hasLocation;
            this.location = data.location;
            this.isPublic = data.isPublic;
            this.join = data.join;
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