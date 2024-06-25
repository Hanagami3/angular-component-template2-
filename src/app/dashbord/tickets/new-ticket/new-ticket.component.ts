import { Component, ElementRef, Signal, EventEmitter, output, Output, viewChild, ViewChildren, viewChildren } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
//Pour permettre ngSubmit dans l'html
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-ticket',
    standalone: true,
    templateUrl: './new-ticket.component.html',
    styleUrl: './new-ticket.component.css',
    imports: [ControlComponent, ButtonComponent, FormsModule]
})
export class NewTicketComponent {
    //Va chercher dans l'html une correspondance avec string, variable (template name avec #), component, etc...
    //On a pas encore acces via le constructor car Angular n'a pas encore initialisé le template
    // @ViewChild('form') private form?: ElementRef<HTMLFormElement>
    //pour plusieur élements donc utiliser un tableau
    // @ViewChildren(ButtonComponent) buttons
    private form = viewChild.required<ElementRef<HTMLFormElement>>('form')

    // @Output() add = new EventEmitter<{title: string, text: string}()>
    add = output<{title: string, text: string}>()


    //contrairement à afterviewInit, il y a pas de gaarentie qut l'élément de viewchild existe déjà
    ngOnInit(){
        console.log('ONINIT')
        console.log(this.form().nativeElement)
    }

    //On a la garantie d'avoir accés à l'élément qui a été séléctionné avec view child
    ngAfterViewInit(){
        console.log('AFTER VIEW INIT')
        console.log(this.form().nativeElement)
    }

    onSubmit(title: string, ticketText: string){
        this.add.emit({title: title, text: ticketText })
        this.form().nativeElement.reset()
    }





    // // onSubmit(title: string, ticketText: string, form: HTMLFormElement){
    // onSubmit(title: string, ticketText: string){
    //     console.log(title)
    //     console.log(ticketText)
    //     //reset les inputs
    //     //nativeElement car à la base ElementRef qui est wrapper en HTMLFormElement
    //     //this.form?.nativeElement.reset()
    //     this.form().nativeElement.reset()
    // }
    // onSubmit(titleElement: HTMLInputElement){
    //     //console.dir(titleElement)
    //     const enteredTitle = titleElement.value
    //     console.log('ENTERED TITLE: ' + enteredTitle)
    // }
}
