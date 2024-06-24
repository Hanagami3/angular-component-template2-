import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  // c'est bien d'être plus précis et donc de créer un type spécial qui ne peut prendre qu'une de ces trois valeurs
  // comme ça, si un problème de typing aec l'écriture, directement soulevé par l'ide
  // ==> Literal Types
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';

  constructor(){}
  // c'est mieux d'utiliser ngOnInit pour initialiser le travail comme setting up this interval
  //>< au contstructor, Angular is done initialzing the component
  // donc si mon component reçoi des valeur entrée, ces valeur seront initialisée
  ngOnInit() {
    setInterval(() => {
      const rnd = Math.random(); // 0 - 0,999999...
      if (rnd < 0.5) {
        this.currentStatus = 'online'
      } else if (rnd > 0.9) {
        this.currentStatus = 'offline'
      } else {
        this.currentStatus = 'unknown'
      }
    }, 5000)
  }
  //!\ au nom de la classe car opas d'erreur si on se trompe dans les majuscules par exemple (vu que c'est ok de créer ses propres méthode
  // mais du coup, angulare ne pourra pas la cibler) 
  //Mais on peut implementer OnInit pour forcer la classe a avoir cette bonne méthode
}
