(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function(strings) {
  if (typeof strings === 'string') strings = [strings]
  var exprs = [].slice.call(arguments,1)
  var parts = []
  for (var i = 0; i < strings.length-1; i++) {
    parts.push(strings[i], exprs[i] || '')
  }
  parts.push(strings[i])
  return parts.join('')
}

},{}],2:[function(require,module,exports){
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
      caret.style.borderRight = "0.3rem solid #000";
    } else {
      caret.style.borderRight = "0rem solid transparent";
    }
    showCaret = !showCaret;
  }, 500);
};

// FULLSCREEN TOGGLE
let fullscreenToggle = document.querySelector('#gameboy-fullscreen-toggle');
if (fullscreenToggle) fullscreenToggle.addEventListener('click', function () {
  if (document.fullscreenElement) { // if already full screen exit
    document.exitFullscreen();
  } else { // else go fullscreen
    /* document.querySelector('#hero-gameboy').style.backgroundColor = "rgb(53, 0, 151)"; */
    let gameboy = document.querySelector('#hero-gameboy');
    if (gameboy) gameboy.requestFullscreen();
  }
});

// MOBILE 
let isMobile = false;
const mediaQuery = window.matchMedia("(max-width: 768px)");

if (mediaQuery.matches) {
  isMobile = true;
} else {
  isMobile = false;
}

// 3D CARD EFFECT
if (!isMobile) {
  const cards = document.querySelectorAll('.card');

  function createRotateToMouseHandler(card) {
    let bounds;

    return (e) => {
      const bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.left;
      const topY = mouseY - bounds.top;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      card.style.transform = `
      perspective(3000px) 
      scale3d(1.05, 1.05, 1.05)
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
        #dd88ff80,
        #0000000f
      )
    `;

      card.style.zIndex = 4;
      // Add a one-time event listener for the 'transitionend' event
      card.addEventListener('transitionend', function resetZIndex(event) {
        // Make sure we are listening for the correct property, e.g., 'transform'
        if (event.propertyName === 'transform') {
          card.style.zIndex = 5; // place at scaled up z index
          // Remove the event listener so it only triggers once
          card.removeEventListener('transitionend', resetZIndex);
        }
      });
    };
  }

  cards.forEach((card) => {
    const rotateToMouse = createRotateToMouseHandler(card);

    card.addEventListener('mouseenter', () => {
      document.addEventListener('mousemove', rotateToMouse);
    });

    card.addEventListener('mouseleave', () => {
      // Remove the mousemove event listener
      document.removeEventListener('mousemove', rotateToMouse);

      // Reset the transform and background styles immediately
      card.style.transform = '';
      card.style.background = '';

      card.style.zIndex = 3; // place below cards transitioning up
      // Add a one-time event listener for the 'transitionend' event
      card.addEventListener('transitionend', function resetZIndex(event) {
        // Make sure we are listening for the correct property, e.g., 'transform'
        if (event.propertyName === 'transform') {
          card.style.zIndex = 0; // place at default z index
          // Remove the event listener so it only triggers once
          card.removeEventListener('transitionend', resetZIndex);
        }
      });
    });
  });

}


// OVERLAY 
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlay-content');
const closeOverlayButton = document.getElementById('overlay-close');
const projectElements = document.querySelectorAll('.card');
const mainContent = document.getElementById('main-content');

let overlayIsOpen = false;

function openOverlay(projectInfo) {
  const projectInfoContainer = document.getElementById(projectInfo + '-info');
  if (projectInfoContainer) {
    // Display the overlay and show the specific project info container
    overlay.style.display = 'flex';
    projectInfoContainer.style.display = 'flex';
    // Add the 'fade-element' class to elements to be faded
    //mainContent.classList.add('fade');
    // disable scrolling
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
    overlay.style.opacity = 1;
    /* overlay.style.transform = 'translateY(0px)'; */

    overlayIsOpen = true;

    // Push a new state to the browser's history representing the overlay URL
    history.pushState({ overlayIsOpen: true }, '', '/overlay');
  }
}

