import { TestBed } from '@angular/core/testing';

import { HttpErrorHandleService } from './http-error-handle.service';

describe('HttpErrorHandleService', () => {
  let service: HttpErrorHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
