module jm.journey {

    export interface ICategoryWeightVO {
        category: string;
        weight: number; //0-100
        //NOTE just for cloning purposes
        //categoryRef: ICategoryVO;
    }

    export class CategoryWeightVO {
        category: string;
        //categoryRef: ICategoryVO;
        weight: number;

        constructor(data ?: ICategoryWeightVO) {
            this.parseData(data);
        }

        parseData(data: ICategoryWeightVO) {
            if (data) {
                this.category = data.category;
                //NOTE: just in case it's there (cloning)
                //this.categoryRef = data.categoryRef;
                this.weight = data.weight;
            }
        }
    }
}