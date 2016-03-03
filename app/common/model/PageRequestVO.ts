module jm.common {

    export class PageRequestVO {
        pageNumber: number = 0; // Spring pagination uses 0 index, Angular Boostrap pagination uses 1 index
        pageSize: number = 10;
        sortDirection: string = PageVO.DESC;
        sortProperty: string = PageVO.CREATED_FIELD_NAME;

        constructor(pageNumber ?: number, pageSize ?: number, sortDirection ?: string, sortProperty ?: string) {
            this.pageNumber = pageNumber || this.pageNumber;
            this.pageSize = pageSize || this.pageSize;
            this.sortDirection = sortDirection || this.sortDirection;
            this.sortProperty = sortProperty || this.sortProperty;
        }

        static fromPage(page: PageVO<any>): PageRequestVO {
            var r: PageRequestVO = new PageRequestVO();
            r.pageNumber = page.number ? page.number - 1 : r.pageNumber;
            r.pageSize = page.size || r.pageSize;
            r.sortDirection = page.sortDirection || r.sortDirection;
            r.sortProperty = page.sortProperty || r.sortProperty;
            return r;
        }
    }
}
