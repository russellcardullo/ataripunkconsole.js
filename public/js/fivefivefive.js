function Astable(r1) {
    this.r1 = r1 || 1000.0;
    this.r2 = 1000.0;
    this.c1 = 0.0000001;
    this.frequency = function() {
        return 1.4 / ((this.r1 + (2 * this.r2)) * this.c1);
    };
    this.duty_cycle = function() {
        return (this.r1 + this.r2) / (this.r1 + (2.0 * this.r2));
    };
    this.output = function(t) {
        period = 1.0 / this.frequency();
        value = (t % period) / period;
        if (value < this.duty_cycle()) {
            return 1.0;
        } else {
            return -1.0;
        }
    };
}

function Monostable(r1) {
    this.r1 = r1 || 5000.0;
    this.c1 = 0.0000001;
    this.trigger = false;
    this.lastTrigger = 0;
    this.timePeriod = function() {
        return 1.1 * this.r1 * this.c1;
    };
    this.setTrigger = function(t) {
        if (! this.trigger) {
            this.trigger = true;
            this.lastTrigger = t;
        }
    };
    this.output = function(t) {
      if(this.trigger) {
          if( (t - this.lastTrigger) < this.timePeriod()) {
              return 1.0;
          } else {
              this.trigger = false;
              return -1.0;
          }
      } else {
        return -1.0;
      }
    };
}

var AtariPunkConsole = function(audiolet, r1, r3) {
    AudioletNode.call(this, audiolet, 2, 1);
    this.r1 = r1;
    this.r3 = r3;
    this.phase = 0.0;
    this.timer = new Astable(this.r1);
    this.trigger = new Monostable(this.r3);
    this.sampleBuffer = new Array();
    var numSamples = 1024;
    for (var i = 0; i < numSamples; i++) {
        this.sampleBuffer.push(0.0);
    }
};

extend(AtariPunkConsole, AudioletNode);

AtariPunkConsole.prototype.generate = function() {
    var output = this.outputs[0];
    var sampleRate = this.audiolet.device.sampleRate;

    if (this.timer.output(this.phase) <= 0.0) {
        this.trigger.setTrigger(this.phase);
    }
    output.samples[0] = this.trigger.output(this.phase);
    this.phase += (1.0 / sampleRate);

    // for visualization only
    this.sampleBuffer.push(output.samples[0]);
    this.sampleBuffer.shift();
};

AtariPunkConsole.prototype.clearBuffer = function() {
    for (var i = 0; i < this.sampleBuffer.length; i++) {
        this.sampleBuffer[i] = 0.0;
    }
    this.outputs[0].samples[0] = 0;
};

AtariPunkConsole.prototype.changeR1 = function(r1) {
    this.timer.r1 = r1;
};

AtariPunkConsole.prototype.changeR3 = function(r3) {
    this.trigger.r1 = r3;
};

AtariPunkConsole.prototype.toString = function() {
    return 'AtariPunkConsole';
};

