import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BallroomService } from './../../services/ballroom.service';
import { Ballroom } from './../../models/ballroom';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-ballroom-dialog',
  templateUrl: './new-ballroom-dialog.component.html',
  styleUrls: ['./new-ballroom-dialog.component.scss']
})
export class NewBallroomDialogComponent implements OnInit {
  requestProcessing: boolean;
  statusCode: Ballroom;
  processValidation = false;
  ballroom: Ballroom;
  constructor(private dialogRef: MatDialogRef<NewBallroomDialogComponent>,
    private ballroomService: BallroomService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.ballroom = new Ballroom ('', '', '');
        }

     save(ballroom: Ballroom): void {
              console.log('you submitted value: ', ballroom);
              this.processValidation = true;
              this.openSnackBar();
              // Form is valid, now perform create or update
               this.preProcessConfigurations();
                // Handle create ballroom
                this.ballroomService.createBallroom(ballroom)
                  .subscribe(successCode => {
                            this.statusCode = successCode;
                            this.dialogRef.close(ballroom);

                },
                      errorCode => this.statusCode = errorCode);
              }


             preProcessConfigurations() {
              this.statusCode = null;
              this.requestProcessing = true;
             }

             openSnackBar() {
               this.snackBar.open('Succesfully saved.', ' ', {
                duration: 5000
               });
             }

             // Go back to create ballroom
             backToCreateBallroom() {
                 this.processValidation = false;
             }


             dismiss() {
                  this.dialogRef.close(null);
             }
}
