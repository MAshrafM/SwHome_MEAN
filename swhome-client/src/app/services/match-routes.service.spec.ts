import { TestBed, inject } from '@angular/core/testing';

import { MatchRoutesService } from './match-routes.service';

describe('MatchRoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchRoutesService]
    });
  });

  it('should be created', inject([MatchRoutesService], (service: MatchRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
