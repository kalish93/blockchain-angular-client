import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionHomeComponent } from './election-home.component';

describe('ElectionHomeComponent', () => {
  let component: ElectionHomeComponent;
  let fixture: ComponentFixture<ElectionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
