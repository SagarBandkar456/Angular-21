import { Component, computed, effect, OnInit, Signal, signal, ViewChild, viewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Child } from './child/child';
import { DisplayCount } from "./display-count/display-count";
import { ControlCount } from './control-count/control-count';
import { CommonModule, NgFor } from '@angular/common';
import { TrimTextPipe } from './pipe/trim-text-pipe';
import { UserDetails } from './user-details/user-details';
import { log } from 'console';
import { of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ProductService } from './services/product-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, Child, DisplayCount, ControlCount, CommonModule, TrimTextPipe, UserDetails, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constructor(private productService: ProductService) {
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

  ngOnInit() {
    this.productService.getProduct().subscribe((data) => {
      console.log(data);
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

  // Tut 11 Getter and Setter for signals
  userName = signal('Sagar Bandkar')
  userData = signal({
    college: 'VIT',
    email: 'sagarbndkr@gmail.com'
  })

  get uName() {
    return this.userName()
  }

  set uName(val: string) {
    this.userName.set(val)
  }

  get userCollege() {
    return this.userData().college;
  }

  set userCollege(val: string) {
    this.userData.update((item) => ({...item, college: val}));
  }

  // Tut 12 ToDo list with signals
  task = signal([{ id: 0, title: 'Team lunch', completed: false }])


  // Tut 13 Parent to Child 
  userName1 = signal("Sagar Bandkar")

  // Tut 13 Child to Parent
  parentData = signal('');

  handleData1(message: string) {
    this.parentData.set(message);
  }

  // Tut 14 Pipes

  title1 = "Sagar Bandkar";
  name2 = signal("");

  date = "02-06-2026";
  amount = "25000";
  mobile = "samsung";

  userDetail = signal({ name: 'sagar', age: 32, email: 'sagarbndkr@gmail.com' });

  title2 = signal("hello world");

  // Tut 15 Dynamic component
  @ViewChild("container", { read: ViewContainerRef })
  container: ViewContainerRef | undefined;

  async loadUserDetails() {
    this.container?.clear();
    const { UserDetails } = await import('./user-details/user-details');
    this.container?.createComponent(UserDetails);
  }

  // Tut 16 Reactive form

  email1 = new FormControl("");
  password = new FormControl("");

  login() {
    console.log(this.email1.value + " " + this.password.value);
  }

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  get getName1() {
    return this.loginForm.get('name');
  }

  get getEmail() {
    return this.loginForm.get('email');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }

  handleProfile() {
    console.log(this.loginForm.value);
  }

  // Tut 16 Template driven form

  addUser(data: NgForm) {
    console.log(data);

  }

  // Tut 17 RXJS operator
  rxjsSubscription = of(1, 2, 3, 4, 5).pipe(
    map((a: number) => a * 1000)
  ).subscribe(console.log);


  filter = of(1, 2, 3, 4, 5).pipe(
    filter(a => a % 2 == 0)
  ).subscribe(console.log);

  tap$ = of('Angualr', 'react', 'vue').pipe(
    tap(d => console.log(tap))).subscribe(console.log);





}

