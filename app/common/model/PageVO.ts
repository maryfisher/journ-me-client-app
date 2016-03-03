module jm.common {
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

        sortProperty: string;
        sortDirection: string;

        constructor() {
            this.sortProperty = PageVO.CREATED_FIELD_NAME;
            this.sortDirection = PageVO.DESC;
        }

        parseData<U>(data: IPage < U >, callbackfn: (value: U, index: number, array: U[]) => T) {
            this.number = data.number + 1;  // Spring pagination uses 0 index, Angular Boostrap pagination uses 1 index
            this.numberOfElements = data.numberOfElements;
            this.size = data.size;
            this.content = data.content.map(callbackfn);
            this.totalElements = data.totalElements;
            this.totalPages = data.totalPages;
        }

        toPageRequest(): PageRequestVO {
            return PageRequestVO.fromPage(this);
        }

        switchToggleSort(sortField: string): void {
            this.sortProperty = sortField;
            this.sortDirection = this.sortDirection === PageVO.DESC ? PageVO.ASC : PageVO.DESC;
        }
    }
}