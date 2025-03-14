import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatDisplayComponent } from './feat-display.component';

describe('FeatDisplayComponent', () => {
  let component: FeatDisplayComponent;
  let fixture: ComponentFixture<FeatDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
