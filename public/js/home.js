$(document).ready(function () {
    $("ul.navbar-nav > li").click(
        function (e) {
            // aboutme_waypoint.disable() ;

            Waypoint.disableAll();
            $('#navbar-main .navbar-nav').find('li.active').removeClass('active');
            $(this).addClass('active');

            var clicked_id = $(this).attr("id");
            var target_section_id = $(this).find('a').attr('href');

            // console.log('clicked id is: '+clicked_id);
            console.log('target section id is: ' + target_section_id);


            if (target_section_id !== '/blogs') {
                $('html, body').animate({
                    scrollTop: $(target_section_id).top
                }, 1000);

            }
            Waypoint.enableAll();

            return true;
        }
    );

    //!Auto-scroll change nav.

    //Default active on home
    // $('#home-nav-li').addClass("active");
    var home_waypoint = new Waypoint({
        element: document.querySelector('#home-section'),
        handler: function (e) {

            console.log('in home section');
            $('#navbar-main .navbar-nav').find('li.active').removeClass('active');
            $('#home-nav-li').addClass('active');
        },
        offset: '-21%'
    });


    var aboutme_waypoint = new Waypoint({
        element: document.querySelector('#aboutme-section'),
        handler: function (e) {

            console.log('in about section');
            $('#navbar-main .navbar-nav').find('li.active').removeClass('active');
            $('#aboutme-nav-li').addClass('active');
            //   countStart()
            //this.destroy() //for once
        },
        offset: '20%'
    });

    var experience_waypoint = new Waypoint({
        element: document.querySelector('#experience-section'),
        handler: function () {
            console.log('in experience section');
            $('#navbar-main .navbar-nav').find('li.active').removeClass('active');
            $('#experience-nav-li').addClass('active');
        },
        offset: '20%'
    });

    var project_waypoint = new Waypoint({
        element: document.querySelector('#projects-section'),
        handler: function () {
            console.log('in project section');
            $('#navbar-main .navbar-nav').find('li.active').removeClass('active');
            $('#projects-nav-li').addClass('active');
        },
        offset: '20%'
    });

    var project_waypoint = new Waypoint({
        element: document.querySelector('#blogs-section'),
        handler: function () {
            console.log('in blogs section');
            $('#navbar-main .navbar-nav').find('li.active').removeClass('active');
            $('#blogs-nav-li').addClass('active');
        },
        offset: '20%'
    });

    // var blog_waypoint = new Waypoint({
    //     element: document.querySelector('#blogs-section'),
    //     handler: function () {
    //         console.log('in blog section');
    //         $('#navbar-main .navbar-nav').find('li.active').removeClass('active');
    //         $('#projects-nav-li').addClass('active');
    //     },
    //     offset: '20%'
    // });



});


function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25 + element.scrollHeight) + "px";
}

function changeCSS(cssFile, cssLinkIndex) {

    // alert('dsa');
    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    console.log('oldlink initial is: ' + oldlink.href);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    oldlink.href = cssFile;

    console.log('oldlink.href is: ' + oldlink.href);
    // oldlink.setAttribute("href", cssFile);

    return true;
}