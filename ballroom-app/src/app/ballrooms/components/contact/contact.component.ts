import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ContactService } from './../../services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from './../../models/contact';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  // Component properties
  allContacts: Contact[];
  statusCode: number;
  requestProcessing = false;
  contactIdToUpdate = null;
  processValidation = false;
  contactForm: FormGroup;
  @Input() contactBallroomId: string;
  editContacts = false;

  displayedColumns = ['Id', 'Phone', 'Email', 'Address', 'Site', 'Edit', 'Delete', 'Add'];
  dataSource = new MatTableDataSource<Contact>();

  constructor(private contactService: ContactService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
      }

  ngOnInit() {
    this.getAllContacts();
    console.log(this.contactBallroomId);
    // Create form
    this.contactForm = new FormGroup({
      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3)

      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      site: new FormControl('', [
        Validators.required
      ])
    });

  }

  // Fetch all contacts
  getAllContacts() {
    this.contactService.getContactsByBallroom(this.contactBallroomId)
      .subscribe( data => {
        this.allContacts = data;
          this.dataSource = new MatTableDataSource<Contact>(this.allContacts);
      },
      errorCode => this.statusCode = errorCode);
  }


  onContactFormSubmit(value: Contact): void {
    console.log('you submitted value: ', value);
    this.processValidation = true;
    if (this.contactForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    if (this.contactIdToUpdate === '0') {
      // Handle create contact
      value.ballroomId = this.contactBallroomId;
      this.contactService.createContact(value)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllContacts();
          this.backToCreateContact();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      // Handle update contact
      this.editContacts = true;
      value.id = this.contactIdToUpdate;
      value.ballroomId = this.contactBallroomId;
      console.log(this.contactBallroomId);
      console.log(this.contactIdToUpdate);
      this.contactService.updateContact(value)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllContacts();
          this.backToCreateContact();
        },
        errorCode => this.statusCode = errorCode);
    }
  }

  loadContactToAdd() {
    this.preProcessConfigurations();
    this.contactIdToUpdate = '0';
  }
  // Load contact by id to edit
  loadContactToEdit(id: string) {
    this.preProcessConfigurations();
    this.contactService.getContactById(id)
      .subscribe(contact => {
        this.contactIdToUpdate = contact.id;
        this.contactForm.setValue({
          telephone: contact.telephone,
          address: contact.address,
          email: contact.email,
          site: contact.site
        });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }
  // Delete contact
  deleteContact(id: string) {
    if (window.confirm('Are sure you want to delete this contact ?')) {
      this.preProcessConfigurations();
      this.contactService.deleteContactById(id)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllContacts();
          this.backToCreateContact();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  // Go back from update to create
  backToCreateContact() {
    this.contactIdToUpdate = null;
    this.contactForm.reset();
    this.processValidation = false;
  }

}
