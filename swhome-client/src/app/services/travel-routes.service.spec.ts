import { TestBed, inject } from '@angular/core/testing';

import { TravelRoutesService } from './travel-routes.service';

describe('TravelRoutesService', () => {
  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [TravelRoutesService]
    }));
  }

  it('should be created', inject([TravelRoutesService], (service: TravelRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
