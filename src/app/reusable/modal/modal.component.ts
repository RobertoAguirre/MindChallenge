import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() my_modal_title;
  @Input() my_modal_content;
  @Input() my_modal_color;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }


}