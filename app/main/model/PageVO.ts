module jm.main {
    'use strict';

    export interface IPage < T > {
        number: number;             // number of the current page
        numberOfElements: number;   // number of elements in current page
        size: number;               // size of the page
        content: T[];               // list of elements
        totalElements: number;      // total amount of elements
        totalPages: number;         // number of total pages
    }

    export class PageVO < T > implements IPage < T > {
        static ASC = 'ASC';
        static DESC = 'DESC';
        static CREATED_FIELD_NAME = 'created';

        number: number;
        numberOfElements: number;
        size: number;
        content: T[];
        totalElements: number;
        totalPages: number;

        sort: {sortProperty: string, sortDirection: string}    // sort instructions

        constructor() {
        }

        parseData(data: IPage < T > ) {
            this.number = data.number + 1;  // Spring pagination uses 0 index, Angular Boostrap pagination uses 1 index
            this.numberOfElements = data.numberOfElements;
            this.size = data.size;
            this.content = data.content;
            this.totalElements = data.totalElements;
            this.totalPages = data.totalPages;
        }

        toPageRequest(): Object {
            return {
                pageNumber: this.number ? this.number - 1 : 0, // Spring pagination uses 0 index, Angular Boostrap pagination uses 1 index
                pageSize: this.size || 10,
                sortDirection: this.sort ? this.sort.sortDirection : PageVO.DESC,
                sortProperty: this.sort ? this.sort.sortProperty : PageVO.CREATED_FIELD_NAME,
            }
        }
    }
}