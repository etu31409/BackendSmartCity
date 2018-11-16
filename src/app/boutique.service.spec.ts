import { TestBed } from '@angular/core/testing';

import { BoutiqueService } from './boutique.service';

describe('BoutiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoutiqueService = TestBed.get(BoutiqueService);
    expect(service).toBeTruthy();
  });
});
