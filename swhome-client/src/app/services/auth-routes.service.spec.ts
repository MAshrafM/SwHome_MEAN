import { TestBed, inject } from '@angular/core/testing';

import { AuthRoutesService } from './auth-routes.service';

describe('AuthRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthRoutesService]
  }));

  it('should be created', inject([AuthRoutesService], (service: AuthRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
