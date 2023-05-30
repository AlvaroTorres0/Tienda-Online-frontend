import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
})
export class PromotionsComponent {

  ngOnInit(): void {
    if (this.change) {
      setInterval(() => {
        this.nextPromotion();
      }, this.interval);
    }
  }

  
  @Input() indicators = true;
  @Input() controls = true;
  interval = 5000;
  change = true;
  selectedIndex = 0;
  images = [
    {
      imgSrc: '.././../../assets/promotions/publidad1.jpg',
    },
    {
      imgSrc: '.././../../assets/promotions/publidad2.webp',
    },
    {
      imgSrc: '.././../../assets/promotions/publidad3.jpg',
    },
    {
      imgSrc: '.././../../assets/promotions/publidad4.webp',
    },
    {
      imgSrc: '.././../../assets/promotions/publidad5.webp',
    },
  ];

  

  selectedImage(index: number): void {
    this.selectedIndex = index;
  }
  prevPromotion(): void {
    this.selectedIndex === 0
      ? (this.selectedIndex = this.images.length - 1)
      : this.selectedIndex--;
  }
  nextPromotion(): void {
    this.selectedIndex === this.images.length - 1
      ? (this.selectedIndex = 0)
      : this.selectedIndex++;
  }
}
