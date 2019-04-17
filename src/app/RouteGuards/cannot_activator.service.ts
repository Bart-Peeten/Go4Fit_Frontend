import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class CannotActivateGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        window.confirm('Binnenkort verschijnt hier meer informatie, deze pagina is nog in ontwikkeling!');
        return false;
    }
}
