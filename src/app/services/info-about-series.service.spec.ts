import { TestBed } from '@angular/core/testing';

import { InfoAboutSeriesService } from './info-about-series.service';

describe('InfoAboutSeriesService', () => {
  let service: InfoAboutSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoAboutSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
