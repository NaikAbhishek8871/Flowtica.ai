import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioPage } from './bio-page';

describe('BioPage', () => {
  let component: BioPage;
  let fixture: ComponentFixture<BioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
