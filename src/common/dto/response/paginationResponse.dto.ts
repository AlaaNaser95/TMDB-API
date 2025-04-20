export class PaginationResponseDto {
  readonly data: Array<any>;
  readonly count: number;

  constructor(data, count) {
    this.data = data;
    this.count = count;
  }
}
