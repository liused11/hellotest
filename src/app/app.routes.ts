import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./sharing/layout/layout.component').then((m) => m.LayoutComponent),
        children: [
            {
                path: 'todolist',
                loadComponent: () =>
                    import('./todo/todo-home/todo-home.component').then((m) => m.TodoHomeComponent),
            },
            {
                path: '',
                loadComponent: () =>
                    import('./todo/todo-list/todo-list.component').then((m) => m.TodoListComponent),
            },
            {
                path: 'todo-completed',
                loadComponent: () =>
                    import('./todo/todo-completed/todo-completed.component').then((m) => m.TodoCompletedComponent),
            },
            {
                path: 'todo-pending',
                loadComponent: () =>
                    import('./todo/todo-pending/todo-pending.component').then((m) => m.TodoPendingComponent),
            },
        ]
    },
    {
        path: '**',
        loadComponent: () =>
            import('./sharing/not-found/not-found.component').then((m) => m.NotFoundComponent),
    }
];



