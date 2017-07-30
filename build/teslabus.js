(function () {
'use strict';

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
    key: "update",
    value: function update(elapsed, speed) {
      this.y += elapsed * speed;

      if (this.y > 480) {
        this.y -= 640;
      }
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.fillStyle = this.color;
      context.fillRect(0, this.y, 640, 160);
    }
  }]);
  return Road;
}();

var Battery = function () {
  function Battery() {
    classCallCheck(this, Battery);

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
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = 'green';
      context.fillRect(this.x, this.y, 40, 30);
    }
  }, {
    key: 'respawn',
    value: function respawn() {
      this.x = 50 + Math.random() * 510;
      this.y = -100 - Math.random() * 5000;
    }
  }]);
  return Battery;
}();

var Obstacle = function () {
  function Obstacle() {
    classCallCheck(this, Obstacle);

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
    key: 'draw',
    value: function draw(context) {
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
  }, {
    key: 'respawn',
    value: function respawn() {
      this.x = 50 + Math.random() * 510;
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

    this.x = 100;
    this.y = 260;
    this.energy = 100;
    this.speed = 0.5;
    this.freezeTimer = 0;
  }

  createClass(Bus, [{
    key: 'update',
    value: function update(elapsed, leftDown, rightDown, batteries, obstacles) {
      this.freezeTimer -= elapsed;

      if (this.freezeTimer <= 0) {
        this.freezeTimer = 0;

        if (leftDown) {
          this.x -= elapsed * 0.5;
        }

        if (rightDown) {
          this.x += elapsed * 0.5;
        }
      }

      this.speed += elapsed * 0.00001;

      if (this.speed > 2) {
        this.speed = 2;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = batteries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var battery = _step.value;

          if (intersect(this.x, this.y, 50, 130, battery.x, battery.y, 40, 30)) {
            this.energy += 10;

            battery.respawn();
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
        for (var _iterator2 = obstacles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

            obstacle.respawn();
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

      if (this.speed < 0.5) {
        this.speed = 0.5;
      }

      if (this.energy > 100) {
        this.energy = 100;
      }

      this.energy -= elapsed * this.speed * 0.01;

      if (this.energy <= 0) {
        this.energy = 0;
        return false;
      }

      return true;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = 'blue';
      if (this.freezeTimer > 0) {
        context.fillStyle = 'lightblue';
      }
      context.fillRect(this.x, this.y, 50, 130);
    }
  }]);
  return Bus;
}();

var EnergyMeter = function () {
  function EnergyMeter() {
    classCallCheck(this, EnergyMeter);

    this.energy = 100;
  }

  createClass(EnergyMeter, [{
    key: 'update',
    value: function update(energy) {
      this.energy = energy;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = 'white';
      context.fillRect(50, 420, 540, 30);
      context.fillStyle = 'black';
      context.fillRect(55, 425, 530, 20);
      context.fillStyle = 'hsl(' + this.energy + ', 100%, 50%)';
      context.fillRect(55, 425, this.energy / 100 * 530, 20);
    }
  }]);
  return EnergyMeter;
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
      context.fillStyle = 'white';
      context.fillText('FPS: ' + this.fps, 10, 10);
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
      }
    });

    this.active = true;
    this.lastTimestamp = 0;

    this.roads = [new Road(-160, 'gray'), new Road(0, 'darkgray'), new Road(160, 'gray'), new Road(320, 'darkgray')];

    this.batteries = [new Battery(), new Battery(), new Battery(), new Battery()];

    this.obstacles = [new Obstacle(), new Obstacle(), new Obstacle(), new Obstacle(), new Obstacle(), new Obstacle()];

    this.bus = new Bus();
    this.energyMeter = new EnergyMeter();
    this.fpsCounter = new FpsCounter();
  }

  createClass(Game, [{
    key: 'update',
    value: function update(timestamp) {
      var elapsed = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      this.context.fillStyle = 'black';
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

      if (!this.bus.update(elapsed, this.leftDown, this.rightDown, this.batteries, this.obstacles)) {
        this.active = false;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.roads[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var road = _step3.value;

          road.update(elapsed, this.bus.speed);
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

      this.energyMeter.update(this.bus.energy);
      this.fpsCounter.update(elapsed);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.roads[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var road = _step4.value;

          road.draw(this.context);
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

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.batteries[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var battery = _step5.value;

          battery.draw(this.context);
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

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.obstacles[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var obstacle = _step6.value;

          obstacle.draw(this.context);
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

      this.bus.draw(this.context);
      this.energyMeter.draw(this.context);
      this.fpsCounter.draw(this.context);
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
