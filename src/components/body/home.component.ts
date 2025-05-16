import { CommonModule } from '@angular/common'; // Cần cho *ngIf, etc.
import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core'; // Thêm ElementRef, ViewChild, HostListener

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Đảm bảo CommonModule được import
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // Properties để hiển thị thông tin từ events
  mouseClickInfo = signal('No mouse clicks yet');
  mouseOverOutInfo = signal('No mouse over/out yet');
  mouseEnterLeaveInfo = signal('No mouse enter/leave yet');
  mouseMoveInfo = signal('Mouse position: X=0, Y=0');
  keyInfo = signal('No key pressed yet');
  enterPressedInfo = signal('');
  escapePressedInfo = signal('');
  comboKeyPressedInfo = signal('');
  formSubmitInfo = signal('Form not submitted yet');
  changeEventInfo = signal('No change event yet');
  inputEventInfo = signal('No input event yet');
  focusBlurInfo = signal('Element not focused/blurred yet');
  dragDropInfo = signal('No drag/drop action yet.');
  dragDropInfoElement = signal<Element | null>(null); // Hoặc new Element() nếu bạn có class Element riêng
  clipboardInfo = signal('No clipboard action yet.');
  windowScrollY = signal(0);
  documentClickInfo = signal('No document click detected via template binding.');
  generalMessage = signal('');

  // ViewChild để truy cập các element nếu cần (ví dụ: xóa giá trị input)
  @ViewChild('keyInput') keyInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('formNameInput') formNameInputRef!: ElementRef<HTMLInputElement>;

  constructor() { }

  // Hàm hiển thị thông báo chung, tự động ẩn sau một khoảng thời gian (ms)
  private setGeneralMessage(message: string, duration: number = 3000) {
    this.generalMessage.set(message);
    if (duration > 0) {
      setTimeout(() => this.generalMessage.set(''), duration);
    }
  }

  // 1. Mouse Event Handlers
  // Xử lý sự kiện click chuột vào thẻ H1
  onH1Click(event: MouseEvent): void {
    this.mouseClickInfo.set(`H1 Clicked! Button: ${event.button}, Target: ${(event.target as HTMLElement).tagName}`);
    this.setGeneralMessage('H1 Clicked!');
    console.log('H1 Click:', event);
  }

  // Xử lý sự kiện double click chuột vào thẻ H1
  onH1DblClick(event: MouseEvent): void {
    this.mouseClickInfo.set(`H1 Double Clicked! Target: ${(event.target as HTMLElement).tagName}`);
    this.setGeneralMessage('H1 Double Clicked!');
    console.log('H1 DblClick:', event);
  }

  // Xử lý sự kiện nhấn giữ chuột xuống trên thẻ H1
  onH1MouseDown(event: MouseEvent): void {
    this.mouseClickInfo.set(`H1 Mouse Down! Button: ${event.button}`);
    this.setGeneralMessage('H1 Mouse Down!');
    console.log('H1 MouseDown:', event);
  }

  // Xử lý sự kiện thả chuột trên thẻ H1
  onH1MouseUp(event: MouseEvent): void {
    this.mouseClickInfo.set(`H1 Mouse Up! Button: ${event.button}`);
    this.setGeneralMessage('H1 Mouse Up!');
    console.log('H1 MouseUp:', event);
  }

  // Xử lý sự kiện di chuột vào div màu xanh (mouseover)
  onDivMouseOver(event: MouseEvent): void {
    this.mouseOverOutInfo.set(`Mouse Over blue div!`);
    (event.target as HTMLElement).style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    console.log('Div MouseOver:', event);
  }

  // Xử lý sự kiện di chuột ra khỏi div màu xanh (mouseout)
  onDivMouseOut(event: MouseEvent): void {
    this.mouseOverOutInfo.set('Mouse Out blue div!');
    (event.target as HTMLElement).style.boxShadow = 'none';
    console.log('Div MouseOut:', event);
  }
  
  // Xử lý sự kiện chuột đi vào div màu xanh lá (mouseenter)
  onDivMouseEnter(event: MouseEvent): void {
    this.mouseEnterLeaveInfo.set('Mouse Enter green div!');
    (event.target as HTMLElement).style.opacity = '0.7';
    console.log('Div MouseEnter:', event);
  }

  // Xử lý sự kiện chuột rời khỏi div màu xanh lá (mouseleave)
  onDivMouseLeave(event: MouseEvent): void {
    this.mouseEnterLeaveInfo.set('Mouse Leave green div!');
    (event.target as HTMLElement).style.opacity = '1';
    console.log('Div MouseLeave:', event);
  }

  // Xử lý sự kiện di chuyển chuột trong div (mousemove)
  onDivMouseMove(event: MouseEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element.
    const y = event.clientY - rect.top;  // y position within the element.
    this.mouseMoveInfo.set(`Mouse position: X=${x.toFixed(0)}, Y=${y.toFixed(0)}`);
    // console.log('Div MouseMove:', event); // Rất nhiều log, comment lại
  }

  // 2. Keyboard Event Handlers
  // Xử lý sự kiện nhấn phím xuống trong input
  onInputKeyDown(event: KeyboardEvent): void {
    this.keyInfo.set(`KeyDown: Key='${event.key}', Code='${event.code}'`);
    console.log('KeyDown:', event);
  }

  // Xử lý sự kiện nhả phím trong input
  onInputKeyUp(event: KeyboardEvent): void {
    this.keyInfo.set(`KeyUp: Key='${event.key}', Code='${event.code}'`);
    console.log('KeyUp:', event);
    // Ví dụ: Xóa input nếu nhấn 'Delete'
    if (event.key === 'Delete') {
        (event.target as HTMLInputElement).value = '';
        this.keyInfo.set(' - Input Cleared!');
    }
  }

  // Xử lý sự kiện nhấn phím (tạo ký tự) trong input
  onInputKeyPress(event: KeyboardEvent): void {
    // event.key sẽ là ký tự được nhập (ví dụ 'a', '1', '%')
    this.keyInfo.set(`KeyPress: Key='${event.key}' (Character generated)`);
    console.log('KeyPress:', event);
  }

  // Xử lý khi nhấn phím Enter trong input
  onEnterPressed(): void {
    this.enterPressedInfo.set('Enter key was pressed!');
    this.setGeneralMessage('Enter pressed!');
    console.log('Enter pressed');
    setTimeout(() => this.enterPressedInfo.set(''), 2000);
  }

  // Xử lý khi nhấn phím Escape trong input
  onEscapePressed(): void {
    this.escapePressedInfo.set('Escape key was pressed!');
    this.setGeneralMessage('Escape pressed!');
    console.log('Escape pressed');
    setTimeout(() => this.escapePressedInfo.set(''), 2000);
  }

  // Xử lý khi nhấn tổ hợp phím Shift + Alt + T
  onShiftAltTPressed(): void {
    this.comboKeyPressedInfo.set('Shift + Alt + T was pressed!');
    this.setGeneralMessage('Shift+Alt+T pressed!');
    console.log('Shift+Alt+T pressed');
  }

  // 3. Form Event Handlers
  // Xử lý sự kiện submit form (gửi form)
  onFormSubmit(event: SubmitEvent): void {
    event.preventDefault(); // Ngăn chặn form submit theo cách truyền thống (tải lại trang)
    const nameValue = this.formNameInputRef.nativeElement.value;
    this.formSubmitInfo.set(`Form submitted! Name: ${nameValue || 'N/A'}`);
    this.setGeneralMessage('Form submitted!');
    console.log('Form Submit:', event, 'Name:', nameValue);
    this.formNameInputRef.nativeElement.value = ''; // Clear input
  }

  // Xử lý sự kiện thay đổi giá trị input (onchange)
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.changeEventInfo.set(`Change Event: Value='${target.value}' (Fired on blur if value changed)`);
    this.setGeneralMessage('Input value changed (on blur)!');
    console.log('Change Event:', event);
  }

  // Xử lý sự kiện nhập liệu vào input (oninput)
  onInputEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputEventInfo.set(`Input Event: Value='${target.value}' (Fired on every keystroke)`);
    // console.log('Input Event:', event); // Rất nhiều log
  }
