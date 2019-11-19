import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-dialog-delete",
  templateUrl: "./dialog-delete.component.html",
  styleUrls: ["./dialog-delete.component.css"]
})
export class DialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {}

  nonClick(): void {
    this.dialogRef.close();
  }

  ouiClick(): void {
    this.dialogRef.close();
  }
}
