import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Response as IResponse } from '../shared/interfaces/Response';
import { SharedService } from '../shared/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any
  }
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: any[] = [];

  formData: FormData = new FormData();

  form = this.formBuilder.group({
    // post_id: new FormControl('', { initialValueIsDefault: true }),
    content: new FormControl('', { initialValueIsDefault: true }),
    // file: new FormControl(null, { initialValueIsDefault: true }),
  });

  previewFiles: any[] = [];

  address: string;

  constructor(
    private _sharedService: SharedService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this._sharedService.initWeb3();

    this._sharedService.getPosts().subscribe((data: IResponse) => {
      console.log(data);
      switch (data.status) {
        case 200:
          data.result.forEach(post => {
            post.createdAtFormat = moment(post.createdAt).fromNow();
            post.openComment = false;
            post.media.forEach(media => {
              this._sharedService.getAsset(media.filename).subscribe((data) => {
                console.log('getAsset', data);
                media.file = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
              });
            });
          });
          this.posts = [...this.posts, ...data.result];
          break;
        default:
          break;
      }
    });
  }

  createPost(event) {
    console.log('form', this.form.value);
    this.formData.append('post_id', this.form.value.post_id);
    this.formData.append('content', this.form.value.content);
    this._sharedService.createPost(this.formData).subscribe(data => {
      console.log('createPost', data);
    });
    this.form.reset();
    this.formData = new FormData();
    this.previewFiles = [];
  }

  createComment(event, post?: any) {
    console.log('form', this.form.value);
    this.form.value.post_id = post._id;
    this._sharedService.createComment(this.form.value).subscribe(data => {
      console.log('createComment', data);
    });
    this.form.reset();
  }

  handleOpenComment(event, post) {
    event.stopPropagation();
    post.openComment = !post.openComment;
  }

  handlePostClick(event, post) {
    this._router.navigate(['/post', post._id]);
  }

  handleAttachFileClick(event) {
    console.log('handleAttachFileClick', event);
  }

  handleDragOver(event) {
    console.log('dragover', event);
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add('border-dashed');
    event.target.classList.add('border-2');
    event.target.classList.add('border-sky-500');

  }

  handleDragLeave(event) {
    console.log('dragleave', event);
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('border-dashed');
    event.target.classList.remove('border-2');
    event.target.classList.remove('border-sky-500');
  }

  handleDrop(event) {
    console.log('drop', event);
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('border-dashed');
    event.target.classList.remove('border-2');
    event.target.classList.remove('border-sky-500');
    let dt = event.dataTransfer
    let files = dt.files

    for (let file of files) {
      this.formData.append('file', file);
      this.previewFiles.push({
        file: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
        fileType: file.type,
      });
    }

  }

  fileInputChange(event) {
    console.log('fileInputChange', event.target.files);
    // const file = (event.target as HTMLInputElement).files[0];

    for (let file of event.target.files) {
      this.formData.append('file', file);
      this.previewFiles.push({
        file: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
        fileType: file.type,
      });
    }

  }

  handleDeletePost(event, post) {
    this._sharedService.deletePost(post._id).subscribe(data => {
      console.log('deletePost', data);
      this.posts = this.posts.filter(function (obj) {
        return obj._id !== post._id;
      });
    });
  }

  async handleSignPost(event, post) {
    console.log('handleSignPost', event, post);
    try {
      const signature = await this._sharedService.signer._signTypedData({}, {
        Post: [
          { name: "_id", type: "string" },
          { name: "content", type: "string" },
        ]
      }, {
        _id: post._id,
        content: post.content,
      });

      console.log("Signature:", signature);
    } catch (error) {
      console.log(error);
    }

  }

  async handleVerifyPost(event, post) {
    console.log('handleVerifyPost', event, post);
    const address = ethers.utils.verifyTypedData({}, {
      Post: [
        { name: "_id", type: "string" },
        { name: "content", type: "string" },
      ]
    }, {
      _id: post._id,
      content: post.content,
    }, "0x" + post.signature);
    console.log("Verified:", address);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
