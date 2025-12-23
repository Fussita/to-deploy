import { Routes } from "@angular/router";
import { HomePageComponent } from "./presentation/pages/home-page/home-page.component";
import { DashboardComponent } from "./presentation/pages/dashboard/dashboard.component";
import { UsuariosComponent } from "./presentation/pages/usuarios/usuarios.component";
import { ClientesListComponent } from "./presentation/pages/clientes-list/clientes-list.component";
import { ProductsComponent } from "./presentation/pages/products/products.component";
import { OrdenesComponent } from "./presentation/pages/ordenes/ordenes.component";
import { InvoicePageComponent } from "./presentation/pages/invoice-page/invoice-page.component";

export const HomeRoutes: Routes = [
    {
        path: '',
        canActivate: [],
        component: HomePageComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                //canActivate: [ RoleGuard ],
                //data: { roles: [ 'admin', 'vendedor' ] },
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                //canActivate: [ RoleGuard ],
                //data: { roles: [ 'admin', 'vendedor' ] },
                path: 'usuarios',
                component: UsuariosComponent,
            },
            {
                //canActivate: [ RoleGuard ],
                //data: { roles: [ 'admin', 'vendedor' ] },
                path: 'clientes-list',
                component: ClientesListComponent,
            },
            {
                //canActivate: [ RoleGuard ],
                //data: { roles: [ 'admin', 'vendedor' ] },
                path: 'productos',
                component: ProductsComponent,
            },
            {
                //canActivate: [ RoleGuard ],
                //data: { roles: [ 'admin', 'vendedor' ] },
                path: 'pedidos',
                component: OrdenesComponent,
            },
            {
                //canActivate: [ RoleGuard ],
                //data: { roles: [ 'admin', 'vendedor' ] },
                path: 'facturas',
                component: InvoicePageComponent,
            },
            {
                path: '**',
                redirectTo: 'dashboard'  
            },
        ]
    }
]