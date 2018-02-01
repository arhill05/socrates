import { TestBed, inject } from '@angular/core/testing';

import { QuestionWsService } from './question-ws.service';

describe('QuestionWsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionWsService]
    });
  });

  it('should be created', inject([QuestionWsService], (service: QuestionWsService) => {
    expect(service).toBeTruthy();
  }));
});
