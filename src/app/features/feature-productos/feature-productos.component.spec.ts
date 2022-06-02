import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureProductosComponent } from './feature-productos.component';

describe('FeatureProductosComponent', () => {
  let component: FeatureProductosComponent;
  let fixture: ComponentFixture<FeatureProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
