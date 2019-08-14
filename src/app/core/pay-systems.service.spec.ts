import { TestBed } from '@angular/core/testing';

import { PaySystemsService } from './pay-systems.service';

describe('PaySystemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaySystemsService = TestBed.get(PaySystemsService);
    expect(service).toBeTruthy();
  });
});
