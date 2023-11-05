import { TestBed } from '@angular/core/testing';

import { AnteproyectosService } from './anteproyectos.service';

describe('AnteproyectosService', () => {
  let service: AnteproyectosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnteproyectosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
