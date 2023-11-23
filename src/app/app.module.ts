import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
//--
import { TrimPipe } from './pipes/trim.pipe';
//--
import { AuthInterceptor } from './interceptor/auth.interceptor';
//
import { CryptoService } from './service/crypto.service';
import { UsuarioAjaxService } from './service/usuario.ajax.service';
import { ProyectoAjaxService } from './service/proyecto.ajax.service';
import { TareaAjaxService } from './service/tarea.ajax.service';
import { SessionAjaxService } from './service/session.ajax.service';
//--
import { HomeUserComponent } from './components/shared/home-user/home-user.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
//--
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminUsuarioViewRoutedComponent } from './components/usuario/admin-usuario-view-routed/admin-usuario-view-routed.component';
import { AdminUsuarioNewRoutedComponent } from './components/usuario/admin-usuario-new-routed/admin-usuario-new-routed.component';
import { AdminUsuarioEditRoutedComponent } from './components/usuario/admin-usuario-edit-routed/admin-usuario-edit-routed.component';
import { AdminUsuarioPlistUnroutedComponent } from './components/usuario/admin-usuario-plist-unrouted/admin-usuario-plist-unrouted.component';
import { AdminUsuarioDetailUnroutedComponent } from './components/usuario/admin-usuario-detail-unrouted/admin-usuario-detail-unrouted.component';
import { AdminUsuarioFormUnroutedComponent } from './components/usuario/admin-usuario-form-unrouted/admin-usuario-form-unrouted.component';
import { AdminUsuarioSelectionUnroutedComponent } from './components/usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { UserUsuarioFeaturedUnroutedComponent } from './components/usuario/user-usuario-featured-unrouted/user-usuario-featured-unrouted.component';
import { UserUsuarioDetailUnroutedComponent } from './components/usuario/user-usuario-detail-unrouted/user-usuario-detail-unrouted.component';
//
import { AdminProyectoNewRoutedComponent } from './components/proyecto/admin-proyecto-new-routed/admin-proyecto-new-routed.component';
import { AdminProyectoViewRoutedComponent } from './components/proyecto/admin-proyecto-view-routed/admin-proyecto-view-routed.component';
import { AdminProyectoEditRoutedComponent } from './components/proyecto/admin-proyecto-edit-routed/admin-proyecto-edit-routed.component';
import { AdminProyectoPlistUnroutedComponent } from './components/proyecto/admin-proyecto-plist-unrouted/admin-proyecto-plist-unrouted.component';
import { AdminProyectoDetailUnroutedComponent } from './components/proyecto/admin-proyecto-detail-unrouted/admin-proyecto-detail-unrouted.component';
import { AdminProyectoPlistRoutedComponent } from './components/proyecto/admin-proyecto-plist-routed/admin-proyecto-plist-routed.component';
import { AdminProyectoFormUnroutedComponent } from './components/proyecto/admin-proyecto-form-unrouted/admin-proyecto-form-unrouted.component';
import { UserProyectoPlistUnroutedComponent } from './components/proyecto/user-proyecto-plist-unrouted/user-proyecto-plist-unrouted.component';
import { UserProyectoFeaturedUnroutedComponent } from './components/proyecto/user-proyecto-featured-unrouted/user-proyecto-featured-unrouted.component';
//
import { AdminTareaPlistUnroutedComponent } from './components/tarea/admin-tarea-plist-unrouted/admin-tarea-plist-unrouted.component';
import { AdminTareaDetailUnroutedComponent } from './components/tarea/admin-tarea-detail-unrouted/admin-tarea-detail-unrouted.component';
import { AdminTareaPlistRoutedComponent } from './components/tarea/admin-tarea-plist-routed/admin-tarea-plist-routed.component';
import { AdminTareaEditRoutedComponent } from './components/tarea/admin-tarea-edit-routed/admin-tarea-edit-routed.component';
import { AdminTareaViewRoutedComponent } from './components/tarea/admin-tarea-view-routed/admin-tarea-view-routed.component';
import { AdminTareaNewRoutedComponent } from './components/tarea/admin-tarea-new-routed/admin-tarea-new-routed.component';
import { AdminTareaFormUnroutedComponent } from './components/tarea/admin-tarea-form-unrouted/admin-tarea-form-unrouted.component';
import { UserTareaPlistUnroutedComponent } from './components/tarea/user-tarea-plist-unrouted/user-tarea-plist-unrouted.component';
import { UserTareaFeaturedUnroutedComponent } from './components/tarea/user-tarea-featured-unrouted/user-tarea-featured-unrouted.component';
import { AdminTareaSelectionUnroutedComponent } from './components/tarea/admin-tarea-selection-unrouted/admin-tarea-selection-unrouted.component';


//--
@NgModule({
  declarations: [
    TrimPipe,
    AppComponent,
    HomeUserComponent,
    HomeRoutedComponent,
    MenuUnroutedComponent,
    FooterUnroutedComponent,
    LoginRoutedComponent,
    LogoutRoutedComponent,
    //--
    AdminUsuarioPlistRoutedComponent,
    AdminUsuarioViewRoutedComponent,
    AdminUsuarioNewRoutedComponent,
    AdminUsuarioEditRoutedComponent,
    AdminUsuarioPlistUnroutedComponent,
    AdminUsuarioDetailUnroutedComponent,
    AdminUsuarioFormUnroutedComponent,
    AdminUsuarioSelectionUnroutedComponent,
    UserUsuarioFeaturedUnroutedComponent,
    UserUsuarioDetailUnroutedComponent,
    //--
    AdminProyectoPlistRoutedComponent,
    AdminProyectoViewRoutedComponent,
    AdminProyectoNewRoutedComponent,
    AdminProyectoEditRoutedComponent,
    AdminProyectoPlistUnroutedComponent,
    AdminProyectoDetailUnroutedComponent,
    AdminProyectoFormUnroutedComponent,
    UserProyectoFeaturedUnroutedComponent,
    UserProyectoPlistUnroutedComponent,
    //--
    AdminTareaPlistRoutedComponent,
    AdminTareaViewRoutedComponent,
    AdminTareaNewRoutedComponent,
    AdminTareaEditRoutedComponent,
    AdminTareaPlistUnroutedComponent,
    AdminTareaDetailUnroutedComponent,
    AdminTareaFormUnroutedComponent,
    AdminTareaSelectionUnroutedComponent,
    UserTareaFeaturedUnroutedComponent,
    UserTareaPlistUnroutedComponent,
    //--    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //--
    BrowserAnimationsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    PaginatorModule,
    TableModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    CalendarModule,
    TooltipModule,
    //--
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    //--
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    MatSnackBar,
    UsuarioAjaxService,
    ProyectoAjaxService,
    TareaAjaxService,
    SessionAjaxService,
    CryptoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
