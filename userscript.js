// ==UserScript==
// @name         SlithBot
// @namespace    SlitherBots by l3mpik (modded by Striker)
// @version      1.0
// @description  SlithBot
// @author       l3mpik,Striker
// @match        *://slither.io/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// @grant        none
// ==/UserScript==
//====================   TRY :)   ==========================//
var skin = 25; // -1 <-- Random Skin 1 <-- User ur skin

//======================================================//

var vps = 0;

var updatespeed = 100;

var st_click = 0;

var _ip = "";

if (skin != 25) {
    data[2] = localStorage.snakercv;
}

var _data = [];

_data[1] = "SlithBot.io";
_data[2] = skin;

//======================================================//


$('iframe').remove();

$("canvas:eq(3)").append("<div id='b_menu' style='width: 350; height: 120; background-color: #000000; opacity: 0.7; top: -15%; border: 0.5px solid #ffffff; position: absolute; color: #ffffff; a { font-size: 9px; }'><a>Bot Name: </a><input id='bname' type='text' placeholder='Bot name'> <br>Bot skin: <input type='text' id='bskin' placeholder='Skin 1-39 or -1'> <button id='save' style='width: 150px; height: 25px; background:#4dff4d; border: 0px; border-radius: 5px;'>Save</button>");

$("canvas:eq(3)").after("<div style='height: 165px; background-color: #000000; opacity: 1.0; zoom: 1; width: 205px; top: 0.5%; left: 0.5%; display: block; position: fixed; text-align: center; font-size: 19px; color: #F200FF; padding: 5px; font-family: Tahoma; border: 5px solid #07F7F7; border-radius: 5px;'> <div style='color:#07F7F7; display: inline; -moz-opacity:1; -khtml-opacity: 0.9; opacity:1; filter:alpha(opacity=90); padding:10px;'><a>MineMooreYT</a></div> <div style='color:#07F7F7; display: inline; opacity:1; filter:alpha(opacity=100); padding: 24px;' position: fixed;><br><a> Minions : </a><a id='count' > Offline </a> </div> <div style='color:#07F7F7; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;'><br><a></a> Move To Head: <a id='moveh' >On</a> </div> <div style='color:#ffffff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;'><br><a>X</a> - Snake Speed: <a id='isspeed' >Off</a> <br><button id='start' style='width: 150px; height: 25px; background:#ff3333; border: 0px; border-radius: 5px;'>OFF</button><br>MODE: <font color='#00ff00'><a id='mode' ></a></font></div> ");

console.log('GUI ADDED!');

$('#b_menu').mouseenter(function() {


    $('#b_menu').animate({

        top: "0%",
        border: "2px solid #ff0000"
    });

});

$('#b_menu').mouseleave(function() {


    $('#b_menu').animate({

        top: "-15%"

    });

});

$('#fsrv').click(function() {

    if (!snake) {

        console.log('Snake die');

    } else {
        if (bso.ip != undefined || null && !snake) {
            var ip = bso.ip;
            var port = bso.po;
            connect('ws://' + ip + port);
        }
    }

});

if (vps == 1) {
    var socket = io.connect('ws://62.138.7.102:777');
    $("#mode").text('Striker');
} else {
    var socket = io.connect('ws://127.0.0.1:4000');
    $("#mode").text('Striker');
}


window.onkeydown = function(event) {
    if (event.keyCode === 71) {
        $("#botlayer").fadeToggle(1000);
    }
};

document.body.onmousewheel = zoom;

window.onkeydown = function(e) {

    if (e.keyCode === 88) {
        socket.emit('cmd', 1);
        $('#isspeed').text('On');
    }
}

window.onkeyup = function(e) {

    if (e.keyCode === 88) {
        socket.emit('cmd', 0);
        $('#isspeed').text('Off');
    }
}

function zoom(e) {

    gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail || 0);

}

function rsk() {


    var rsin = setInterval(function() {


        function gr() {

            var rn = Math.floor((Math.random() * 39) + 1);

            return rn;
        }

        setSkin(snake, gr());


    }, 150);

}

var spos = setInterval(function() {

    if (window["snake"] !== undefined) {

        if (snake != null) {
            var x = snake.xx;
            var y = snake.yy;

            socket.emit('pos', x, y);
        }

    }

}, updatespeed);


$('#bname').change(function() {

    var name = $('#bname').val();

    _data[1] = name;

});

$('#bskin').change(function() {

    var skin = $('#bskin').val();

    _data[2] = skin;

});

$("#playh").click(function() {

    lbh.textContent = "MineMoore";
    ii.src = "";

    if (window["bso"] !== undefined) {

        _data[0] = "" + bso.ip + ":" + bso.po;

    }

});

$("#start").click(function() {
    if (st_click == 0) {
        st_click = 1;

        $("#start").css('background', '#00FF04');
        $("#start").text('Connecting...');

        setTimeout(function() {

            $("#start").text('On');

            if (window["bso"] !== undefined) {

                _data[0] = "" + bso.ip + ":" + bso.po;

                socket.emit('server', _data)

            } else {
                console.log('Try refresh page : /');
            }

        }, 2000);

    } else {
        st_click = 0;

        $("#start").css('background', '#D10000');
        $("#start").text('Off');
    }

});

socket.on('bcount', function(data) {

    $('#count').text(data);

});
