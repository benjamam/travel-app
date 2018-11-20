import { TestBed, inject } from '@angular/core/testing';

import { SuggestionApiService } from './suggestionapi.service';

describe('Suggestion.ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestionApiService]
    });
  });

  it('should be created', inject([SuggestionApiService], (service: SuggestionApiService) => {
    expect(service).toBeTruthy();
  }));
});
