import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Response as IResponse } from '../shared/interfaces/Response';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postId: string = "";
  post: any;
  comments: any[] = [];

  form = this.formBuilder.group({
    post_id: new FormControl('', { initialValueIsDefault: true }),
    content: new FormControl('', { initialValueIsDefault: true }),
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    console.log(this.postId);
    this._sharedService.getPost(this.postId).subscribe((data: IResponse) => {
      console.log(data);
      switch (data.status) {
        case 200:
          this.post = data.result;
          this.post.createdAtFormat = moment(data.result.createdAt).fromNow();
          this.post.openComment = false;
          break;
        default:
          break;
      }
    });

    this._sharedService.getComments(this.postId).subscribe((data: IResponse) => {
      console.log(data);
      switch (data.status) {
        case 200:
          this.comments = [...this.comments, ...data.result];
          this.comments.forEach(comment => {
            comment.createdAtFormat = moment(comment.createdAt).fromNow();
          });
          break;
        default:
          break;
      }
    });

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

  stopPropagation(event) {
    event.stopPropagation();
  }

}
