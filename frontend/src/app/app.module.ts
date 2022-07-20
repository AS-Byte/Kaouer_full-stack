import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {AppComponent} from "./app.component";
import {TerrainCreateComponent} from "./components/terrain-create/terrain-create.component";
import {TerrainEditComponent} from "./components/terrain-edit/terrain-edit.component";
import {TerrainListComponent} from "./components/terrain-list/terrain-list.component";
import {ListFilterPipe} from "./components/terrain-list/listFilterPipe";
import {FooterComponent} from "./shared/footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NavbarComponent} from "./shared/navbar/navbar.component";

import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AppComponent,
    TerrainCreateComponent,
    TerrainEditComponent,
    TerrainListComponent,
    NavbarComponent,
    FooterComponent,
    ListFilterPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
