import { TestBed, async, inject } from '@angular/core/testing';

import { EditerDetailGuard } from './editer-detail.guard';

describe('EditerDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditerDetailGuard]
    });
  });

  it('should ...', inject([EditerDetailGuard], (guard: EditerDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
