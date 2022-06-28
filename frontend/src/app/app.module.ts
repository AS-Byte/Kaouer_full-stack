import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerrainCreateComponent } from './components/terrain-create/terrain-create.component';
import { TerrainEditComponent } from './components/terrain-edit/terrain-edit.component';
import { TerrainListComponent } from './components/terrain-list/terrain-list.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TerrainCreateComponent,
    TerrainEditComponent,
    TerrainListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
