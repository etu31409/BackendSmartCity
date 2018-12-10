import { TestBed, async, inject } from '@angular/core/testing';

import { ConnecteDetailGuard } from './connecte-detail.guard';

describe('ConnecteDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnecteDetailGuard]
    });
  });

  it('should ...', inject([ConnecteDetailGuard], (guard: ConnecteDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
