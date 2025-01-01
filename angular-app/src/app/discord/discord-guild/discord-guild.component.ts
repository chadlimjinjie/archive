import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-discord-guild',
  templateUrl: './discord-guild.component.html',
  styleUrls: ['./discord-guild.component.scss']
})
export class DiscordGuildComponent implements OnInit {

  guildId: string = "";
  guildName: string = "";
  guildIconURL: string = "";

  constructor(
    private route: ActivatedRoute,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.guildId = this.route.snapshot.paramMap.get('id');
    console.log(this.guildId);
    this._sharedService.getDiscordGuildInfo(this.guildId).subscribe(data => {
      console.log(data);
      this.guildName = data['name'];
      this.guildIconURL = data['iconURL'];
    });
  }

}
