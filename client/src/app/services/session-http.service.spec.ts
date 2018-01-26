import { TestBed, inject } from '@angular/core/testing';

import { SessionHttpService } from './session-http.service';

describe('SessionHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionHttpService]
    });
  });

  it('should be created', inject([SessionHttpService], (service: SessionHttpService) => {
    expect(service).toBeTruthy();
  }));
});
