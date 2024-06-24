import { Component } from '@angular/core';
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
    onSubmit(title: string, ticketText: string){
        console.log(title)
        console.log(ticketText)
    }
    // onSubmit(titleElement: HTMLInputElement){
    //     //console.dir(titleElement)
    //     const enteredTitle = titleElement.value
    //     console.log('ENTERED TITLE: ' + enteredTitle)
    // }
}