function closeOverlay() {
  // Add a class to start the fade out transition
  overlay.style.opacity = '0';
  /* overlay.style.transform = 'translateY(20px)'; */

  overlayIsOpen = false;
  // Remove the state associated with the overlay
  history.replaceState(null, '', '/');

  // Remove the 'fade-element' class from faded elements
  mainContent.classList.remove('fade');

  // Get all the YouTube iframes in your overlay content
  const youtubeIframes = overlayContent.querySelectorAll('iframe');

  // Loop through each iframe and stop the video
  youtubeIframes.forEach((iframe) => {
    const iframeSrc = iframe.getAttribute('src');
    // Check if it's a YouTube iframe
    if (iframeSrc && iframeSrc.includes('youtube.com')) {
      // Replace the src with the same URL to stop the video
      iframe.setAttribute('src', iframeSrc);
    }
  });

  // Listen for the 'transitionend' event on the overlay
  overlay.addEventListener('transitionend', function onTransitionEnd() {
    // Remove the event listener to prevent multiple calls
    overlay.removeEventListener('transitionend', onTransitionEnd);

    // Hide the overlay once the transition is complete
    overlay.style.display = 'none';

    // Re-enable scrolling of the underlying content
    document.body.style.overflow = 'auto';

    // Hide the specific project info container
    const projectInfoContainers = document.querySelectorAll('.project-info');
    projectInfoContainers.forEach((container) => {
      container.style.display = 'none';
    });
  });
}

// Add click event listeners to project elements
projectElements.forEach((projectElement) => {
  projectElement.addEventListener('click', (event) => {
    const projectInfo = projectElement.getAttribute('data-project-info');
    openOverlay(projectInfo);
  });
});

// Add a click event listener to the close button
closeOverlayButton.addEventListener('click', closeOverlay);

// On mouse move over the overlay
overlay.addEventListener('mousemove', (e) => {
  // Get the bounds of the content within the overlay
  const contentBounds = overlayContent.getBoundingClientRect();

  // Check if the cursor position is outside the content bounds
  if (
    e.clientX < contentBounds.left ||
    e.clientX > contentBounds.right ||
    e.clientY < contentBounds.top ||
    e.clientY > contentBounds.bottom
  ) {
    overlay.style.cursor = 'pointer';
    closeOverlayButton.classList.add('overlay-close-hover');
  } else {
    overlay.style.cursor = 'default';
    closeOverlayButton.classList.remove('overlay-close-hover');
  }
});

// On click outside of the content bounds
overlay.addEventListener('click', (e) => {
  // Get the bounds of the content within the overlay
  const contentBounds = overlayContent.getBoundingClientRect();

  // Check if the clicked position is outside the content bounds
  if (
    e.clientX < contentBounds.left ||
    e.clientX > contentBounds.right ||
    e.clientY < contentBounds.top ||
    e.clientY > contentBounds.bottom
  ) {
    closeOverlay();
  }
});

// Handle user navigation
window.addEventListener('popstate', function (event) {
  // Check if the state represents an open overlay
  (overlayIsOpen) ? closeOverlay() : openOverlay();
});


/* DYNAMICALLY ROUNDED GRID CORNERS */

function updateCornerStyles() {
  const cards = Array.from(document.querySelectorAll('#project-list .project, #project-list .project-featured'));

  // Reset all border-radius values
  cards.forEach(card => card.style.borderRadius = '');

  if (cards.length === 0) return;

  let currentTop = cards[0].offsetTop;
  let firstRow = [];
  let lastRow = [];

  cards.forEach((card) => {
    if (card.offsetTop !== currentTop) {
      lastRow = [card];  // Start a new last row when a new row begins
      currentTop = card.offsetTop;  // Update currentTop for the new row
    } else {
      lastRow.push(card);
    }

    // Populate the first row
    if (firstRow.length === 0 || card.offsetTop === firstRow[0].offsetTop) {
      firstRow.push(card);
    }
  });

  // Apply border-radius to corners of the first and last rows
  const radius = '40px';
  if (firstRow.length > 0) {
    firstRow[0].style.borderTopLeftRadius = radius;  // Top-left corner
    firstRow[firstRow.length - 1].style.borderTopRightRadius = radius;  // Top-right corner
  }

  if (lastRow.length > 0) {
    lastRow[0].style.borderBottomLeftRadius = radius;  // Bottom-left corner
    lastRow[lastRow.length - 1].style.borderBottomRightRadius = radius;  // Bottom-right corner
  }
}

