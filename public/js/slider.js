$(function(){
    var $pad = $(".pad").xy({
                           displayPrevious:false
                           , cursor: 10
                           , min : 1000
                           , max : 50000
                           , fgColor:"#222222"
                           , bgColor:"#EEEEEE"
                           , change : function (value) {
                               AudioletApp.setR1(value[0]);
                               AudioletApp.setR3(value[1]);
                           }})
});

