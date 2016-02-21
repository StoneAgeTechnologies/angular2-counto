import {Directive, Output, EventEmitter} from 'angular2/core';

@Directive({
    selector: 'count',
    properties: ['duration: duration', 'countFrom: countFrom', 'countTo: countTo', 'step: step']
})

export class Count {

    @Output() countChange = new EventEmitter();
    private _timer;
    private _duration: number;
    private _countTo: number;
    private _countFrom: number;

    set duration(duration) {
        this._duration = parseFloat(duration);
        this.run();
    }

    set countTo(countTo) {
        this._countTo = parseFloat(countTo);
        this.run();
    }

    set countFrom(countFrom) {
        this._countFrom = parseFloat(countFrom);
        this.run();
    }

    set step(step) {
        this._step = parseFloat(step);
        this.run();
    }

    run() {
        var _this = this;
        clearInterval(_this._timer);

        if (_this._duration && _this._step && _this._countFrom && _this._countTo) {
            var intermediate  = _this._countFrom;
            var increment     = Math.abs(_this._countTo - _this._countFrom) / ((_this._duration * 1000) / _this._step);
 
            _this.countChange.emit(intermediate);

            _this._timer = setInterval(function() {
                if (_this._countTo < _this._countFrom) {
                    if (intermediate <= _this._countTo) {
                        clearInterval(_this._timer);
                        _this.countChange.emit(_this._countTo);
                    } else {
                        _this.countChange.emit(intermediate);
                        intermediate -= increment;
                    }
                } else {
                    if (intermediate >= _this._countTo) {
                        clearInterval(_this._timer);
                        _this.countChange.emit(_this._countTo);
                    } else {
                        _this.countChange.emit(intermediate);
                        intermediate += increment;
                    }
                }
            }, _this._step);
        }
    }
}