// Xử lý sự kiện focus vào input
  onInputFocus(event: FocusEvent): void {
    this.focusBlurInfo.set('Element focused!');
    (event.target as HTMLElement).style.borderColor = 'blue';
    this.setGeneralMessage('Input focused!');
    console.log('Focus Event:', event);
  }

  // Xử lý sự kiện blur (mất focus) khỏi input
  onInputBlur(event: FocusEvent): void {
    this.focusBlurInfo.set('Element blurred!');
    (event.target as HTMLElement).style.borderColor = ''; // Reset border
    this.setGeneralMessage('Input blurred!');
    console.log('Blur Event:', event);
  }

  // 4. Drag & Drop Event Handlers
  // Xử lý bắt đầu kéo phần tử (dragstart)
  onDragStart(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', (event.target as HTMLElement).outerHTML);
      (event.target as HTMLElement).style.opacity = '0.5';
    }
    this.dragDropInfoElement.set(event.target as Element);
    this.setGeneralMessage('Drag Started!');
    console.log('DragStart:', event);
  }

  // Xử lý kết thúc kéo phần tử (dragend)
  onDragEnd(event: DragEvent): void {
    (event.target as HTMLElement).style.opacity = '1';
    console.log('Element:', this.dragDropInfoElement);
    this.setGeneralMessage('Drag Ended.');
    console.log('DragEnd:', event);
  }

  // Xử lý khi kéo phần tử qua vùng drop (dragover)
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Quan trọng! Cho phép drop.
    (event.target as HTMLElement).style.backgroundColor = '#e0e0e0';
    // this.dragDropInfo = 'Dragging Over Drop Zone...'; // Gây nhiều update
    // console.log('DragOver:', event); // Rất nhiều log
  }

  // Xử lý khi kéo phần tử ra khỏi vùng drop (dragleave)
  onDragLeave(event: DragEvent): void {
    (event.target as HTMLElement).style.backgroundColor = 'red'; // Reset
    this.dragDropInfo.set('Dragged Out of Drop Zone.');
    this.setGeneralMessage('Dragged out of drop zone.');
    console.log('DragLeave:', event);
  }

  // Xử lý khi thả phần tử vào vùng drop (drop)
  onDrop(event: DragEvent): void {
    event.preventDefault(); // Quan trọng!
    const dropTarget = event.target as HTMLElement;
    dropTarget.style.backgroundColor = ''; // Reset
    if (event.dataTransfer) {
      const data = event.dataTransfer.getData('text/plain');
      // Thay thế chính phần tử bị drop bằng phần tử được kéo (HTML)
      dropTarget.insertAdjacentHTML('afterend', data);
      // Lấy phần tử vừa được thêm vào (giả sử chỉ có 1 phần tử ngoài cùng)
      const parent = dropTarget.parentElement;
      let newElem: HTMLElement | null = null;
      if (parent) {
        newElem = dropTarget.nextElementSibling as HTMLElement;
        if (newElem) {
          newElem.setAttribute('draggable', 'true');
          // Gắn lại event native (không phải Angular binding)
          newElem.ondragstart = (e) => this.onDragStart(e as DragEvent);
          newElem.ondragend = (e) => this.onDragEnd(e as DragEvent);
          newElem.ondragover = (e) => this.onDragOver(e as DragEvent);
          newElem.ondrop = (e) => this.onDrop(e as DragEvent);
          newElem.ondragleave = (e) => this.onDragLeave(e as DragEvent);
        }
      }
      dropTarget.remove();
      this.dragDropInfo.set(`Dropped: '${data}' onto drop zone!`);
    }
    this.setGeneralMessage('Item Dropped!');
    console.log('Drop:', event);
  }

  // 5. Clipboard Event Handlers
  // Xử lý sự kiện copy
  onCopy(event: ClipboardEvent): void {
    this.clipboardInfo.set('Text Copied!');
    if (event.clipboardData) {
      // Bạn có thể sửa đổi dữ liệu được copy ở đây nếu muốn
      // event.clipboardData.setData('text/plain', 'Modified: ' + window.getSelection()?.toString());
      // event.preventDefault(); // Nếu bạn sửa đổi dữ liệu
      console.log('Copied text:', window.getSelection()?.toString());
    }
    this.setGeneralMessage('Text Copied!');
    console.log('Copy Event:', event);
  }

  // Xử lý sự kiện cut
  onCut(event: ClipboardEvent): void {
    this.clipboardInfo.set('Text Cut!');
    this.setGeneralMessage('Text Cut!');
    console.log('Cut Event:', event);
  }

  // Xử lý sự kiện paste
  onPaste(event: ClipboardEvent): void {
    if (event.clipboardData) {
      const pastedText = event.clipboardData.getData('text/plain');
      this.clipboardInfo.set(`Text Pasted: "${pastedText}"`);
    } else {
      this.clipboardInfo.set('Text Pasted (unable to read data directly without permissions/focus).');
    }
    this.setGeneralMessage('Text Pasted!');
    console.log('Paste Event:', event);
  }

  // 6. Window/Document Event Handlers (Template-bound)
  // Xử lý sự kiện cuộn cửa sổ (scroll) trong template
  onWindowScroll(event: Event): void {
    // event.target ở đây thường là document
    this.windowScrollY.set(window.scrollY);
    // console.log('Window Scroll (from template binding):', event, 'ScrollY:', this.windowScrollY);
  }

  // Xử lý sự kiện click trên document (template binding)
  onDocumentClick(event: MouseEvent): void {
    // Sẽ chỉ bắt được click bên trong div mà (document:click) được gắn vào.
    this.documentClickInfo.set(`Document Clicked (within bounded div)! Target: ${(event.target as HTMLElement).tagName}`);
    this.setGeneralMessage('Document clicked (within div)!');
    console.log('Document Click (from template binding):', event);
  }

  // 6.1 Window/Document Event Handlers (Sử dụng @HostListener)
  // Xử lý sự kiện resize cửa sổ (HostListener)
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const w = (event.target as Window).innerWidth;
    const h = (event.target as Window).innerHeight;
    this.setGeneralMessage(`Window Resized: ${w}x${h}`, 0); // 0 for no auto-clear
    console.log('Window Resize (HostListener):', w, h);
  }

  // Xử lý sự kiện nhấn Ctrl+S trên document (HostListener)
  @HostListener('document:keydown.control.s', ['$event'])
  onCtrlS(event: KeyboardEvent) {
    event.preventDefault(); // Ngăn hành động lưu trang mặc định của trình duyệt
    this.setGeneralMessage('Ctrl+S pressed! (Action prevented)');
    console.log('Ctrl+S pressed (HostListener)');
  }
}