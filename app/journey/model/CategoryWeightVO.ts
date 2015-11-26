module jm.journey {

    export interface ICategoryWeightVO {
        category: string;
        weight: number; //0-100
        //NOTE just for cloning purposes
        categoryRef: ICategoryVO;
    }

    export class CategoryWeightVO {
        category: string;
        categoryRef: ICategoryVO;
        weight: number;

        constructor(data ?: ICategoryWeightVO, refs ?: Object) {
            this.parseData(data, refs);
        }

        parseData(data: ICategoryWeightVO, refs: Object) {
            if (data) {
                this.category = data.category;
                //NOTE: just in case it's there (cloning)
                this.categoryRef = data.categoryRef;
                this.weight = data.weight;
                if (refs) {
                    this.setCategoryRef(refs);
                }
            }
        }

        setCategoryRef(refs: Object) {
            this.categoryRef = refs[this.category];
        }
    }
}