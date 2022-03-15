import { Component, ElementRef, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { AirlinesService } from 'src/app/services/airlines.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit, AfterViewInit {
  airLineServices!: Subscription;
  airlines: any = [];
  totalPages!: number;
  currentPage: number = 0;
  @ViewChildren('theLastList', {read : ElementRef})
  theLastList!: QueryList<ElementRef>;
  observer: any;

  constructor(private airLineService: AirlinesService) { }

  ngOnInit(): void {
    this.getAirLineService();
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((content)=> {
      if(content.last) {
        this.observer.observe(content.last.nativeElement)
      }
    })
  }

  getAirLineService () {
    this.airLineServices =  this.airLineService.getAirlineServices(this.currentPage).subscribe((services)=> {
      this.totalPages = services.totalPages;
      services.data.forEach((airline:any) => {
        this.airlines.push(airline);
      });
    })
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries)=> {
      if(entries[0].isIntersecting) {
        if(this.currentPage < this.totalPages) {
          this.currentPage ++;
          this.getAirLineService();
        }
      }
    },options)
  }

}
