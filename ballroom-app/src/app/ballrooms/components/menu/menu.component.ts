import { MatTableDataSource } from '@angular/material';
import { MenuService } from './../../services/menu.service';
import { FormGroup, Validators, FormBuilder, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Menu } from './../../models/menu';
import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  allMenus: Menu [];
  statusCode: number;
  requestProcessing = false;
  menuIdToUpdate = null;
  processValidation = false;
  menuForm: FormGroup;
  @Input() menuBallroomId: string;
  displayedColumns = ['Id', 'Name', 'Type', 'Price', 'Description', 'Edit', 'Delete', 'Add'];
  dataSource = new MatTableDataSource<Menu>();

  types = [
    {value: 'Mic', viewValue: 'Meniu Mic'},
    {value: 'Mediu', viewValue: 'Meniu Mediu'},
    {value: 'Mare', viewValue: 'Meniu Mare'}
  ];

  // Create constructor to get service instance
  constructor(private menuService: MenuService, private fb: FormBuilder) { }

  // loading the menus
  ngOnInit() {
    this.getAllMenus();
    this.menuForm = this.fb.group ({

          menuName:  ['',
            [Validators.required,
            Validators.minLength(3)]],

          menuType: ['',
            [Validators.required,
            Validators.minLength(3)]],

          price: ['',
            Validators.required
          ],
          description: [ '',
            Validators.required
          ]
        });

  }

  // Fetch all menus

  getAllMenus() {
    this.menuService.getAllMenus(this.menuBallroomId)
    .subscribe( data => {
      this.allMenus =  data,
      this.dataSource = new MatTableDataSource<Menu>(this.allMenus);
      },
      errorCode => this.statusCode = errorCode);

  }
  onMenuFormSubmit(value: Menu): void {
    console.log('you submitted value: ', value);
   this.processValidation = true;
   if (this.menuForm.invalid) {
        return; // Validation failed, exit from method.
   }
   // Form is valid, now perform create or update
         this.preProcessConfigurations();

   if (this.menuIdToUpdate === '0') {
     // Handle create ballroom
     value.ballroomId = this.menuBallroomId;
     this.menuService.createMenu(value)
       .subscribe(successCode => {
                 this.statusCode = successCode;
                 this.getAllMenus();
                 this.backToCreateMenu();
     },
           errorCode => this.statusCode = errorCode);
   }else {
    // Handle update menu
 value.id = this.menuIdToUpdate;
 value.ballroomId = this.menuBallroomId;
 this.menuService.updateMenu(value)
   .subscribe(successCode => {
       this.statusCode = successCode;
       this.getAllMenus();
       this.backToCreateMenu();
 },
       errorCode => this.statusCode = errorCode);
}
  }


  loadMenuToAdd() {
    this.preProcessConfigurations();
    this.menuIdToUpdate = '0';
  }
   // Load menu by id to edit
loadMenuToEdit(id: string) {
  this.preProcessConfigurations();
  this.menuService.getMenuById(id)
    .subscribe(menu => {
            this.menuIdToUpdate = menu.id;
            this.menuForm.setValue({
             menuName: menu.menuName,
             menuType:  menu.menuType,
             price: menu.price,
             description: menu.description
            });
      this.processValidation = true;
      this.requestProcessing = false;
    },
    errorCode =>  this.statusCode = errorCode);
 }
    // Delete menu
 deleteMenu(id: string) {
  if (window.confirm('Are sure you want to delete this menu ?')) {
      this.preProcessConfigurations();
      this.menuService.deleteMenuById(id)
     .subscribe(successCode => {
       this.statusCode = successCode;
       this.getAllMenus();
       this.backToCreateMenu();
    },
    errorCode => this.statusCode = errorCode);
   }
}
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
}
// Go back from update to create
backToCreateMenu() {
    this.menuIdToUpdate = null;
    this.menuForm.reset();
    this.processValidation = false;
}



}
