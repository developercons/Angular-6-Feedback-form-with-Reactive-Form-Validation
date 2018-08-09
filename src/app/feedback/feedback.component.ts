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
