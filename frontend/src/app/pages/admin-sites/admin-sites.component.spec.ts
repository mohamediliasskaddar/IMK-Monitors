import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSitesComponent } from './admin-sites.component';

describe('AdminSitesComponent', () => {
  let component: AdminSitesComponent;
  let fixture: ComponentFixture<AdminSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
