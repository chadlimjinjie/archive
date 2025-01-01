import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers, providers, Signer } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  signer: any;
  provider: providers.Web3Provider;

  constructor(
    private http: HttpClient
  ) { }

  getSwitchState(id: string) {
    return this.http.get(`https://api.chadlim.tech/switch?id=${id}`);
  }

  setSwitchState(id: string, checked: boolean) {
    return this.http.put(`https://api.chadlim.tech/switch/update`, {
      id,
      checked
    });
  }

  getSwitchStateList() {
    return this.http.get('https://api.chadlim.tech/switch/list');
  }

  addSwitch(formValue: any) {
    return this.http.post('https://api.chadlim.tech/switch/add', formValue);
  }

  deleteSwitch(id: string) {
    return this.http.put('https://api.chadlim.tech/switch/delete', {
      id
    });
  }

  getDiscordGuildList() {
    return this.http.get('https://api.chadlim.tech/discord/guilds');
  }

  getDiscordUserList() {
    return this.http.get('https://api.chadlim.tech/discord/users');
  }

  sendDiscordDM(user_id: string, message: string) {
    return this.http.post('https://api.chadlim.tech/discord/send-dm', {
      id: user_id,
      message: message
    });
  }

  getDiscordGuildInfo(id: string) {
    return this.http.get(`https://api.chadlim.tech/discord/guild?id=${id}`);
  }

  // deleteDiscordDM(user_id: string) {
  //   return this.http.put('https://api.chadlim.tech/discord/delete-dm', {
  //     id: user_id
  //   });
  // }

  login(email: string, password: string, username?: string) {
    return this.http.post('https://api.chadlim.tech/api/auth/login', {
      username,
      email,
      password
    }, {
      // withCredentials: true
    });
  }

  register(formValue: any) {
    return this.http.post('https://api.chadlim.tech/api/auth/register', formValue);
  }

  verifyToken() {
    return this.http.post('https://api.chadlim.tech/api/auth/login/verify', {});
  }

  createPost(formValue: any) {
    return this.http.post('https://api.chadlim.tech/api/post/create', formValue);
  }

  getPost(id: string) {
    return this.http.get(`https://api.chadlim.tech/api/post?post_id=${id}`);
  }

  getPosts() {
    return this.http.get('https://api.chadlim.tech/api/post/list');
  }

  createComment(formValue: any) {
    return this.http.post('https://api.chadlim.tech/api/comment/create', formValue);
  }

  getComments(post_id: string) {
    return this.http.get(`https://api.chadlim.tech/api/comment/list?post_id=${post_id}`);
  }

  getAsset(asset_id: string) {
    return this.http.get(`https://api.chadlim.tech/api/asset/${asset_id}`, { responseType: 'blob' });
  }

  deletePost(id: string) {
    return this.http.post('https://api.chadlim.tech/api/post/delete', {
      post_id: id
    });
  }

  initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.provider.send("eth_requestAccounts", []).then(address => {
        console.log(address);
        return address;
      }).catch(error => {
        console.log(error);
        return error;
      });
    }
  }

}
