import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';


//NavbarComponent
@Component({
  selector: 'app-layout',
  imports: [  RouterOutlet ,NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] ,
})
export class LayoutComponent {

}

