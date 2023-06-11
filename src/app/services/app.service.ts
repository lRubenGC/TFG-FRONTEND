import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private _clickSubject = new Subject<MouseEvent>();

    clickObs$ = this._clickSubject.asObservable();

    onBodyClick(event: MouseEvent): void {
        this._clickSubject.next(event);
    }
}
