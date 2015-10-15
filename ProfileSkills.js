//Fill bars after 1 second
function initSkills(){
    setTimeout(function () {
        var stats = document.querySelectorAll('.stat');

        for (var i = 0; i < stats.length; i++) {
            //Generate random speed for each bar
            var speed = Math.random() * 200;
            for (var j = 0; j < stats[i].querySelectorAll('.stat-bar-section-fill').length; j++) {
                (function(j, i, speed) {
                    setTimeout(function() { stats[i].querySelectorAll('.stat-bar-section-fill')[j].style.opacity = "1"; }, speed * j);
                })(j, i, speed);
            }
        }
    }, 1000);
}

function scrollSkillScroller(section) {
    //Maybe make the text fade between and the bars change to the new values instead?
    $(".content-scroller").stop().animate({ "margin": "0px 0px 0px " + (-630 * (section - 1)) + "px" }, 500);
    $(".content-scroller-frame:not(.content-scroller-frame:nth-of-type(" + section + "))").stop().animate({"opacity":"0"},500);
    $(".content-scroller-frame:nth-of-type(" + section + ")").stop().animate({ "opacity": "1" }, 500);
    $(".horizontal-subnavbar-tracker").stop().animate({ "margin": "0px 0px 0px " + $(".horizontal-subnavbar-item").width() * (section - 1) + "px" } , 200);
}

