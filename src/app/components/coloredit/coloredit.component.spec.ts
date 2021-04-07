import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoreditComponent } from './coloredit.component';

describe('ColoreditComponent', () => {
  let component: ColoreditComponent;
  let fixture: ComponentFixture<ColoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColoreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
