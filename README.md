ng new project
ng g component feedback
app.module.ts

To use reactive forms, import ReactiveFormsModule from the @angular/forms package and add it to your NgModule's imports array.

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { ReactiveFormsModule} from '@angular/forms';

    import { AppComponent } from './app.component';
    import { FeedbackComponent } from './feedback/feedback.component';

    @NgModule({
      declarations: [
        AppComponent,
        FeedbackComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }

app.component.html

Add feedback component using selector

    <app-feedback></app-feedback>

feedback.component.html

The FormControl is the most basic building block when using reactive forms. To register a single form control, import the FormControl class into your component and create a new instance of FormControl to save as a class property.

    <div class="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 feedbackBox">
        <h3 class="text-center">Feedback Form</h3>
        <p class="text-center">If you have a suggesssion or any feedback for us, we'd love to hear it</p>
        <div class="alert alert-success" *ngIf="msg">
          {{msg}}
        </div>
        <form [formGroup]="feedbackForm" (ngSubmit)="sendFeedback()" novalidate>

      <div class="form-group clearfix" [ngClass]="{'has-error':submitted && feedbackForm.controls['name'].errors}">
          <label for="name">Name</label>

          <input type="text" class="form-control" formControlName="name" placeholder="Write your name" required/>
          <div *ngIf="submitted && feedbackForm.controls['name'].errors" class="help-block">
              <div *ngIf="feedbackForm.controls['name'].errors.required">Name is required.</div>
          </div>
      </div>
      <div class="form-group clearfix" [ngClass]="{'has-error':submitted && feedbackForm.controls['email'].errors}">
              <label for="name">Email</label>

              <input type="text" class="form-control" formControlName="email" placeholder="Write your email" required/>
              <div *ngIf="submitted && feedbackForm.controls['email'].errors" class="help-block">
                  <div *ngIf="feedbackForm.controls['email'].errors.required">Email is required.</div>
              </div>
          </div>
      <div class="form-group clearfix" [ngClass]="{'has-error':submitted && feedbackForm.controls['category'].errors}">
          <label for="category">Which service area do you have feedback for? </label>
          <select class="form-control" name="category" formControlName="category">
            <option *ngFor="let choice of category;" [value]="choice.id">{{choice.value}}</option>
          </select>
          <div *ngIf="submitted && feedbackForm.controls['category'].errors" class="help-block">
              <div *ngIf="feedbackForm.controls['category'].errors.required">Category is required.</div>
          </div>
      </div>
      <div class="form-group clearfix" [ngClass]="{'has-error':submitted && feedbackForm.controls['msg'].errors}">
          <label for="msg">Please leave your feedback below</label>

          <textarea class="form-control" formControlName="msg" rows="5" minlength="8" maxlength="100" placeholder="Write your valuable feedback"
              required></textarea>
          <div *ngIf="submitted && feedbackForm.controls['msg'].errors" class="help-block">
              <div *ngIf="feedbackForm.controls['msg'].errors.required">Message is required.</div>
              <div *ngIf="feedbackForm.controls['msg'].errors.minlength">Message must be at least 8 characters long.</div>
              <div *ngIf="feedbackForm.controls['msg'].errors.maxlength">Message must be at most 100 characters long.</div>
          </div>

      </div>
      <div class="form-group text-right">
          <button class="btn btn-primary pull-right" type="submit" [disabled]="submitted && feedbackForm.invalid">Submit</button>
      </div>
    </form>
    </div>  
    
    
feedback.component.ts

formBuilder is used for reactive forms.  Manually Set Value for FormBuilder Control using

    this.feedbackForm.get('category').setValue(this.selectedCat);

    or

    this.feedbackForm.controls["category"].setValue(this.selectedCat);
    
this.feedbackForm.value is used to get the feedback form's value. this.selectedCat is set to this.category[0].id i.e 1 (be default design will be selected)

    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';

    @Component({
      selector: 'app-feedback',
      templateUrl: './feedback.component.html',
      styleUrls: ['./feedback.component.css']
    })
    export class FeedbackComponent implements OnInit {

      feedbackForm: FormGroup;
      selectedCat: any[];
      msg: any;
      submitted = false; 
      public category: Array<any>;

      constructor(private formBuilder: FormBuilder) { 
        this.category = [
          { id: 1, value: 'design' },
          { id: 2, value: 'functionality' },
          { id: 3, value: 'performance' }
        ];
        this.selectedCat = this.category[0].id;
      }

      ngOnInit() {
        this.createForm();
      }

      createForm() {    
        this.feedbackForm = this.formBuilder.group({
          msg: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
          category: ['', Validators.required],
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        });

        /*both will work for set value manually*/
        //this.feedbackForm.get('category').setValue(this.selectedCat);
        this.feedbackForm.controls["category"].setValue(this.selectedCat);
      }

      sendFeedback() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.feedbackForm.invalid) {
          return;
        }
        else{
          this.msg = 'Your feedback is submitted successfully';
          console.log(this.feedbackForm.value);
        }

      }

    }
