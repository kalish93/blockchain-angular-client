import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedElectionsComponent } from './created-elections.component';

describe('CreatedElectionsComponent', () => {
  let component: CreatedElectionsComponent;
  let fixture: ComponentFixture<CreatedElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedElectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatedElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
