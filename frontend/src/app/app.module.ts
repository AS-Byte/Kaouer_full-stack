import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {AppComponent} from "./app.component";
import {TerrainEditComponent} from "./components/terrain/terrain-edit/terrain-edit.component";
import {ListFilterPipe} from "./components/terrain/terrain-list/listFilterPipe";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {FooterComponent} from "./shared/footer/footer.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {TerrainCreateComponent} from "./components/terrain/terrain-create/terrain-create.component";
import {TerrainListComponent} from "./components/terrain/terrain-list/terrain-list.component";
import {CentreCreateComponent} from "./components/centre/centre-create/centre-create.component";
import {CentreListComponent} from "./components/centre/centre-list/centre-list.component";
import {CentreEditComponent} from "./components/centre/centre-edit/centre-edit.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";




@NgModule({
  declarations: [
    AppComponent,
    TerrainCreateComponent,
    TerrainEditComponent,
    TerrainListComponent,
    NavbarComponent,
    FooterComponent,
    ListFilterPipe,
    CentreCreateComponent,
    CentreEditComponent,
    CentreListComponent,


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
    NgbModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
