import { Component, input, output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import {  HomeComponent } from '../components/body/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practive-angular-19';
  hello = 'hello world by old way';
  helloSignal = signal('hello world by signal');
  helloSignalFromChild = signal(0);
  childSayhello = (event: number) => {
    this.helloSignalFromChild.set(event);
  };
}
