import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { DiscordComponent } from './discord/discord.component';
import { DiscordGuildsComponent } from './discord/discord-guilds/discord-guilds.component';
import { DiscordUsersComponent } from './discord/discord-users/discord-users.component';
// import { RoomComponent } from './room/room.component';
import { DiscordGuildComponent } from './discord/discord-guild/discord-guild.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'login', component: SignInComponent },
  {
    path: 'discord', component: DiscordComponent, children: [
      // { path: '', component: DiscordGuildsComponent },
      { path: 'guilds', component: DiscordGuildsComponent },
      { path: 'users', component: DiscordUsersComponent },
      {
        path: 'guild', children: [
          { path: ':id', component: DiscordGuildComponent }
        ]
      },
      // { path: 'user',  },
    ]
  },
  {
    path: 'post', children: [
      { path: ':id', component: PostComponent }
    ]
  },
  // {
  //   path: 'room', children: [
  //     { path: ':id', component: RoomComponent }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
