import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPaeComponent } from './login-pae.component';

describe('LoginPaeComponent', () => {
  let component: LoginPaeComponent;
  let fixture: ComponentFixture<LoginPaeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPaeComponent]
    });
    fixture = TestBed.createComponent(LoginPaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
