/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author Luje_fr / http://jcatala.art
 */
function Vector2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}
Object.defineProperties(Vector2.prototype, {
  "width": {
    get: function () {
      return this.x;
    },
    set: function (value) {
      this.x = value;
    }
  },
  "height": {
    get: function () {
      return this.y;
    },
    set: function (value) {
      this.y = value;
    }
  }
});
Object.assign(Vector2.prototype, {
  isVector2: true,
  set: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
  setScalar: function (scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  },
  setX: function (x) {
    this.x = x;
    return this;
  },
  setY: function (y) {
    this.y = y;
    return this;
  },
  setComponent: function (index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      default:
        throw new Error('index is out of range: ' + index);
    }
    return this;
  },
  getComponent: function (index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error('index is out of range: ' + index);
    }
  },
  clone: function () {
    return new this.constructor(this.x, this.y);
  },
  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  },
  add: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);
    }
    this.x += v.x;
    this.y += v.y;
    return this;
  },
  addScalar: function (s) {
    this.x += s;
    this.y += s;
    return this;
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  },
  addScaledVector: function (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  },
  sub: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);
    }
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },
  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    return this;
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },
  multiply: function (v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },
  multiplyScalar: function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  },
  divide: function (v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  },
  divideScalar: function (scalar) {
    return this.multiplyScalar(1 / scalar);
  },
  min: function (v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    return this;
  },
  max: function (v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    return this;
  },
  clamp: function (min, max) {
    // assumes min < max, componentwise
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    return this;
  },
  clampScalar: function () {
    var min = new Vector2();
    var max = new Vector2();
    return function clampScalar(minVal, maxVal) {
      min.set(minVal, minVal);
      max.set(maxVal, maxVal);
      return this.clamp(min, max);
    };
  }(),
  clampLength: function (min, max) {
    var length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  },
  floor: function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  },
  ceil: function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  },
  round: function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  },
  roundToZero: function () {
    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
    return this;
  },
  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  },
  dot: function (v) {
    return this.x * v.x + this.y * v.y;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  lengthManhattan: function () {
    return Math.abs(this.x) + Math.abs(this.y);
  },
  normalize: function () {
    return this.divideScalar(this.length() || 1);
  },
  angle: function () {
    // computes the angle in radians with respect to the positive x-axis
    var angle = Math.atan2(this.y, this.x);
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
  },
  distanceTo: function (v) {
    return Math.sqrt(this.distanceToSquared(v));
  },
  distanceToSquared: function (v) {
    var dx = this.x - v.x,
      dy = this.y - v.y;
    return dx * dx + dy * dy;
  },
  distanceToManhattan: function (v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  },
  setLength: function (length) {
    return this.normalize().multiplyScalar(length);
  },
  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  },
  lerpVectors: function (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  },
  equals: function (v) {
    return ((v.x === this.x) && (v.y === this.y));
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  },
  fromBufferAttribute: function (attribute, index, offset) {
    if (offset !== undefined) {
      console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');
    }
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    return this;
  },
  rotateAround: function (center, angle) {
    var c = Math.cos(angle),
      s = Math.sin(angle);
    var x = this.x - center.x;
    var y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }
});

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}