/* // Run the function initially
updateCornerStyles();

// Update when the window resizes
window.addEventListener('resize', updateCornerStyles); */


/* ELASTIC ANIMATION */
let lastScrollY = 0;
let lastScrollTime = 0;  // Renamed from lastTime to lastScrollTime
let isScrolling = false;

// Initialize elastic states
const elements = Array.from(document.querySelectorAll('.elastic')).map((element) => {
  const baseMass = element.offsetWidth * element.offsetHeight;  // Base "mass" as width * height
  const randomFactor = Math.random() * 0.5 + 0.75;  // Random factor between 0.75 and 1.25
  const adjustedMass = baseMass * randomFactor;  // Adjust the base mass

  return {
    element: element,
    initialPosition: element.offsetTop,
    currentDisplacement: 0,
    velocity: 0,
    mass: adjustedMass  // Use the adjusted mass
  };
});

// When user scrolls
window.addEventListener('scroll', function() {
  const currentTime = new Date().getTime();
  const deltaTime = currentTime - lastScrollTime;
  const deltaScroll = window.scrollY - lastScrollY;

  // Calculate velocity (distance over time)
  const velocity = deltaScroll / deltaTime;

  // Update last values
  lastScrollTime = currentTime;
  lastScrollY = window.scrollY;
  
  // Flag to indicate scrolling
  isScrolling = true;

  // Update elements
  elements.forEach((el) => {
    const inertiaFactor = 10000;  // You can adjust this to control overall inertia
    const adjustedVelocity = -(velocity * inertiaFactor) / el.mass;  // Velocity adjusted by "mass"
    el.velocity = adjustedVelocity;
  });
});


// Animation loop to handle the effect
function animate() {
  elements.forEach((el) => {
    if (isScrolling) {
      el.currentDisplacement += el.velocity;
      el.element.style.transform = `translateY(${el.currentDisplacement}px)`;
      el.velocity *= 0.9;
    } else {
      el.currentDisplacement *= 0.9;
      el.element.style.transform = `translateY(${el.currentDisplacement}px)`;
    }
  });

  // Reset the isScrolling flag
  isScrolling = false;

  // Continue the animation
  requestAnimationFrame(animate);
}

