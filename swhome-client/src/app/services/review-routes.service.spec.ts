import { TestBed, inject } from '@angular/core/testing';

import { ReviewRoutesService } from './review-routes.service';

describe('ReviewRoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewRoutesService]
    })
  });

  it('should be created', inject([ReviewRoutesService], (service: ReviewRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
