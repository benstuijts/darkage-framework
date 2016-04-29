/**
 * The "abstract" base for MouseInputHandler and TouchInputHandler. This class is not
 * supposed to be instantiated directly. It provides the common base for touch and
 * mouse input handling.
 *
 * @param element the DOM element to work with - concrete input handlers will
 * register as event handlers of this element. In gamedev projects the
 * element is usually the main canvas
 */
import InputHandlerBase from './InputHandlerBase';
 
export default class InputHandler extends InputHandlerBase {
    constructor() {
        super();
        this._mouseDown = false;
        this._attachDomListeners();
    }

    _attachDomListeners() {
        const el = this._element;
        el.addEventListener("mousedown", this._onDownDomEvent.bind(this), false);
        el.addEventListener("mouseup", this._onUpDomEvent.bind(this), false);
        el.addEventListener("mousemove", this._onMoveDomEvent.bind(this));
        el.addEventListener("mouseout", this._onMouseOut.bind(this));
    }

    _onDownDomEvent(e) {
        this._mouseDown = true;
        InputHandlerBase.prototype._onDownDomEvent.call(this, e);
    };

_p._onUpDomEvent = function(e) {
    this._mouseDown = false;
    InputHandlerBase.prototype._onUpDomEvent.call(this, e);
};

/**
 * We process the move event only if the mouse button is
 * pressed, otherwise the DOM event is ignored.
 */
_p._onMoveDomEvent = function(e) {
    if (this._mouseDown) {
        InputHandlerBase.prototype._onMoveDomEvent.call(this, e);
    }
};

_p._onMouseOut = function() {
    this._mouseDown = false;
};
}
 
