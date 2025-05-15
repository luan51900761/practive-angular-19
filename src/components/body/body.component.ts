import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-body',
  imports: [],
  standalone: true,
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  helloFromParent = input<string>();
  helloFromChild = output<number>();
  
  count = signal(0); // 👈 Signal để lưu số lần bấm

  constructor() {
    // 👇 Effect sẽ tự động emit mỗi khi count thay đổi
    effect(() => {
      const current = this.count();
      if (current > 0) {
        this.helloFromChild.emit(current);
      }
    });
  }

  sendData() {
    this.count.update(v => v + 1); // 👈 Mỗi lần gọi sẽ +1 và trigger effect
  }
}
