import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-discord-guilds',
  templateUrl: './discord-guilds.component.html',
  styleUrls: ['./discord-guilds.component.scss']
})
export class DiscordGuildsComponent implements OnInit {

  guilds: any[] = [];

  constructor(
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this._sharedService.getDiscordGuildList().subscribe((data: any[]) => {
      this.guilds = [...this.guilds, ...data];
    });
  }

}
