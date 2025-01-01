import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordGuildComponent } from './discord-guild.component';

describe('DiscordGuildComponent', () => {
  let component: DiscordGuildComponent;
  let fixture: ComponentFixture<DiscordGuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordGuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
