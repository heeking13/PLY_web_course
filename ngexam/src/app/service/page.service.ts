import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  constructor() { }
  pageIndex = 1;
  pageSize = 5;
  total: number;
}
