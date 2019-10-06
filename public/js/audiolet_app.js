var AudioletApp = new function() {
    var audiolet = new Audiolet();
    var punkConsole = new AtariPunkConsole(audiolet, 20000, 20000);
    var connected = false;

    this.start = function() {
        if (! connected) {
            punkConsole.connect(audiolet.output);
            connected = true;
            audiolet.device.sink._context.resume();
        }
    };

    this.stop = function() {
        audiolet.device.sink._context.suspend();
        punkConsole.clearBuffer();
        punkConsole.disconnect(audiolet.output);
        connected = false;
    };

    this.setR1 = function(r1) {
        punkConsole.changeR1(r1);
    };

    this.setR3 = function(r3) {
        punkConsole.changeR3(r3);
    };

    this.sampleBuffer = function() {
        return punkConsole.sampleBuffer;
    }
};
