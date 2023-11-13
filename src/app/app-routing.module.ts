
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//--
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
//--
import { AdminUsuarioViewRoutedComponent } from './components/usuario/admin-usuario-view-routed/admin-usuario-view-routed.component';
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminUsuarioEditRoutedComponent } from './components/usuario/admin-usuario-edit-routed/admin-usuario-edit-routed.component';
import { AdminUsuarioNewRoutedComponent } from './components/usuario/admin-usuario-new-routed/admin-usuario-new-routed.component';
import { AdminThreadNewRoutedComponent } from './components/thread/admin-thread-new-routed/admin-thread-new-routed.component';
import { AdminTareaPlistRoutedComponent } from './components/tarea/admin-tarea-plist-routed/admin-tarea-plist-routed.component';
import { AdminThreadPlistRoutedComponent } from './components/thread/admin-thread-plist-routed/admin-thread-plist-routed.component';
import { AdminTareaNewRoutedComponent } from './components/tarea/admin-tarea-new-routed/admin-tarea-new-routed.component';
//--
import { AdminTareaEditRoutedComponent } from './components/tarea/admin-tarea-edit-routed/admin-tarea-edit-routed.component';
import { AdminThreadEditRoutedComponent } from './components/thread/admin-thread-edit-routed/admin-thread-edit-routed.component';
import { AdminThreadViewRoutedComponent } from './components/thread/admin-thread-view-routed/admin-thread-view-routed.component';
import { AdminViewRoutedComponent } from './components/tarea/admin-tarea-view-routed/admin-tarea-view-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';


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
  { path: 'admin/thread/plist', component: AdminThreadPlistRoutedComponent },
  { path: 'admin/thread/plist/byuser/:id', component: AdminThreadPlistRoutedComponent },
  { path: 'admin/thread/view/:id', component: AdminThreadViewRoutedComponent },    
  { path: 'admin/thread/new', component: AdminThreadNewRoutedComponent },  
  { path: 'admin/thread/edit/:id', component: AdminThreadEditRoutedComponent },  
  //--
  { path: 'admin/tarea/plist', component: AdminTareaPlistRoutedComponent },
  { path: 'admin/tarea/plist/byuser/:iduser', component: AdminTareaPlistRoutedComponent },  
  { path: 'admin/tarea/plist/bythread/:idthread', component: AdminTareaPlistRoutedComponent },  
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