class Pointer {
  constructor(
    domElement, {
      scaleMin = 0.01,
      scaleMax = 10.0,
      pressureMax = 1.0,
      pressureDuration = 1000
    } = {}
  ) {
    if (Pointer.instance) {
      return Pointer.instance;
    }
    this.dom = domElement;
    this.opt = {
      scaleMin,
      scaleMax,
      pressureMax,
      pressureDuration
    };
    this.pressCheckInterval = 20;
    this.deltaPressure =
      (this.opt.pressureMax / this.opt.pressureDuration) *
      this.pressCheckInterval;
    this.position = new Vector2();
    this.zoomSpeed = 1.0;
    this.scale = 1.0;
    this.dollyStart = new Vector2();
    this.dollyEnd = new Vector2();
    this.dollyDelta = new Vector2();
    this.addMoveListener(this.onMove.bind(this));
    this.addDownListener(this.onDown.bind(this));
    this.addUpListener(this.onUp.bind(this));
    this.dom.addEventListener("touchstart", this._onTouchZoomStart, false);
    this.addZoomListener(this.onZoom.bind(this));
    this.isPressing = false;
    this.pressure = 0.0;
    Pointer.instance = this;
  }
  get zoomScale() {
    return Math.pow(0.95, this.zoomSpeed);
  }
  setScale(val) {
    this.scale = clamp(val, this.opt.scaleMin, this.opt.scaleMax);
  }
  updatePosition(clientX, clientY) {
    let size = Math.min(this.dom.clientWidth, this.dom.clientHeight);
    this.position.x = (clientX * 2 - this.dom.clientWidth) / size;
    this.position.y =
      ((this.dom.clientHeight - clientY) * 2 - this.dom.clientHeight) / size;
  }
  onMove(e) {
    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    this.updatePosition(x, y);
    // e.preventDefault();
  }
  addMoveListener(cb) {
    ["mousemove", "touchmove"].forEach((evtName) => {
      this.dom.addEventListener(evtName, cb, false);
    });
  }
  setPressure(val) {
    let valid = val <= this.opt.pressureMax && val >= 0.0;
    this.pressure = clamp(val, 0.0, this.opt.pressureMax);
    //   console.log(this.pressure);
    return valid;
  }
  onDown(e) {
    if (e instanceof MouseEvent && e.button !== Pointer.BUTTON.MOUSE_LEFT) {
      return;
    }
    this.isPressing = true;
    if (e.touches) {
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      this.updatePosition(x, y);
    }
    let intervalID = setInterval(() => {
      if (
        !this.isPressing ||
        !this.setPressure(this.pressure + this.deltaPressure)
      ) {
        clearInterval(intervalID);
      }
    }, this.pressCheckInterval);
    let pressingTest = setInterval(() => {
      if (this.isPressing) {
        var event = new CustomEvent("Pointer.pressing", {
          detail: this.pressure
        });
        this.dom.dispatchEvent(event);
      } else {
        clearInterval(pressingTest);
      }
    }, this.pressCheckInterval);
  }
  addDownListener(cb) {
    ["mousedown", "touchstart"].forEach((evtName) => {
      this.dom.addEventListener(evtName, cb, false);
    });
  }
  addPressingListener(cb) {
    ["Pointer.pressing", "Pointer.postpressing"].forEach((evtName) => {
      this.dom.addEventListener(evtName, cb, false);
    });
  }
  addPressingEndListener(cb) {
    this.dom.addEventListener("Pointer.pressingEnd", cb, false);
  }
  onUp(e) {
    if (e instanceof MouseEvent && e.button !== Pointer.BUTTON.MOUSE_LEFT) {
      return;
    }
    this.isPressing = false;
    let intervalID = setInterval(() => {
      if (
        this.isPressing ||
        !this.setPressure(this.pressure - this.deltaPressure)
      ) {
        var event = new CustomEvent("Pointer.pressingEnd", {
          detail: this.pressure
        });
        this.dom.dispatchEvent(event);
        clearInterval(intervalID);
      } else {
        var event = new CustomEvent("Pointer.postpressing", {
          detail: this.pressure
        });
        this.dom.dispatchEvent(event);
      }
    }, this.pressCheckInterval);
  }
  addUpListener(cb) {
    ["mouseup", "touchend"].forEach((evtName) => {
      this.dom.addEventListener(evtName, cb, false);
    });
  }
  _onTouchZoomStart(e) {
    if (e.touches.length !== 2) return;
    let dx = e.touches[0].pageX - e.touches[1].pageX;
    let dy = e.touches[0].pageY - e.touches[1].pageY;
    this.dollyStart.set(0, Math.sqrt(dx * dx + dy * dy));
  }
  _onTouchZoom(e) {
    var dx = e.touches[0].pageX - e.touches[1].pageX;
    var dy = e.touches[0].pageY - e.touches[1].pageY;
    this.dollyEnd.set(0, Math.sqrt(dx * dx + dy * dy));
    this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
    if (dollyDelta.y > 0) {
      this.zoomOut();
    } else if (dollyDelta.y < 0) {
      this.zoomIn();
    }
    this.dollyStart.copy(this.dollyEnd);
  }
  _onWheelZoom(e) {
    if (e.deltaY > 0) {
      this.zoomOut();
    } else if (e.deltaY < 0) {
      this.zoomIn();
    }
    //e.preventDefault(); // prevent page scroll down
  }
  onZoom(e) {
    if (e.touches) {
      this._onTouchZoom(e);
    } else {
      this._onWheelZoom(e);
    }
  }
  addZoomListener(cb) {
    ["wheel", "touchmove"].forEach((evtName) => {
      if (evtName === "touchmove") {
        cb = (e) => {
          return e.touches.length === 2 ? cb(e) : undefined;
        };
      }
      this.dom.addEventListener(evtName, cb, false);
    });
  }
  zoomIn(scaleFactor = this.zoomScale) {
    this.setScale(this.scale * scaleFactor);
  }
  zoomOut(scaleFactor = this.zoomScale) {
    this.setScale(this.scale / scaleFactor);
  }
}

Pointer.instance = null;
Pointer.BUTTON = {
  MOUSE_LEFT: 0,
  MOUSE_MIDDLE: 1,
  MOUSE_RIGHT: 2
};

// Dispatch mouseMove to the canvas from overlaying elements 
document.addEventListener('mousemove', function (e) {
  const newEvent = new MouseEvent('mousemove', {
    clientX: e.clientX,
    clientY: e.clientY,
    // other properties here
  });

  document.getElementById('main-background').dispatchEvent(newEvent);
});


// CREATE REGL
const glsl = require('glslify');
const fragShader = glsl.file('./retrolava_frag.glsl');
const vertShader = glsl.file('./retrolava_vert.glsl');
const regl = createREGL("#main-background");

