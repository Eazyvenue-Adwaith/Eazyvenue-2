import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnChanges {
  @Input() selectedVenueList: { subarea: string; cityname: string; statename: string; id: string }[] = [];

  faqs: { question: string; answer: string }[] = [];
  activeIndex: number | null = null;

  frequentSearches: string[] = [];
  nearMeSearches: string[] = [];
  localitySearches: string[] = [];
  relatedSearches: string[] = [];

  displayLocation: string = 'Selected Location';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedVenueList = this.parseParam(params['venue']) as { subarea: string; cityname: string; statename: string; id: string }[];
      this.updateContent();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVenueList']) {
      this.updateContent();
    }
  }

  parseParam(param: string | undefined): any {
    if (!param) return [];
    try {
      return JSON.parse(param);
    } catch {
      return [];
    }
  }

  updateContent(): void {
    this.updateDisplayLocation();
    this.updateFaqs();
    this.updateSearches();
  }

  updateDisplayLocation(): void {
    if (this.selectedVenueList.length > 0) {
      this.displayLocation = `${this.selectedVenueList[0].subarea}, ${this.selectedVenueList[0].cityname}`;
    } else {
      this.displayLocation = 'Unknown Location';
    }
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  updateFaqs(): void {
    this.faqs = [
      {
        question: `Which are the famous banquet halls in ${this.selectedVenueList[0].cityname}?`,
        answer: `Some famous banquet halls in ${this.displayLocation} include XYZ Banquet, ABC Hall, etc.`
      },
      {
        question: `How much does it cost to rent a banquet hall in ${this.selectedVenueList[0].subarea}?`,
        answer: `The cost of renting a banquet hall in ${this.displayLocation} can range from 5000 to 50000 INR, depending on the location, size, and facilities.`
      },
      // Add more dynamic FAQs here
    ];
  }

  updateSearches(): void {
    this.frequentSearches = [
      `Affordable Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `AC Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `Top Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `Best Banquet Halls with price in ${this.selectedVenueList[0].cityname}`,
      `Affordable Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `AC Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `Top Banquet Halls in ${this.selectedVenueList[0].cityname}`,
      `Best Banquet Halls with price in ${this.selectedVenueList[0].cityname}`,
      // Add more dynamic frequent searches
    ];

    // this.nearMeSearches = [
    //   'Affordable Banquet Halls near me',
    //   'Banquet Halls near me',
    //   'AC Banquet Halls near me',
    //   `Banquet Halls nearby ${this.displayLocation}`,
    //   `Banquet Halls near ${this.displayLocation}`,
    //   // Add more dynamic near me searches
    // ];

    this.localitySearches = [
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      `Banquet Halls in ${this.selectedVenueList[0].subarea}`,
      // Add more dynamic locality searches
    ];

    this.relatedSearches = [
      `Wedding Venues in ${this.selectedVenueList[0].cityname}`,
      `Marriage Halls in ${this.selectedVenueList[0].cityname}`,
      `Mantapa / Convention Hall in ${this.selectedVenueList[0].cityname}`,
      `Wedding Lawns in ${this.selectedVenueList[0].cityname}`,
      `Wedding Venues in ${this.selectedVenueList[0].cityname}`,
      `Marriage Halls in ${this.selectedVenueList[0].cityname}`,
      `Mantapa / Convention Hall in ${this.selectedVenueList[0].cityname}`,
      `Wedding Lawns in ${this.selectedVenueList[0].cityname}`,
      `Wedding Venues in ${this.selectedVenueList[0].cityname}`,
      `Marriage Halls in ${this.selectedVenueList[0].cityname}`,
      `Mantapa / Convention Hall in ${this.selectedVenueList[0].cityname}`,
      `Wedding Lawns in ${this.selectedVenueList[0].cityname}`,
      // Add more dynamic related searches
    ];
  }
  onSearchClick(): void {
    console.log('Search clicked, navigating to /banquet-halls/wedding');
    this.router.navigate(['/banquet-halls/wedding']).then(() => {
      console.log('Navigation complete');
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
