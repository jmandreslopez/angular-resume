import { FormControl } from '@angular/forms';

export class EmailValidator {

    static format(control: FormControl): any {
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if (control.value !== '' && ! EMAIL_REGEXP.test(control.value)) {
            return { 'emailFormatInvalid': true };
        }

        return null;
    }
}
