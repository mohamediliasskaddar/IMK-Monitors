import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesStatusComponent } from './sites-status.component';

describe('SitesStatusComponent', () => {
  let component: SitesStatusComponent;
  let fixture: ComponentFixture<SitesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitesStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
