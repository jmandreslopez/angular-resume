import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

    private isDebug(): boolean {
        // The .env file doesn't handle boolean, only strings and number
        // That's why we need to check agains 'true' or 'false'
        return process.env.DEBUG === 'true' ? true : false;
    }

    public info(...args) {
        if (this.isDebug()) {
            let element = ['%cInfo:', 'color:blue'];
            element.push(...args);
            console.log.apply(console, element);
        }
    }

    public error(...args) {
        if (this.isDebug()) {
            let element = ['%cError:', 'color:red'];
            element.push(...args);
            console.log.apply(console, element);
        }
    }

    public warning(...args) {
        if (this.isDebug()) {
            let element = ['%cWarning:', 'color:orange'];
            element.push(...args);
            console.log.apply(console, element);
        }
    }

    public printStackTrace(message = '') {
        if (this.isDebug()) {
            let error = new Error(message);
            let stack = error.stack.replace(/^[^\(]+?[\n$]/gm, '')
                .replace(/^\s+at\s+/gm, '')
                .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
                .split('\n');
            console.error(message, stack);
        }
    }
}
