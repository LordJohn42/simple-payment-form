import { Component, OnInit, ViewChild } from '@angular/core';
import { COUNTRIES } from './country/mock-countries';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryComponent } from './country/country.component';
import { Country } from '../interfaces/Country';
import { MethodComponent } from './method/method.component';
import { PaySystemsService } from '../core/pay-systems.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from '../core/country.service';


@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent implements OnInit {
  // Mock
  countries = COUNTRIES;
  // ViewChild for Country component
  @ViewChild(CountryComponent, {static: false}) countryComponent: CountryComponent;
  
  closeResult: Object;

  @ViewChild(MethodComponent, {static: false}) methodComponent: MethodComponent;

  typeOfPaymentForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    method: new FormControl('', [Validators.required]),
  });

  paymentForm = new FormGroup({
    amount: new FormControl({value: 100, disabled: true}, Validators.required),
    name: new FormControl('', [Validators.required]),
    // Visa only
    cardNumber: new FormControl('', [Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?)$')]),
    expYear: new FormControl('1', [Validators.required]),
    expMonth: new FormControl('2018', Validators.required),
    cvc: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3,3}$')])
  });
  

  // Dirty hack
  country: any
  methods: any
  method: any
  showPaymentForm: boolean
  locale: Object

  constructor(
    private paymentService: PaySystemsService,
    private modalService: NgbModal,
    private countryService: CountryService) { }
    

  ngOnInit() {
    const locale = navigator.language.slice(3);
    console.log(`Try to find country by locale: ${locale}`);
    this.countryService.getCountryByCode(locale).subscribe((data:any) => {
      data.code = data.alpha2Code; this.countries.push(data)
      this.countryComponent.country = data;
      this.onCountrySelect(data);
    });
    // this.countryService.getCountryByCode(locale).subscribe((data:any) => this.countries.push(data));
    
  }
  ngAfterViewInit(){ }

  onCountrySelect(country: Country){
    console.log(country);
    // Type checkedconsole.log(method);
    this.methodComponent.selectedMethod = null;
    this.country = country;
    this.typeOfPaymentForm.patchValue({method: ''}, {emitEvent: true, onlySelf: false});

    // No update to form. Dirty hack
    this.typeOfPaymentForm.patchValue({country: country.code}, {emitEvent: true, onlySelf: false});
    this.loadPaymentsMethods();
  }
  onMethodSelect(method: any){
    this.typeOfPaymentForm.patchValue({method: method}, {emitEvent: true, onlySelf:false});
    console.log(this.typeOfPaymentForm);
  }

  loadPaymentsMethods(){
    this.paymentService.getPayMethods({country_code: this.country.code}).subscribe((data: any) => this.methods = data);
  }
  
  onSubmit(payForm){
    // this.open()
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'fade'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.paymentForm.reset();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  showFormStatus(){
    console.log(this.paymentForm);
  }


}
