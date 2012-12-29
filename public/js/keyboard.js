document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65) {
        AudioletApp.start();
    }
    else if(event.keyCode == 83) {
        AudioletApp.stop();
    }
});

