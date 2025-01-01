import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from './http-interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { DiscordComponent } from './discord/discord.component';
import { DiscordUsersComponent } from './discord/discord-users/discord-users.component';
import { DiscordGuildsComponent } from './discord/discord-guilds/discord-guilds.component';
import { RoomComponent } from './room/room.component';
import { DiscordGuildComponent } from './discord/discord-guild/discord-guild.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DiscordComponent,
    DiscordUsersComponent,
    DiscordGuildsComponent,
    RoomComponent,
    DiscordGuildComponent,
    RegisterComponent,
    SignInComponent,
    FeedComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
