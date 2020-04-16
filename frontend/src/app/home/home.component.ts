import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="jumbotron">
      <h1 class="display-4">Hello, folk!</h1>
      <p class="lead">
        This is my most recent project that I have been working on, inside the project we can find two modules, the first one is the emails, and the last one is templates. Every emails has associate a template that basically is the css styles of the email.
      </p>
      <hr class="my-4" />
      <a class="btn btn-primary btn-lg" href="/email" role="button"
        >Email Module</a
      >
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
