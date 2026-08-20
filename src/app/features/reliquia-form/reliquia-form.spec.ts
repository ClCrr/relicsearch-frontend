import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliquiaForm } from './reliquia-form';

describe('ReliquiaForm', () => {
  let component: ReliquiaForm;
  let fixture: ComponentFixture<ReliquiaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReliquiaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ReliquiaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
