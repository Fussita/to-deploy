import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { PopUpService } from '../presentation/services/toast';
import { UserStore } from './use-store';

export const RoleGuard: CanActivateFn = (route, state) => {
  const store = UserStore.getInstance()
  const router = inject(Router)
  const popUp = inject(PopUpService)
  
  const roles: string[] = route.data['roles']
  const rol = store.User.rol

  if (roles.includes(rol)) {
    return true
  } else {
    popUp.showError( 'No tiene los permisos necesarios para continuar' )
    router.navigateByUrl('home/dashboard')
    return false    
  }

}