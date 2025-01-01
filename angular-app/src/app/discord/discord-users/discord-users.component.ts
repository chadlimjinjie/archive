import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-discord-users',
  templateUrl: './discord-users.component.html',
  styleUrls: ['./discord-users.component.scss']
})
export class DiscordUsersComponent implements OnInit {

  users: any[] = [];

  constructor(
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this._sharedService.getDiscordUserList().subscribe((data: any[]) => {
      let uniqueIds = [];
      data = data.filter(element => {
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
          uniqueIds.push(element.id);
          return true;
        }
        return false;
      });
      this.users = [...this.users, ...data];
    });
  }

  sendDM(user_id: string) {
    this._sharedService.sendDiscordDM(user_id, "Hello I'm Dum-E. Chad's servant bot.").subscribe(data => {
      console.log(data);
    });
  }

  // deleteDM(user_id: string) {
  //   this._sharedService.deleteDiscordDM(user_id).subscribe(data => {
  //     console.log(data);
  //   });
  // }

}
