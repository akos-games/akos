import { TestBed } from '@angular/core/testing';

import { GameDescriptorService } from './game-descriptor.service';

describe('GameDescriptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameDescriptorService = TestBed.get(GameDescriptorService);
    expect(service).toBeTruthy();
  });
});
