import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebsiteComponent } from './add-website.component';

describe('AddWebsiteComponent', () => {
  let component: AddWebsiteComponent;
  let fixture: ComponentFixture<AddWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWebsiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
