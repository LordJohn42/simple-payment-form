import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Country } from 'src/app/interfaces/Country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  
  @Input() countries: any;

  country: Country;

  @Output() countryChanged: EventEmitter<Object> = new EventEmitter();

  constructor() { }

  ngOnInit() { 
    // this.country = this.countries[0]; this.countryChanged.emit(this.country);
  }
  ngOnAfterInit() {
    
  }

  onCountryChange(){
    this.countryChanged.emit(this.country);
  }
  
}
