import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSitesComponent } from './user-sites.component';

describe('UserSitesComponent', () => {
  let component: UserSitesComponent;
  let fixture: ComponentFixture<UserSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
