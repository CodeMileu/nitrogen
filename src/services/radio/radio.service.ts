import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Radio {
    private channels: any = {
        'general': new EventEmitter<Signal>()
    };

    public broadcast(signal: Signal): void {
        this.channels['general'].emit(signal);
    }

    public broadcastToChannel(channel: string, signal: Signal) {
        if (!this.channels[channel]) {
            this.channels[channel] = new EventEmitter<Signal>();
        }
        this.channels[channel].emit(signal);
    }

    public listen(fn: () => {}): void {
        this.channels['general'].subscribe(fn);
    }

    public listenToChannel(channel: string, fn: () => {}): void {
        if (!this.channels[channel]) {
            this.channels[channel] = new EventEmitter<Signal>();
        }
        this.channels[channel].subscribe(fn);
    }

    public addChannel(channel: string): void {
        if(!this.channels[channel]) {
            this.channels[channel] = new EventEmitter<Signal>();
        }
    }
}

export class Signal {
    public name: String;
    public message: any;

    constructor(name: String, message: any) {
        this.name = name;
        this.message = message;
    }

    static fromObject(object: any): Signal {
        if (!object) {
            throw new Error("Object is null or undefined at Signal.fromObject()");
        }
        return new Signal(object.name, object.message);
    }
}