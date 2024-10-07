import { TestBed } from '@angular/core/testing';

import { AddShowService } from './add-show.service';

describe('AddShowService', () => {
  let service: AddShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
