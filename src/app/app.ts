import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { log } from 'console';
import { single } from 'rxjs';
import { Writable } from 'stream';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor() {
    effect(() => {
      console.log('This is value', this.value());
      if (this.value() == 110) {
        this.value.set(0)
      }

      console.log("speed:-", this.speed());
      if (this.speed() > 0 && this.speed() > 80) this.color = 'green'
    })

    effect(() => {
      console.log(this.fruit());
    })
  }
  // Tut 1 interpolation
  protected readonly title = signal('Angular21');
  name: string = "Sagar Bandkar"

  // Tut 2 interpolcation and function
  email = "sagarbndkr@gmail.com";
  getName() {
    return this.name;
  }

  //Tut 3 Event binding
  count = 0;
  counter(ops: string) {
    if (ops == 'minus') this.count > 0 && this.count--
    else this.count++;

    //this.showUserName()
  }

  showUserName() {
    alert("Hello")
  }

  // Tut 4 Imp events
  handleEvent(event: string) {
    console.log(event);
  }

  //Tut 5 Property binding
  btnDisabled = false;
  inputReadonly = false;

  toggle() {
    this.btnDisabled = !this.btnDisabled;
  }

  // Tut 6 Signals
  data = 10;
  value = signal(100);

  updateData() {
    this.data++;
  }

  updateValue() {
    this.value.set(this.value() + 1)
  }

  height = signal(100);
  width = signal(20);

  area: Signal<number> = computed<number>(() => {
    return this.height() * this.width()
  });

  updateHeight() {
    this.height.set(this.height() + 10);
  }

  speed = signal(0);
  color = "black";
  fruit = signal('Apple');

  increaseSpeed() {
    this.speed.set(this.speed() + 10);
  }

  changeFruit() {
    this.fruit.set("banana");
  }

  data1: WritableSignal<string | number | boolean> = signal<string | number | boolean>("sagar");
  users: WritableSignal<string[]> = signal(['raj', 'sidhu', 'peter']);

  handleData() {
    this.data1.set("raj");
    this.users.update((item) => [...item, 'johson'])
    console.log(this.users());
  }

  // Tut 7 counter app using signals

  counter1: WritableSignal<number> = signal<number>(0);

  increment() {
    this.counter1.update((val) => val + 1);
  }

  decrement() {
    if (this.counter1() > 0) this.counter1.update((val) => val - 1);
  }

  reset() {
    this.counter1.set(0);
  }

  // Tut 8 Get and Set using signals
  value1: WritableSignal<string> = signal<string>('')

  resetValue() {
    this.value1.set("Sagar Bandkar")
  }

  setValue(val: string) {
    this.value1.set(val);
  }

  // Tut 9 Control statement
  isLogin = signal(true);
  

  handleLogin(isLogin: boolean) {
    this.isLogin.set(isLogin);
  }

  users1 = signal(["anil", "sam", "peter", "sagar"]);
  usersDetails = signal([
    { id: 1, name: "sagar", sirname: "bandkar", email: "sagarbndkr@gmail.com" },
    { id: 2, name: "sam", sirname: "singh", email: "samsingh@gmail.com" },
    { id: 3, name: "peter", sirname: "parker", email: "peterparker@gmail.com" },
    { id: 4, name: "bruce", sirname: "wayne", email: "brucewayne@gmail.com" }
  ])

  status = signal('Loading')

  // Tut 10 Two way data binding
  name1 = signal('sagar bandkar');
  age = 20;
}
