module jm.main {
    export interface ICategoryVO {
        id: string;
        code: string;
        name: string;
        descript: string;
    }

    export class CategoryVO implements ICategoryVO {

        id: string;
        code: string;
        name: string;
        descript: string;

        constructor(data ?: ICategoryVO) {
            this.parseData(data);
        }

        parseData(data ?: ICategoryVO) {
            this.id = data.id;
            this.code = data.code;
            this.name = data.name;
            this.descript = data.descript;
        }
    }
}
