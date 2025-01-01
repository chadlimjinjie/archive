import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ethers, providers } from "ethers";
import { SharedService } from '../shared.service';

declare global {
  interface Window {
    ethereum?: any
  }
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Output() address: string;
  signer: any;
  provider: providers.Web3Provider;

  constructor(
    private _sharedService: SharedService,
  ) { }


  ngOnInit(): void {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      (async () => {
        try {
          this.address = await this._sharedService.signer.getAddress();
        } catch (error) {
          console.log(error);
        }
      })();
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log(accounts);
        if (accounts.length > 0) {
          this.address = accounts[0];
        } else {
          this.address = null;
        }
        // console.log(this.address);
      });
    }
  }

  ngOnDestroy(): void {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.removeAllListeners();
    }
  }

  doConnect() {
    if (typeof window.ethereum !== 'undefined') {
      // console.log('MetaMask is installed!');
      this._sharedService.provider.send("eth_requestAccounts", []).then(address => {
        this.address = address[0];
      }).catch(error => {
        console.log(error);
      });
    }
  }

  doDisconnect() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.removeAllListeners();
      this.address = null;
    }
  }

}
