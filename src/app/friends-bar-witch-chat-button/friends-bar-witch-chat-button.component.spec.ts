import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsBarWitchChatButtonComponent } from './friends-bar-witch-chat-button.component';

describe('FriendsBarWitchChatButtonComponent', () => {
  let component: FriendsBarWitchChatButtonComponent;
  let fixture: ComponentFixture<FriendsBarWitchChatButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsBarWitchChatButtonComponent]
    });
    fixture = TestBed.createComponent(FriendsBarWitchChatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
