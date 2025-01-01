import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordGuildsComponent } from './discord-guilds.component';

describe('DiscordGuildsComponent', () => {
  let component: DiscordGuildsComponent;
  let fixture: ComponentFixture<DiscordGuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordGuildsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordGuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
