import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, HostListener, ViewEncapsulation, afterNextRender, afterRender, contentChild, inject, input } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  //None disables that style scoping/style encapsulation donc les style dans le css sont globaux
  //comme si placé dans le style générale
  //+ Emuleated est la valeur par defaut reconnu pas tous les navigateurs >< à shadowdone
  encapsulation: ViewEncapsulation.None,
  //avec host, ce sera appliqué à tous les app-controle partout dans l'application
  //voir ausssi de @HostBinding 
  host: {
    class: 'control',
   '(click)': 'onClick()'
  }
})
export class ControlComponent implements AfterContentInit{
  //c'est mieux de l'appeler className pour éviter la confusion avec class
  //mais découragé, existe seulement pour backward compatibility reasons
  //@HostBinding('class') className= 'control'
  // @HostListener('click') onClick(){
  //   console.log('Clicked')
  // }
  label = input.required<string>()
  //Peut se référer à n'importe quel élément de la page (assez généric)
  private el = inject(ElementRef)
  // @ContentChild('input') private control?: ElementRef<
  // HTMLInputElement | HTMLTextAreaElement
  // >
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input')
  
  //cela noous permet de définir des function qui doivent être exécutée  quand quoi que ce soit change dans l'application
  // ou après les changment d'après
  constructor(){
    afterRender(() => {
      console.log('afterRender')
    })

    afterNextRender(() => {
      console.log('afterNextRender')
    })
  }
  
  ngAfterContentInit(){
    //...
  }


  onClick(){
    console.log('Clicked')
    console.log(this.el)
    console.log(this.control)
  }


  
}
