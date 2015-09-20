module jm {
    export module user {

        export class AliasBaseVO implements IAliasBaseVO {
            _id: string;
            name: string;
            image: string;

            constructor(data ? : IAliasBaseVO) {
                if (data) {
                    this.parseData(data);
                }
            }

            //maybe put this into super class and loop over properties to set them
            parseData(data: IAliasBaseVO) {
                this._id = data._id;
                this.name = data.name;
                this.image = data.image ? data.image : this.image;
            }

            invalidateData() {
                this._id = undefined;
                this.name = undefined;
                this.image = undefined;
            }
        }
    }
}