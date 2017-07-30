(function () {
'use strict';

var images = new Map();

function getImage(path) {
  var image = images.get(path);

  if (image) {
    return image.loaded ? image : null;
  } else {
    image = new Image();
    image.loaded = false;

    image.addEventListener('load', function () {
      image.loaded = true;
    });

    image.src = path;

    images.set(path, image);

    return getImage(path);
  }
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Road = function () {
  function Road(y, color) {
    classCallCheck(this, Road);

    this.y = y;
    this.color = color;
  }

  createClass(Road, [{
    key: 'update',
    value: function update(elapsed, speed) {
      this.y += elapsed * speed;

      if (this.y > 480) {
        this.y -= 640;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var image = getImage('images/road.png');

      if (image) {
        context.drawImage(image, 0, this.y);
      } else {
        context.fillStyle = this.color;
        context.fillRect(0, this.y, 640, 160);
      }
    }
  }]);
  return Road;
}();

var Particle = function () {
  function Particle() {
    classCallCheck(this, Particle);

    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.lifetime = 0;
    this.color = 'white';
  }

  createClass(Particle, [{
    key: 'update',
    value: function update(elapsed, speed) {
      if (this.lifetime > 0) {
        this.x += elapsed * this.dx;
        this.y += elapsed * this.dy * speed;
        this.lifetime -= elapsed;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      if (this.lifetime > 0) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 5, 5);
      }
    }
  }, {
    key: 'respawn',
    value: function respawn(x, y, color) {
      this.x = x - 2;
      this.y = y - 2;
      this.dx = (Math.random() > 0.5 ? -1 : 1) * (0.1 + Math.random() * 0.2);
      this.dy = (Math.random() > 0.5 ? -1 : 1) * (0.1 + Math.random() * 0.2);
      this.lifetime = 300;
      this.color = color;
    }
  }]);
  return Particle;
}();

var Battery = function () {
  function Battery() {
    classCallCheck(this, Battery);

    this.particles = [];

    for (var i = 0; i < 25; i++) {
      this.particles.push(new Particle());
    }

    this.respawn();
  }

  createClass(Battery, [{
    key: 'update',
    value: function update(elapsed, speed) {
      this.y += elapsed * speed;

      if (this.y > 480) {
        this.respawn();
      }
    }
  }, {
    key: 'updateParticles',
    value: function updateParticles(elapsed, speed) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var particle = _step.value;

          particle.update(elapsed, speed);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var image = getImage('images/battery.png');

      if (image) {
        context.drawImage(image, this.x, this.y);
      } else {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, 40, 30);
      }
    }
  }, {
    key: 'drawParticles',
    value: function drawParticles(context) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.particles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var particle = _step2.value;

          particle.draw(context);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'respawn',
    value: function respawn() {
      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (emit) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.particles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var particle = _step3.value;

            particle.respawn(this.x + 20, this.y + 15, 'lime');
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      this.x = 90 + Math.floor(Math.random() * 5) * 105;
      this.y = -100 - Math.random() * 5000;
    }
  }]);
  return Battery;
}();

var Obstacle = function () {
  function Obstacle() {
    classCallCheck(this, Obstacle);

    this.particles = [];

    for (var i = 0; i < 25; i++) {
      this.particles.push(new Particle());
    }

    this.respawn();
  }

  createClass(Obstacle, [{
    key: 'update',
    value: function update(elapsed, speed) {
      this.y += elapsed * speed;

      if (this.y > 480) {
        this.respawn();
      }
    }
  }, {
    key: 'updateParticles',
    value: function updateParticles(elapsed, speed) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var particle = _step.value;

          particle.update(elapsed, speed);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var image = getImage('images/' + this.type + '.png');

      if (image) {
        context.drawImage(image, this.x, this.y);
      } else {
        switch (this.type) {
          case 'slowdown':
            context.fillStyle = 'red';
            break;
          case 'speedup':
            context.fillStyle = 'white';
            break;
          case 'freeze':
            context.fillStyle = 'lightblue';
            break;
          case 'drain':
            context.fillStyle = 'yellow';
            break;
          case 'energy':
            context.fillStyle = 'blue';
            break;
        }
        context.fillRect(this.x, this.y, 30, 30);
      }
    }
  }, {
    key: 'drawParticles',
    value: function drawParticles(context) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.particles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var particle = _step2.value;

          particle.draw(context);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'respawn',
    value: function respawn() {
      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (emit) {
        var color = void 0;

        switch (this.type) {
          case 'slowdown':
            color = 'red';
            break;
          case 'speedup':
            color = 'white';
            break;
          case 'freeze':
            color = 'lightblue';
            break;
          case 'drain':
            color = 'yellow';
            break;
          case 'energy':
            color = 'blue';
            break;
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.particles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var particle = _step3.value;

            particle.respawn(this.x + 15, this.y + 15, color);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      this.x = 95 + Math.floor(Math.random() * 5) * 105;
      this.y = -100 - Math.random() * 5000;

      var type = Math.random();

      if (type > 0.8) {
        this.type = 'slowdown';
      } else if (type > 0.6) {
        this.type = 'speedup';
      } else if (type > 0.4) {
        this.type = 'freeze';
      } else if (type > 0.2) {
        this.type = 'drain';
      } else {
        this.type = 'energy';
      }
    }
  }]);
  return Obstacle;
}();

function intersect(ax, ay, aw, ah, bx, by, bw, bh) {
         return !(ax + aw < bx || ay + ah < by || ax > bx + bw || ay > by + bh);
}

var Bus = function () {
  function Bus() {
    classCallCheck(this, Bus);

    this.particles = [];

    for (var i = 0; i < 25; i++) {
      this.particles.push(new Particle());
    }

    this.respawn();
  }

  createClass(Bus, [{
    key: 'update',
    value: function update(elapsed, game) {
      this.freezeTimer -= elapsed;

      if (this.freezeTimer <= 0) {
        this.freezeTimer = 0;

        if (game.leftDown) {
          this.x -= elapsed * 0.5 * this.speed;
        }

        if (game.rightDown) {
          this.x += elapsed * 0.5 * this.speed;
        }
      }

      if (this.x < 50) {
        this.x = 50;
      }

      if (this.x > 540) {
        this.x = 540;
      }

      this.speed += elapsed * 0.00001;

      if (this.speed > 2) {
        this.speed = 2;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = game.batteries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var battery = _step.value;

          if (intersect(this.x, this.y, 50, 130, battery.x, battery.y, 40, 30)) {
            this.energy += 10;

            game.shake();
            battery.respawn(true);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = game.obstacles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var obstacle = _step2.value;

          if (intersect(this.x, this.y, 50, 130, obstacle.x, obstacle.y, 30, 30)) {
            switch (obstacle.type) {
              case 'slowdown':
                this.speed -= 0.25;
                break;
              case 'speedup':
                this.speed += 0.25;
                break;
              case 'freeze':
                this.freezeTimer = 2000;
                break;
              case 'drain':
                this.energy -= 10;
                break;
              case 'energy':
                this.energy += 10;
                break;
            }

            game.shake();
            obstacle.respawn(true);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.ox = Math.random() * 2 - 1;

      if (this.speed < 0.5) {
        this.speed = 0.5;
      }

      if (this.energy > 100) {
        this.energy = 100;
      }

      this.energy -= elapsed * this.speed * 0.01;

      if (this.freezeTimer > 0) {
        if (Math.random() > 0.5) {
          this.particles[this.lastParticle].respawn(this.x + Math.random() * 50, this.y + Math.random() * 130, 'lightblue');
          this.lastParticle = (this.lastParticle + 1) % this.particles.length;
        }
      }

      if (this.energy <= 0) {
        this.energy = 0;
        return false;
      }

      return true;
    }
  }, {
    key: 'updateParticles',
    value: function updateParticles(elapsed) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.particles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var particle = _step3.value;

          particle.update(elapsed, this.speed);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var image = void 0;

      if (this.freezeTimer > 0) {
        image = getImage('images/frozenBus.png');
      } else {
        image = getImage('images/bus.png');
      }

      if (image) {
        context.drawImage(image, this.x, this.y);
      } else {
        context.fillStyle = 'blue';
        if (this.freezeTimer > 0) {
          context.fillStyle = 'lightblue';
        }
        context.fillRect(this.x + this.ox, this.y, 50, 130);
      }
    }
  }, {
    key: 'drawParticles',
    value: function drawParticles(context) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.particles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var particle = _step4.value;

          particle.draw(context);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: 'respawn',
    value: function respawn() {
      this.x = 295;
      this.y = 260;
      this.energy = 100;
      this.speed = 0.5;
      this.freezeTimer = 0;
      this.lastParticle = 0;
      this.ox = 0;
    }
  }]);
  return Bus;
}();

var BatteryIndicator = function () {
  function BatteryIndicator() {
    classCallCheck(this, BatteryIndicator);

    this.x = 0;
  }

  createClass(BatteryIndicator, [{
    key: 'update',
    value: function update(batteries) {
      var chosen = void 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = batteries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var battery = _step.value;

          if (battery.y < 0) {
            if (!chosen || chosen.y < battery.y) {
              chosen = battery;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.x = chosen.x;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var image = getImage('images/batteryIndicator.png');

      if (image) {
        context.drawImage(image, this.x, 0);
      } else {
        context.fillStyle = 'green';
        context.fillRect(this.x, 0, 40, 30);
      }
    }
  }]);
  return BatteryIndicator;
}();

var EnergyMeter = function () {
  function EnergyMeter() {
    classCallCheck(this, EnergyMeter);

    this.energy = 100;
    this.flashTimer = 0;
  }

  createClass(EnergyMeter, [{
    key: 'update',
    value: function update(elapsed, energy) {
      if (this.flashTimer > 0) {
        this.flashTimer -= elapsed;
      }

      if (Math.abs(this.energy - energy) >= 5) {
        this.flashTimer = 100;
      }

      this.energy = energy;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = 'white';
      context.fillRect(50, 420, 540, 30);
      context.fillStyle = 'black';
      context.fillRect(55, 425, 530, 20);
      context.fillStyle = this.flashTimer > 0 ? 'white' : 'hsl(' + this.energy + ', 100%, 50%)';
      context.fillRect(55, 425, this.energy / 100 * 530, 20);
    }
  }]);
  return EnergyMeter;
}();

var DistanceDisplay = function () {
  function DistanceDisplay() {
    classCallCheck(this, DistanceDisplay);

    this.distance = 0;
  }

  createClass(DistanceDisplay, [{
    key: 'update',
    value: function update(distance) {
      this.distance = distance;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.font = '22px sans-serif';
      context.textAlign = 'left';
      context.fillStyle = 'black';
      context.fillText('Distance: ' + Math.floor(this.distance), 10, 24);
      context.fillStyle = 'yellow';
      context.fillText('Distance: ' + Math.floor(this.distance), 12, 26);
    }
  }]);
  return DistanceDisplay;
}();

var TitleScreen = function () {
  function TitleScreen() {
    classCallCheck(this, TitleScreen);

    this.ox = 0;
    this.oy = 0;
    this.h = 0;
    this.timestamp = 0;
  }

  createClass(TitleScreen, [{
    key: 'update',
    value: function update(elapsed) {
      this.timestamp += elapsed / 200;
      this.ox = Math.cos(this.timestamp);
      this.oy = Math.sin(this.timestamp);
      this.h += elapsed * 0.1;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.textAlign = 'center';
      context.font = '52px sans-serif';
      context.fillStyle = 'black';
      context.fillText('Teslabus', 320 + this.ox * 4, 150 + this.oy * 4);
      context.fillStyle = 'hsl(' + this.h + ', 100%, 50%)';
      context.fillText('Teslabus', 320, 150);

      context.font = '32px sans-serif';
      context.fillStyle = 'black';
      context.fillText('Drive an electric bus as far as you can!', 322, 202);
      context.fillStyle = 'yellow';
      context.fillText('Drive an electric bus as far as you can!', 320, 200);

      context.font = '32px sans-serif';
      context.fillStyle = 'black';
      context.fillText('Made by Attila Horvath for Ludum Dare 39.', 322, 292);
      context.fillStyle = 'yellow';
      context.fillText('Made by Attila Horvath for Ludum Dare 39.', 320, 290);

      context.fillStyle = 'black';
      context.fillText('Press [Space] to start.', 320, 370);
      context.fillStyle = 'white';
      context.fillText('Press [Space] to start.', 322, 372);
    }
  }]);
  return TitleScreen;
}();

var GameOverScreen = function () {
  function GameOverScreen() {
    classCallCheck(this, GameOverScreen);

    this.ox = 0;
    this.oy = 0;
    this.h = 0;
    this.timestamp = 0;
    this.distance = 0;
  }

  createClass(GameOverScreen, [{
    key: 'update',
    value: function update(elapsed, distance) {
      this.timestamp += elapsed / 200;
      this.ox = Math.cos(this.timestamp);
      this.oy = Math.sin(this.timestamp);
      this.distance = distance;
      this.h += elapsed * 0.1;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.textAlign = 'center';
      context.font = '52px sans-serif';
      context.fillStyle = 'black';
      context.fillText('Game Over', 320 + this.ox * 4, 150 + this.oy * 4);
      context.fillStyle = 'hsl(' + this.h + ', 100%, 50%)';
      context.fillText('Game Over', 320, 150);

      context.font = '32px sans-serif';
      context.fillStyle = 'black';
      context.fillText('You drove for ' + Math.floor(this.distance) + ' meters!', 322, 202);
      context.fillStyle = 'yellow';
      context.fillText('You drove for ' + Math.floor(this.distance) + ' meters!', 320, 200);

      context.fillStyle = 'black';
      context.fillText('Press [Space] to try again.', 320, 370);
      context.fillStyle = 'white';
      context.fillText('Press [Space] to try again.', 322, 372);
    }
  }]);
  return GameOverScreen;
}();

var FpsCounter = function () {
  function FpsCounter() {
    classCallCheck(this, FpsCounter);

    this.frames = 0;
    this.elapsed = 0;
    this.fps = 0;
  }

  createClass(FpsCounter, [{
    key: 'update',
    value: function update(elapsed) {
      this.elapsed += elapsed;
      this.frames++;

      if (this.elapsed >= 1000) {
        this.fps = this.frames;
        this.frames = 0;
        this.elapsed -= 1000;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.font = '14px sans-serif';
      context.textAlign = 'left';
      context.fillStyle = 'black';
      context.fillText('FPS: ' + this.fps, 570, 20);
      context.fillStyle = 'white';
      context.fillText('FPS: ' + this.fps, 571, 21);
    }
  }]);
  return FpsCounter;
}();

var Game = function () {
  function Game() {
    var _this = this;

    classCallCheck(this, Game);

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');

    this.leftDown = false;
    this.rightDown = false;

    addEventListener('keydown', function (event) {
      switch (event.which) {
        case 37:
          _this.leftDown = true;
          break;
        case 39:
          _this.rightDown = true;
          break;
      }
    });

    addEventListener('keyup', function (event) {
      switch (event.which) {
        case 37:
          _this.leftDown = false;
          break;
        case 39:
          _this.rightDown = false;
          break;
        case 32:
          if (!_this.started) {
            _this.started = true;
            _this.active = true;
          } else if (!_this.active) {
            _this.reset();
            _this.active = true;
          }
      }
    });

    this.started = false;
    this.active = false;
    this.lastTimestamp = 0;
    this.distance = 0;
    this.shakeTimer = 0;

    this.roads = [new Road(-160, 'gray'), new Road(0, 'darkgray'), new Road(160, 'gray'), new Road(320, 'darkgray')];

    this.batteries = [];
    this.obstacles = [];

    for (var i = 0; i < 4; i++) {
      this.batteries.push(new Battery());
    }

    for (var _i = 0; _i < 6; _i++) {
      this.obstacles.push(new Obstacle());
    }

    this.bus = new Bus();
    this.energyMeter = new EnergyMeter();
    this.batteryIndicator = new BatteryIndicator();
    this.distanceDisplay = new DistanceDisplay();
    this.titleScreen = new TitleScreen();
    this.gameOverScreen = new GameOverScreen();
    this.fpsCounter = new FpsCounter();
  }

  createClass(Game, [{
    key: 'update',
    value: function update(timestamp) {
      var elapsed = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      this.context.fillStyle = 'black';
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.titleScreen.update(elapsed);
      this.gameOverScreen.update(elapsed, this.distance);
      this.fpsCounter.update(elapsed);

      if (this.shakeTimer > 0) {
        this.shakeTimer -= elapsed;
      }

      if (!this.active) {
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.batteries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var battery = _step.value;

          battery.update(elapsed, this.bus.speed);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.obstacles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var obstacle = _step2.value;

          obstacle.update(elapsed, this.bus.speed);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (!this.bus.update(elapsed, this)) {
        this.active = false;
      }

      this.bus.updateParticles(elapsed);

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.batteries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _battery = _step3.value;

          _battery.updateParticles(elapsed, this.bus.speed);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.obstacles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _obstacle = _step4.value;

          _obstacle.updateParticles(elapsed, this.bus.speed);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this.distance += elapsed * this.bus.speed * 0.01;

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.roads[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var road = _step5.value;

          road.update(elapsed, this.bus.speed);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this.batteryIndicator.update(this.batteries);
      this.energyMeter.update(elapsed, this.bus.energy);
      this.distanceDisplay.update(this.distance);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.context.setTransform(1, 0, 0, 1, 0, 0);

      if (this.shakeTimer > 0) {
        this.context.translate(Math.random() * 8 - 4, Math.random() * 8 - 4);
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.roads[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var road = _step6.value;

          road.draw(this.context);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.batteries[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var battery = _step7.value;

          battery.draw(this.context);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.obstacles[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var obstacle = _step8.value;

          obstacle.draw(this.context);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      this.bus.draw(this.context);

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.batteries[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _battery2 = _step9.value;

          _battery2.drawParticles(this.context);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.obstacles[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _obstacle2 = _step10.value;

          _obstacle2.drawParticles(this.context);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      this.bus.drawParticles(this.context);

      if (this.active) {
        this.batteryIndicator.draw(this.context);
      }

      this.energyMeter.draw(this.context);
      this.distanceDisplay.draw(this.context);

      if (!this.started) {
        this.titleScreen.draw(this.context);
      } else if (!this.active) {
        this.gameOverScreen.draw(this.context);
      }

      this.fpsCounter.draw(this.context);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.distance = 0;
      this.bus.respawn();
    }
  }, {
    key: 'shake',
    value: function shake() {
      this.shakeTimer = 400;
    }
  }]);
  return Game;
}();

var game = new Game();

var updateGame = function updateGame(timestamp) {
  requestAnimationFrame(updateGame);

  game.update(timestamp);
  game.draw();
};

requestAnimationFrame(updateGame);

}());
