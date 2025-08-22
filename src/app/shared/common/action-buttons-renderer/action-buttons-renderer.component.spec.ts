import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsRendererComponent } from './action-buttons-renderer.component';

describe('ActionButtonsRendererComponent', () => {
  let component: ActionButtonsRendererComponent;
  let fixture: ComponentFixture<ActionButtonsRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonsRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionButtonsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
