import { AfterViewInit, Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit /*, OnDestroy*/ {
  // c'est bien d'être plus précis et donc de créer un type spécial qui ne peut prendre qu'une de ces trois valeurs
  // comme ça, si un problème de typing aec l'écriture, directement soulevé par l'ide
  // ==> Literal Types
  // currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
 
  // Avec cela on peut créer un listener qui déclenchera une fonction peu importe le cnponent dans lequel on inject DestroyRef
  private destroyRef = inject(DestroyRef) 

  
  // private interval?: NodeJS.Timeout
  // on reçoit une erreur donc utiliséer la syntaxe suivante qui est du ts avancé
  //private interval?: ReturnType<typeof setInterval>


  //constructorutilisé seulement pour y passer de simples classe mais pas pour des choses complexe (bad practice)
  constructor(){
    effect(() => {
    console.log(this.currentStatus())
    })
  }
  // c'est mieux d'utiliser ngOnInit pour initialiser le travail comme setting up this interval
  //>< au contstructor, Angular is done initialzing the component
  // donc si mon component reçoi des valeur entrée, ces valeur seront initialisée
  ngOnInit() {
    console.log('ON INIT')
    //this.interval = setInterval(() => {
    const interval = setInterval(() => {
      const rnd = Math.random(); // 0 - 0,999999...
    //   if (rnd < 0.5) {
    //     this.currentStatus = 'online'
    //   } else if (rnd > 0.9) {
    //     this.currentStatus = 'offline'
    //   } else {
    //     this.currentStatus = 'unknown'
    //   }
    // }, 5000)
      if (rnd < 0.5) {
        this.currentStatus.set('online')
      } else if (rnd > 0.9) {
        this.currentStatus.set('offline')
      } else {
        this.currentStatus.set('unknown')
      }
    }, 5000)
    this.destroyRef.onDestroy(() =>{
      clearInterval(interval)
    })
  }
  //!\ au nom de la classe car opas d'erreur si on se trompe dans les majuscules par exemple (vu que c'est ok de créer ses propres méthode
  // mais du coup, angulare ne pourra pas la cibler) 
  //Mais on peut implementer OnInit pour forcer la classe a avoir cette bonne méthode

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT')
  }

  //On peut avoir des fuite de memoir avec interval donc utiliser OnDestroy pour nettoyer cela
  // on est sur que cette interval est nettoyé si le component est supprimé
  //ancienne manière mais qui fonctionne sur les anciennes versions
  // ngOnDestroy(){
  //     clearTimeout(this.interval)
  // }
}
