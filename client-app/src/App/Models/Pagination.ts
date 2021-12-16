export default interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    data: T;
    pagination: Pagination;

    constructor(pagination: Pagination, data : T) {
        this.data = data;
        this.pagination = pagination;
        
    }
}

export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, sizeNumber = 2) {
        this.pageNumber = pageNumber;
        this.pageSize = sizeNumber;
    }
}