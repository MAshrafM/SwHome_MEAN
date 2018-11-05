import { TestBed, inject } from '@angular/core/testing';

import { HomeRoutesService } from './home-routes.service';

describe('HomeRoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeRoutesService]
    });
  });

  it('should be created', inject([HomeRoutesService], (service: HomeRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
