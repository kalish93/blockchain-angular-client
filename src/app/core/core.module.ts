import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
