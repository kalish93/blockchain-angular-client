import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorizedElectionsComponent } from './categorized-elections.component';

describe('CategorizedElectionsComponent', () => {
  let component: CategorizedElectionsComponent;
  let fixture: ComponentFixture<CategorizedElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorizedElectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorizedElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
