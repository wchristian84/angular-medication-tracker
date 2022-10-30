import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Medication } from "../medications/medications.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  allResults: Medication[] = [];
  resultsChanged = new Subject<Medication[]>();

  constructor(private http: HttpClient){}

  getResults() {
    return this.allResults.slice();
  }

  onRxSearch (searchTerm: string) {
    // Modify search string to fit API reqs
    const queryTerm = searchTerm.split(' ').join('+').toLowerCase();

    // Submit query to API
    this.http.get(`https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${queryTerm}"+openfda.generic_name:"${queryTerm}"`).subscribe((response) => {
      console.log('response: ', response);
      // Empty array of any results of previous searches
      this.allResults = [];
      // Call function to temporarily store results for display
      this.saveResults(response);
    });
  }

  saveResults(response: any) {
    // Loop through relevant part of response object to create new entry for each result
    response.results[0].products.map((product: any) => {
      const { brand_name, active_ingredients} = product;

      // Get name data from API call and switch to sentence case
      let brandName = brand_name.charAt(0).toUpperCase() + brand_name.slice(1).toLowerCase();
      let genericName = active_ingredients[0].name.charAt(0).toUpperCase() + active_ingredients[0].name.slice(1).toLowerCase();

      // Get dosage or strip unnecessary formatting from dosage
      let dosage: string = '';
      if (active_ingredients[0].strength.split(' ').length == 1) {
        dosage = active_ingredients[0].strength
      }
      else {
        dosage = active_ingredients[0].strength.split(' ')[1];
      }

      // Set available values from API call after formatting
      let newProd = new Medication(
        `${brandName}(${genericName})`,
        dosage,
        '',
        '',
        '',
        '',
        '',
        '',
      );
      // Add to local array variable for results
      this.allResults.push(newProd);
      console.log('newProd: ', newProd);
    });
    // Update subscriptions that array has changed after mapping
    this.resultsChanged.next(this.allResults.slice());
  }

}
