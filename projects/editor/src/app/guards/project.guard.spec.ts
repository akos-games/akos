import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectGuard } from './project.guard';

describe('ProjectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectGuard]
    });
  });

  it('should ...', inject([ProjectGuard], (guard: ProjectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
