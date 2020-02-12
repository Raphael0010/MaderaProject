import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";

@Component({
  selector: "app-remise-plan-dialog",
  templateUrl: "./remise-plan-dialog.component.html",
  styleUrls: ["./remise-plan-dialog.component.css"]
})
export class RemisePlanDialogComponent implements OnInit {
  @ViewChild("remise", { static: false }) remiseInput: ElementRef;
  isFilled = false;
  reg = new RegExp("^[0-9]+$");
  remise = 0;
  plan: Plan = new Plan();

  // tslint:disable-next-line:max-line-length
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private planService: PlanService,
    public dialogRef: MatDialogRef<RemisePlanDialogComponent>
  ) {}

  ngOnInit() {
    this.plan = this.data.plan;
  }

  confirmRemise() {
    this.dialogRef.close({ plan: this.plan, remise: this.remise });
  }

  verificationRemise() {
    this.remise = this.reg.test(this.remiseInput.nativeElement.value)
      ? parseInt(this.remiseInput.nativeElement.value, 10)
      : 0;

    if (this.remise > 20) {
      this.isFilled = false;
      return false;
    }
    if (this.remise === 0) {
      this.isFilled = false;
    } else {
      this.isFilled = true;
    }
  }
}
