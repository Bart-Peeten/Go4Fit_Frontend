import { TestBed } from '@angular/core/testing';

import { AuthActivatorService } from './auth-activator.service';

describe('AuthActivatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthActivatorService = TestBed.get(AuthActivatorService);
    expect(service).toBeTruthy();
  });
});
