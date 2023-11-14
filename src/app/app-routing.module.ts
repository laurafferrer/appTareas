
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//--
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
//--
import { AdminUsuarioViewRoutedComponent } from './components/usuario/admin-usuario-view-routed/admin-usuario-view-routed.component';
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminUsuarioEditRoutedComponent } from './components/usuario/admin-usuario-edit-routed/admin-usuario-edit-routed.component';
import { AdminUsuarioNewRoutedComponent } from './components/usuario/admin-usuario-new-routed/admin-usuario-new-routed.component';
//--
import { AdminProyectoNewRoutedComponent } from './components/proyecto/admin-proyecto-new-routed/admin-proyecto-new-routed.component';
import { AdminProyectoPlistRoutedComponent } from './components/proyecto/admin-proyecto-plist-routed/admin-proyecto-plist-routed.component';
import { AdminProyectoEditRoutedComponent } from './components/proyecto/admin-proyecto-edit-routed/admin-proyecto-edit-routed.component';
import { AdminProyectoViewRoutedComponent } from './components/proyecto/admin-proyecto-view-routed/admin-proyecto-view-routed.component';
//--
import { AdminTareaPlistRoutedComponent } from './components/tarea/admin-tarea-plist-routed/admin-tarea-plist-routed.component';
import { AdminTareaNewRoutedComponent } from './components/tarea/admin-tarea-new-routed/admin-tarea-new-routed.component';
import { AdminTareaEditRoutedComponent } from './components/tarea/admin-tarea-edit-routed/admin-tarea-edit-routed.component';
import { AdminTareaViewRoutedComponent } from './components/tarea/admin-tarea-view-routed/admin-tarea-view-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent },
  //--
  { path: 'admin/usuario/plist', component: AdminUsuarioPlistRoutedComponent },
  { path: 'admin/usuario/view/:id', component: AdminUsuarioViewRoutedComponent },    
  { path: 'admin/usuario/new', component: AdminUsuarioNewRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: AdminUsuarioEditRoutedComponent },
  //--  
  { path: 'admin/proyecto/plist', component: AdminProyectoPlistRoutedComponent },
  { path: 'admin/proyecto/plist/byuser/:id', component: AdminProyectoPlistRoutedComponent },
  { path: 'admin/proyecto/view/:id', component: AdminProyectoViewRoutedComponent },    
  { path: 'admin/proyecto/new', component: AdminProyectoNewRoutedComponent },  
  { path: 'admin/proyecto/edit/:id', component: AdminProyectoEditRoutedComponent },  
  //--
  { path: 'admin/tarea/plist', component: AdminTareaPlistRoutedComponent },
  { path: 'admin/tarea/plist/byuser/:iduser', component: AdminTareaPlistRoutedComponent },  
  { path: 'admin/tarea/plist/byproyecto/:idproyecto', component: AdminTareaPlistRoutedComponent },  
  { path: 'admin/tarea/view/:id', component: AdminTareaViewRoutedComponent },    
  { path: 'admin/tarea/new', component: AdminTareaNewRoutedComponent},  
  { path: 'admin/tarea/edit/:id', component: AdminTareaEditRoutedComponent },
  //--
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
