import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/interfaces/Country';
import { Method } from 'src/app/interfaces/method';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.scss']
})
export class MethodComponent implements OnInit {

  @Input() country : Country;
  @Input() methods: [];
  selectedMethod: any;
  @Output() paymentMethod: EventEmitter<Object> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onChangePaymentMethod(method: Object) {
    this.paymentMethod.emit(this.selectedMethod);
  }
}
