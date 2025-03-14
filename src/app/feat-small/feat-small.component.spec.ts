import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSmallComponent } from './feat-small.component';

describe('FeatSmallComponent', () => {
  let component: FeatSmallComponent;
  let fixture: ComponentFixture<FeatSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatSmallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
