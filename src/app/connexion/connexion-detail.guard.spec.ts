import { TestBed, async, inject } from '@angular/core/testing';

import { ConnexionDetailGuard } from './connexion-detail.guard';

describe('ConnexionDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnexionDetailGuard]
    });
  });

  it('should ...', inject([ConnexionDetailGuard], (guard: ConnexionDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
