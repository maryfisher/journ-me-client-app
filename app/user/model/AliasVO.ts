module jm {
    export module user {

        import IAliasVO = jm.user.IAliasVO;

        export class AliasVO implements IAliasVO {
            _id: string;
            journeys: any[];
            followedJourneys: any[];
            name: string;
            image: string;

            constructor(data ? : IAliasVO) {
                if (data) {
                    this.parseData(data);
                }
            }

            //maybe put this into super class and loop over properties to set them
            parseData(data: IAliasVO) {
                this._id = data._id;
                this.journeys = data.journeys;
                this.followedJourneys = data.followedJourneys;
                this.name = data.name;
                this.image = data.image ? data.image : this.image;
            }

            invalidateData() {
                this._id = undefined;
                this.journeys = undefined;
                this.followedJourneys = undefined;
                this.name = undefined;
                this.image = undefined;
            }
        }
    }
}