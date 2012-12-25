document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65) {
        AudioletApp.start(parseFloat($('#r1').val()),parseFloat($('#r3').val()));
    }
    else if(event.keyCode == 83) {
        AudioletApp.stop();
    }
});

