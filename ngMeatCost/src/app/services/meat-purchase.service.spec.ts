import { TestBed } from '@angular/core/testing';

import { MeatPurchaseService } from './meat-purchase.service';

describe('MeatPurchaseService', () => {
  let service: MeatPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeatPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
