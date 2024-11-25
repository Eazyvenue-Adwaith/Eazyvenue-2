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
  showMore: boolean = false;

  frequentSearches: string[] = [];
  nearMeSearches: string[] = [];
  localitySearches: string[] = [];
  relatedSearches: string[] = [];

  displayLocation: string = 'Selected Location';
  title: string = 'Banquet Halls';

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
    this.updateTitle();
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

  updateTitle(): void {
    if (this.selectedVenueList.length > 0) {
      const { subarea, cityname } = this.selectedVenueList[0];
      this.title = `Banquet Halls in ${subarea}, ${cityname}`; 
    } else {
      this.title = 'Banquet Halls';
    }
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore; // Toggle the showMore state
  }

  updateFaqs(): void {
    this.faqs = [
        {
          question: `What are the different banquet halls available in ${this.selectedVenueList[0].subarea}?`,
          answer: `${this.selectedVenueList[0].subarea} has a variety of banquet halls to suit different needs and budgets, including venues such as The Leela, Courtyard by Marriott, The Lalit, Novotel Mumbai, Grand Hyatt, The Orchid, etc. These halls vary in size, amenities, and services offered.`
        },
        {
          question: `What is the seating capacity range of the banquet halls in ${this.selectedVenueList[0].subarea}?`,
          answer: `Banquet halls in ${this.selectedVenueList[0].subarea} range from small venues that can accommodate a few guests to large halls that can host up to 1000 or more guests, depending on the specific venue.`
        },
        {
          question: `What is the cost of booking a banquet hall in ${this.selectedVenueList[0].subarea}?`,
          answer: `The cost varies based on the venue, date, time, and duration of the event. Smaller halls may charge less, while larger, premium venues may charge more. Packages often include basic amenities, catering, and decoration, but additional services may incur extra costs.`
        },
        {
          question: `What types of events can be hosted at banquet halls in ${this.selectedVenueList[0].subarea}?`,
          answer: `The banquet halls in ${this.selectedVenueList[0].subarea} are versatile and can accommodate a range of events, such as weddings, receptions, corporate events, conferences, seminars, birthday parties, anniversaries, product launches, and other social or cultural gatherings.`
        },
        {
          question: `What are the parking facilities like at banquet halls in ${this.selectedVenueList[0].subarea}?`,
          answer: `Most banquet halls in ${this.selectedVenueList[0].subarea} offer parking facilities, including valet parking services. However, the availability and capacity of parking may vary from one venue to another.`
        },
        {
          question: `Can I visit multiple banquet halls in ${this.selectedVenueList[0].subarea} to compare them?`,
          answer: `Yes, you can schedule visits to multiple banquet halls in ${this.selectedVenueList[0].subarea} to compare facilities, pricing, and other aspects. It’s recommended to call early and book an appointment to ensure the availability of our venue managers, or you can call us at +91 9372091300.`
        },
        {
          question: `How can I check availability and make a reservation in ${this.selectedVenueList[0].subarea}?`,
          answer: `You can check availability and make reservations directly through our website. It's advisable to book at least a few months in advance, especially for popular venues or peak seasons.`
        },
        {
          question: `What is the cancellation policy for banquet halls in ${this.selectedVenueList[0].subarea}?`,
          answer: `The cancellation policy varies by venue. Generally, halls require a deposit to secure the booking, which may be partially or fully refundable if canceled within a specified period. Please check with each hall for their specific cancellation terms.`
        },
        {
          question: `What safety and hygiene measures are in place at banquet halls in ${this.selectedVenueList[0].subarea}?`,
          answer: `Most banquet halls in ${this.selectedVenueList[0].subarea} follow stringent safety and hygiene protocols, including regular sanitization, temperature checks, social distancing measures, fire safety equipment, CCTV surveillance, and on-site security staff.`
        },
        {
          question: `Are there banquet halls near public transportation hubs in ${this.selectedVenueList[0].subarea}?`,
          answer: `Yes, many banquet halls in ${this.selectedVenueList[0].subarea} are conveniently located near major public transportation hubs, including railway stations, metro stations, and bus stops.`
        },
        {
          question: `What catering options are available at banquet halls in ${this.selectedVenueList[0].subarea}?`,
          answer: `Banquet halls in ${this.selectedVenueList[0].subarea} generally offer in-house catering with diverse cuisine options, including Indian, Continental, Chinese, Italian, and other international menus. Some venues also allow external caterers, subject to their policies and additional fees.`
        },
        {
          question: `Do banquet halls in ${this.selectedVenueList[0].subarea} provide decoration services?`,
          answer: `Many banquet halls in ${this.selectedVenueList[0].subarea} offer in-house decoration services or have tie-ups with professional decorators to help customize the venue to your theme or style. Guests can also hire their own decorators, but this might require prior approval from the venue.`
        },
        {
          question: `Are there any noise restrictions or event curfews in ${this.selectedVenueList[0].subarea}?`,
          answer: `Yes, according to local regulations, events must generally conclude by 11:00 PM to comply with noise control guidelines. This applies to most venues in ${this.selectedVenueList[0].subarea}; however, some may have their own specific rules.`
        },
        {
          question: `Are there hotels nearby for guests who need accommodation in ${this.selectedVenueList[0].subarea}?`,
          answer: `Yes, there are numerous hotels in ${this.selectedVenueList[0].subarea}, ranging from budget options to luxury stays. Many banquet halls have tie-ups with nearby hotels to offer special rates for event guests.`
        },
        {
          question: `Do banquet halls in ${this.selectedVenueList[0].subarea} offer discounts or packages for special occasions?`,
          answer: `Yes, many banquet halls in ${this.selectedVenueList[0].subarea} provide discounts for weekday events, off-peak seasons, or special occasions. They may also offer package deals for weddings, corporate events, and multiple bookings.`
        }
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

    // Update localitySearches to include all subareas
    this.localitySearches = this.selectedVenueList.map(venue => `Banquet Halls in ${venue.subarea}`);

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
    const selectedSubarea = this.selectedVenueList.length > 0 ? this.selectedVenueList[0].subarea : '';
    const cityname = this.selectedVenueList.length > 0 ? this.selectedVenueList[0].cityname.toLowerCase() : '';
    const navigationPath = `/banquet-halls/wedding/mumbai/${selectedSubarea}`;

    console.log(`Search clicked, navigating to ${navigationPath}`);
    this.router.navigate([navigationPath]).then(() => {
      console.log('Navigation complete');
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
