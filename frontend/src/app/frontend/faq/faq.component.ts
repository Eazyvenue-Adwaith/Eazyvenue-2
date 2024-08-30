import { Component, OnInit } from '@angular/core';
import { SubareaService } from 'src/app/services/subarea.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs = [
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    // Add more FAQs as needed
  ];

  activeIndex: number | null = null;

  frequentSearches: string[] = [];
  nearMeSearches: string[] = [];
  localitySearches: string[] = [];
  relatedSearches: string[] = [];
  selectedCity: string = 'Mumbai';
  cityCode: string = '';
  subareas: any[] = [];

  constructor(
    private subareaService: SubareaService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getCityCode();
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  getCityCode() {
    const query = `?filterByDisable=false&filterByStatus=true&filterByName=${this.selectedCity}`;
    this.commonService.getCities(query).subscribe(
      data => {
        if (data.data.items.length > 0) {
          this.cityCode = data.data.items[0].id;
          this.getSubareas();
        }
      },
      err => {
        console.error('Error fetching city code:', err);
      }
    );
  }

  getSubareas() {
    const query = `?filterByDisable=false&filterByStatus=true&filterByCityId=${this.cityCode}`;
    this.subareaService.getSubareaList(query).subscribe(
      data => {
        this.subareas = data.data.items;
        this.updateSearches();
      },
      err => {
        console.error('Error fetching subareas:', err);
      }
    );
  }

  updateSearches() {
    this.frequentSearches = [
      `Affordable Banquet Halls in ${this.selectedCity}`,
      `Banquet Halls in ${this.selectedCity}`,
      `AC Banquet Halls in ${this.selectedCity}`,
      `Top Banquet Halls in ${this.selectedCity}`,
      `Best Banquet Halls with price in ${this.selectedCity}`,
      `Banquet Halls with review in ${this.selectedCity}`,
      `Luxury Banquet Halls in ${this.selectedCity}`,
      `Best Banquet Halls in ${this.selectedCity}`,
      `List of Banquet Halls in ${this.selectedCity}`,
      `Cheap Banquet Halls in ${this.selectedCity}`,
      `Best banquets in ${this.selectedCity}`,
      `Banquet Halls nearby ${this.selectedCity}`,
      `Banquet Halls near ${this.selectedCity}`
    ];

    this.nearMeSearches = [
      'Affordable Banquet Halls near me',
      'Banquet Halls near me',
      'AC Banquet Halls near me',
      'Top Banquet Halls near me',
      'Best Banquet Halls with price near me',
      'Banquet Halls with review near me',
      'Luxury Banquet Halls near me',
      'Best Banquet Halls near me',
      'List of Banquet Halls near me',
      'Cheap Banquet Halls near me',
      'Best banquets near me',
      `Banquet Halls nearby ${this.selectedCity}`,
      `Banquet Halls near ${this.selectedCity}`
    ];

    this.localitySearches = [
        'Banquet Halls in thane',
        'Banquet Halls in malad',
        'Banquet Halls in navi mumbai',
        'Banquet Halls in dadar',
        'Banquet Halls in thane',
        'Banquet Halls in andheri',
        'Banquet Halls in dadar',
        'Banquet Halls in mulund'
      ];


    this.relatedSearches = [
      `Wedding Venues in ${this.selectedCity}`,
      `Marriage Halls in ${this.selectedCity}`,
      `Mantapa / Convention Hall in ${this.selectedCity}`,
      `Wedding Lawns in ${this.selectedCity}`,
      `Destination Wedding Venues in ${this.selectedCity}`,
      `5 Star Wedding Hotels in ${this.selectedCity}`,
      `Party Halls in ${this.selectedCity}`,
      `Cocktail Venues in ${this.selectedCity}`,
      `Birthday Party Halls in ${this.selectedCity}`,
      `Party Plots in ${this.selectedCity}`,
      `Terrace Banquet Halls in ${this.selectedCity}`,
      `Corporate Event Venues in ${this.selectedCity}`,
      `Wedding Resorts in ${this.selectedCity}`,
      `Wedding Hotels in ${this.selectedCity}`,
      `Villa / Farmhouse in ${this.selectedCity}`,
      `Heritage Wedding Venues in ${this.selectedCity}`
    ];

    // this.localitySearches = this.subareas.map(subarea => `Banquet Halls in ${subarea.name}`);
  }

  onCityChange(city: string) {
    this.selectedCity = city;
    this.getCityCode();
  }
}
