import { TestBed } from '@angular/core/testing';

import { BasketWrapperService } from './basket.wrapper.service';

describe('Basket.WrapperService', () => {
  let service: BasketWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
