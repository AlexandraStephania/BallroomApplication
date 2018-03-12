import { NewBallroomDialogComponent } from './../new-ballroom-dialog/new-ballroom-dialog.component';
import { SearchService } from './../../services/search-ballroom.service';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { Ballroom } from './../../models/ballroom';

import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  results: Ballroom [];
  searchTerm$ = new Subject<string>();
  constructor(  private searchService: SearchService,
                private dialog: MatDialog) {

    this.searchService.search(this.searchTerm$)
    .subscribe( data => this.results =  data);
   }

  ngOnInit() {
  }

  openAddBallroomDialog(): void {
   // tslint:disable-next-line:prefer-const
   let dialogRef = this.dialog.open(NewBallroomDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log('The dialog was closed', result);
    });
  }

}
