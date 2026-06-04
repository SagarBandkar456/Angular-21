import { Component, EventEmitter, Output, Input, output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {
  @Input() userName1: string | undefined;
  onMessageSent = output<string>();

  sendData() {
    this.onMessageSent.emit("Hello from child");
  }
}