// Start the animation loop
/* animate(); */

















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
const fragShader = glsl(["// Fork from http://glslsandbox.com/e#8143.0\n#define PI 3.14159\n#define color_filter mat3(0.4, 0.4, 0.1, 0.0, 0.0, 0.2, 0.9, 0.6, 0.5)\n\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform float uRandomSeed;\nuniform vec2 uResolution;\nuniform float uTime;\nuniform vec2 uMouse;\nuniform float uMorph;\nuniform vec2 uGrid;\n\nconst int maxComplexity = 35; // complexity of curls/computation\nconst float mouseSpeed = 0.1;  // control the color changing\nconst float fixedOffset = 0.7;  // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.\nconst float fluidSpeed = 0.01; // Drives speed, smaller number will make it slower.\nconst float baseColor = 0.0;\nconst float BLUR = 0.47;\nconst float brightness = 0.8;\n\nfloat map(float value, float min1, float max1, float min2, float max2) {\n  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n}\n\n// more about noise: \n// http://thebookofshaders.com/11/\nfloat random(float x) {\n    return fract(sin(x) * uRandomSeed);\n}\n\nfloat random(vec2 st) {\n    return fract(sin(dot(st.xy, vec2(0.48764, 0.68567))) * uRandomSeed);\n}\n\nfloat noise(float x) {\n    float i = floor(x);\n    float f = fract(x);\n    return mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));\n}\n\nfloat noiseS(float x) {\n    return noise(x) * 2.0 - 1.0;\n}\n\nfloat grain(in vec2 st, float noiseTime) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n\n      // Four corners in 2D of a tile\n    float a = random(i);\n    float b = random(i + vec2(1.0, 0.0));\n    float c = random(i + vec2(0.0, 1.0));\n    float d = random(i + vec2(1.0, 1.0));\n\n      // Smooth Interpolation\n\n      // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f * f * (3.0 - 2.0 * f);\n      // u = smoothstep(0.,1.,f);\n\n      // Mix 4 coorners percentages\n    //return 0.0 + ((mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y) / 10.0) * 10.0;\n    return pow(random(st) + mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y, 0.5); //pow 0.5 to make grain more gray\n}\n\nvec3 blend(vec3 base, vec3 blend, float blendFactor) {\n    vec3 blendedColor;\n    if(base[0] + base[1] + base[2] < 1.5) { //1.5?\n        blendedColor = (2.0 * base * blend + base * base * (1.0 - 2.0 * blend));\n    } else {\n        blendedColor = (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));\n    }\n\n    blendedColor += 0.1 * blend;\n\n    return mix(base, blendedColor, blendFactor);\n}\n\nvoid main() {\n    vec2 p = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);\n    float t = uTime * fluidSpeed; // + uMorph;\n    float noiseTime = noise(t);\n    float noiseSTime = noiseS(t);\n    float noiseSTime1 = noiseS(t + 1.0);\n    float ratio = uGrid.x;\n\n    // adjust complexity according to viewport width\n    int complexity = int(map(ratio, 0.85, 1.5, 10.0, 35.0));\n    float blur = (BLUR + 0.14 * noiseSTime);\n    for(int i = 1; i <= maxComplexity; i++) {\n        p += blur / float(i) * sin(float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1)) + fixedOffset;\n        if (i >= complexity) break;\n    }\n    // p += uMouse * mouseSpeed; MOUSE INTERACTION\n\n    vec2 grid = uGrid * 2.0; // set complexity to 0 to debug the grid\n\n    // Modified color computation\n    float r = pow(0.5 * (1.0 + baseColor + sin(grid.x * p.x + 2.0 * noiseSTime)), 1.5) * brightness;\n    float g = pow(0.5 * (1.0 + baseColor + sin(grid.y * p.y + 3.0 * noiseSTime1)), 1.5) * brightness;\n    float b = pow(0.5 * (1.0 + baseColor + sin(p.x + p.y + noiseSTime)), 1.5) * brightness;\n\n    // Color filter\n    // Product between matrix filter and pixel color to get new color\n    vec3 color = vec3(r, g, b) * color_filter;\n\n    // Grain filter\n    vec2 st = gl_FragCoord.xy / uResolution.xy;\n    //vec2 pos = vec2(st * uResolution.xy);\n\n    //blend the noise over the background\n    vec3 blendColor = blend(color, vec3(grain(gl_FragCoord.xy, noiseSTime)), 0.3);\n\n    //get the luminance of the background\n    //float luminance = (color[0] + color[1] + color[2])/3.0;\n\n    //reduce the noise based on some \n    //threshold of the background luminance\n    //float response = smoothstep(0.05, 0.4, luminance);\n    //blendColor = mix(blendColor, color, pow(response, 0.5));\n\n    // Output to screen\n    gl_FragColor = vec4(blendColor, 1.0);\n    //gl_FragColor = vec4(vec3(grain(st.xy, noiseSTime)), 1.0);\n\n}"]);
const vertShader = glsl(["#define GLSLIFY 1\nattribute vec2 position;\nvoid main() {\n    gl_Position = vec4(position, 0, 1);\n}"]);
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
      const ratio = (1.5 + (viewportWidth / 1300)) / 1.5; // ratio between current width and average width 1300px
      return [ratio, ratio];
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


},{"glslify":1}]},{},[2]);
