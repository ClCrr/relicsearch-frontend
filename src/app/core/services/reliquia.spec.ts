import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ReliquiaService } from './reliquia';

describe('ReliquiaService', () => {
  let service: ReliquiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ReliquiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});