const DEV = false;
const pointer = new Pointer(regl._gl.canvas);

const canvas = document.querySelector("#main-background");
canvas.width = Math.min(document.body.scrollWidth, 1920);
canvas.height = document.body.scrollHeight;
/* canvas.width = Math.min(window.innerWidth, 1920);
canvas.height = Math.min(window.innerHeight, 1920); */

console.log(canvas.width + " x " + canvas.height);

let lastPressingT,
  dtSec = 0,
  morphAmount = 0;
pointer.addPressingListener((e) => {
  lastPressingT = lastPressingT || Date.now();
  const nowInMs = Date.now();
  dtSec = (nowInMs - lastPressingT) / 1000;
  lastPressingT = nowInMs;
  morphAmount += dtSec * pointer.pressure * 0.1;
});
// Calling regl() creates a new partially evaluated draw command
const draw = regl({
  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: fragShader,
  vert: vertShader,
  // Here we define the vertex attributes for the above shader
  attributes: {
    // regl.buffer creates a new array buffer object
    position: regl.buffer([
      [-1, -1],
      [1, -1],
      [-1, 1], // no need to flatten nested arrays, regl automatically
      [-1, 1],
      [1, 1],
      [1, -1] // unrolls them into a typedarray (default Float32)
    ])
    // regl automatically infers sane defaults for the vertex attribute pointers
  },
  uniforms: {
    /* uResolution: ({
      viewportWidth,
      viewportHeight
    }) => [
      viewportWidth,
      viewportHeight
      ], */
    uResolution: () => [
      document.getElementById("main-background").width,
      document.getElementById("main-background").height
    ],
    uTime: ({
      tick
    }) => 0.01 * tick,
    uMouse: () => [pointer.position.x, pointer.position.y],
    uMorph: () => morphAmount,
    uRandomSeed: DEV ? 138975.579831 : new Date().getTime() % 1000000, //
    uGrid: ({
      viewportWidth,
      viewportHeight
    }) => {
      /* console.log("viewport " + viewportWidth + " " + viewportHeight);
      console.log(document.getElementById("main-background").width + " " + document.getElementById("main-background").height); */
      const ratio = 1.0;
      return viewportHeight >= viewportWidth ? [1, (viewportHeight / viewportWidth) * ratio] : [(viewportWidth / viewportHeight) * ratio, 1];
    },
  },
  // This tells regl the number of vertices to draw in this command
  count: 6
});
// regl.frame() wraps requestAnimationFrame and also handles viewport changes
let lastTime = 0;
const fps = 30;
const interval = 1000 / fps;

regl.frame(() => {
  const currentTime = Date.now();
  const elapsed = currentTime - lastTime;

  if (elapsed > interval) {
    // Save the last time we drew
    lastTime = currentTime - (elapsed % interval);

    // Your drawing code here
    draw();
  }
});

/* // Wait for the canvas to be generated
window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const container = document.getElementById('main-background');

  // Move the canvas into the container
  if (canvas && container) {
    container.appendChild(canvas);
    canvas.style.position = "relative";
    canvas.style.height = "100%";
    canvas.style.width = "100%";
  }
}); */


// HERO HEADLINE TYPEWRITER EFFECT
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 400;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  /* var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #fff }";
  document.body.appendChild(css); */

  // CARET BLINK ANIMATION
  let caret = document.querySelector("#hero-headline h2>span");
  let showCaret = true;
  setInterval(() => {
    if (showCaret) {
      caret.style.borderRight = "0.1em solid #fff";
    } else {
      caret.style.borderRight = "0em solid transparent";
    }
    showCaret = !showCaret;
  }, 500);
};

// FULLSCREEN TOGGLE
document.querySelector('#gameboy-fullscreen-toggle').addEventListener('click', function () {
  if (document.fullscreenElement) { // if already full screen exit
    document.exitFullscreen();
  } else { // else go fullscreen
    /* document.querySelector('#hero-gameboy').style.backgroundColor = "rgb(53, 0, 151)"; */
    document.querySelector('#hero-gameboy').requestFullscreen();
  }
});

// 3D CARD EFFECT
const cards = document.querySelectorAll('.card');

function createRotateToMouseHandler(card) {
  let bounds;

  return (e) => {
    if (!bounds) {
      bounds = card.getBoundingClientRect();
    }
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    card.style.transform = `
      perspective(1500px) 
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;

    card.querySelector('.glow').style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;

    // Bring the currently hovered card to the front
    cards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.style.zIndex = 0;
      }
    });
    card.style.zIndex = 10;
  };
}

cards.forEach((card) => {
  const rotateToMouse = createRotateToMouseHandler(card);

  card.addEventListener('mouseenter', () => {
    document.addEventListener('mousemove', rotateToMouse);
  });

  card.addEventListener('mouseleave', () => {
    document.removeEventListener('mousemove', rotateToMouse);
    card.style.transform = '';
    card.style.background = '';

    // Reset the z-index when the mouse leaves
    card.style.zIndex = 0;
  });
});

