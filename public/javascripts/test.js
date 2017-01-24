/**
 * Created by Quintin on 11-11-2016.
 */
$(function () {
    var change = false;

    var jsEditor = CodeMirror(document.getElementById('jsEditor'), {
        viewportMargin: Infinity,
        tabSize: 4,
        theme: 'bespin',
        mode: 'javascript',
        lineNumbers: 'true',
        extraKeys: {'Ctrl-Space': "autocomplete"},
        lineWrapping: true,
        undoDepth: 200,
        onChange: function (e) {
            change = e.getValue()
        }
    });

    var cssEditor = CodeMirror(document.getElementById('cssEditor'), {
        viewportMargin: Infinity,
        tabSize: 4,
        theme: 'bespin',
        mode: 'css',
        lineNumbers: 'true',
        extraKeys: {'Ctrl-Space': "autocomplete"},
        lineWrapping: true,
        undoDepth: 200,
        onChange: function (e) {
            change = e.getValue()
        }
    });

    var htmlEditor = CodeMirror(document.getElementById('htmlEditor'), {
        viewportMargin: Infinity,
        tabSize: 4,
        theme: 'bespin',
        mode: 'xml',
        lineNumbers: 'true',
        extraKeys: {'Ctrl-Space': "autocomplete"},
        lineWrapping: true,
        undoDepth: 200,
        onChange: function (e) {
            change = e.getValue()
        }
    });

    $("#htmlEditor").find(".CodeMirror").css("position", "absolute").css("top", ($("#htmlHandle").offset().top - 20) + 'px');
    $("#cssEditor").find(".CodeMirror").css("position", "absolute").css("top", ($("#cssHandle").offset().top - 20) + 'px');
    $("#jsEditor").find(".CodeMirror").css("position", "absolute");


    $("#resizer").draggable({
        containment: [150, 0, $(window).width() - 10, 0],
        axis: 'x',
        scroll: false,
        drag: function () {
            $("#editorWrapper").width(Math.floor($(window).width() - ($(window).width() - $('#resizer').offset().left)));
            $("#resultWrapper").width(Math.floor($(window).width() - $('#resizer').offset().left - 10));
            $("#widthShow").text($("#resultWrapper").width() + "px");
        },
        start: function () {
            $("#widthShow").css("visibility", "visible");
            $("#resultWrapper").find(".overlay").css("visibility", "visible");
            $("#result").css("z-index", "-1");
        },
        stop: function () {
            $("#widthShow").css("visibility", "hidden");
            $("#resultWrapper").find(".overlay").css("visibility", "hidden");
            $("#editorWrapper").width(Math.floor($(window).width() - ($(window).width() - $('#resizer').offset().left)));
            $("#resultWrapper").width(Math.floor($(window).width() - $('#resizer').offset().left - 10));
            $("#result").css("z-index", "200");
        }
    });

    $("#cssHandle").draggable({
        axis: "y",
        containment: [0, 80, 0, $("#htmlHandle").offset().top - 30],
        scroll: false,
        stop: function () {
            $("#htmlHandle").draggable({containment: [0, Math.floor($("#cssHandle").offset().top + 30), 0, $(window).height() - 30]});
            $("#jsEditor").find(".CodeMirror").height(Math.floor($("#cssHandle").offset().top - 79)).css("position", "absolute");
            $("#cssEditor").find(".CodeMirror").css("position", "absolute").css("top", ($("#cssHandle").offset().top - 20) + 'px');
            $("#cssEditor").find(".CodeMirror").height(Math.floor($("#htmlHandle").offset().top - $("#cssHandle").offset().top - 30));
        },
        drag: function () {
            $("#jsEditor").find(".CodeMirror").height(Math.floor($("#cssHandle").offset().top - 79)).css("position", "absolute");
            $("#cssEditor").find(".CodeMirror").height(Math.floor($("#htmlHandle").offset().top - $("#cssHandle").offset().top - 30));
            $("#cssEditor").find(".CodeMirror").css("position", "absolute").css("top", ($("#cssHandle").offset().top - 20) + 'px');
        }
    });

    $("#htmlHandle").draggable({
        axis: "y",
        scroll: false,
        containment: [0, $("#cssHandle").offset().top + 30, 0, $(window).height() - 30],
        cursor: 'grabbing',
        stop: function () {
            $("#cssHandle").draggable({containment: [0, 80, 0, $("#htmlHandle").offset().top - 30]});
            $("#cssEditor").find(".CodeMirror").height(Math.floor($("#htmlHandle").offset().top - $("#cssHandle").offset().top - 29));
            $("#cssEditor").find(".CodeMirror").css("position", "absolute");
            $("#htmlEditor").find(".CodeMirror").height(Math.floor($(window).height() - $("#htmlHandle").offset().top - 29));
            $("#htmlEditor").find(".CodeMirror").css("position", "absolute").css("top", ($("#htmlHandle").offset().top - 20) + 'px');
        },
        drag: function () {
            $("#cssEditor").find(".CodeMirror").height(Math.floor($("#htmlHandle").offset().top - $("#cssHandle").offset().top - 30));
            $("#cssEditor").find(".CodeMirror").css("position", "absolute");
            $("#htmlEditor").find(".CodeMirror").height(Math.floor($(window).height() - $("#htmlHandle").offset().top - 29));
            $("#htmlEditor").find(".CodeMirror").css("position", "absolute").css("top", ($("#htmlHandle").offset().top - 20) + 'px');

        }
    });

    $("#addLibrary").on("click", function () {
        $("#libraries").append('<input type="text" class="libraryInput" placeholder="add js libraries"><button class="deleteLibrary"><i class="fa fa-minus"></i></button>');
    });

    $("#libraries").on("click", "button", function () {
        $(this).prev().remove();
        $(this).remove();
    });

    function update() {
        console.log("local data: " + local_data);
        var libs = [];
        $(".libraryInput").each(function () {
            if ($(this).val() !== "") {
                libs.push($(this).val());
            }
        });
        var libsStr = '';
        for (var i = 0; i < libs.length; i++) {
            libsStr += "<script src='" + libs[i] + "'></script>";
        }
        var iframe = document.getElementById("result");
        var jsVal = jsEditor.getValue();
        var cssVal = cssEditor.getValue();
        var htmlVal = htmlEditor.getValue();
        var headVal = $("#headInput").val();
        var html = "";
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.src = "about:blank";
        var timeout = setTimeout(function () {
            iframe.contentDocument.write("<!DOCTYPE html>\
         <html lang='en'>\
         <head>" + headVal +
                "<style>" + cssVal +
                "</style>\
                </head>\
                <body>" + htmlVal +
                libsStr +
                "<script>" + jsVal +
                "</script></body>\
                </html>");
        }, 0);
        iframe.contentWindow.document.close();
    }


    $("#run").on("click", function () {
        update();
    });

    $("#settingsToggle").click(function () {
        $("#settings").toggleClass("hidden");
    });

    $("#settingsClose").click(function () {
        $("#settings").toggleClass("hidden");
    });

    var ip;

    $.get("https://ipinfo.io", function (response) {
        ip = response.ip;
    }, "jsonp");

    $('#save').click(function () {
        var libsVal = [];
        $(".libraryInput").each(function () {
            if ($(this).val() !== "") {
                libsVal.push($(this).val());
            }
        });
        var jsVal = jsEditor.getValue();
        var cssVal = cssEditor.getValue();
        var htmlVal = htmlEditor.getValue();
        var headVal = $("#headInput").val();
        var titleVal = $("#title").text();
        if (login_data === false) {
            var userVal = "anon: " + ip;
        }
        else {
            var userVal = login_data;
        }
        var dateVal = Date.now();

        if (local_data._id !== undefined) {
            var updateVal = local_data._id;
        }
        else {
            var updateVal = false;
        }

        $("#jsValue").text(jsVal);
        $("#cssValue").text(cssVal);
        $("#htmlValue").text(htmlVal);
        $("#headValue").text(headVal);
        $("#libsValue").text(libsVal);
        $("#titleValue").text(titleVal);
        $("#update").text(updateVal);
        $("#user").text(userVal);
        $("#dateValue").text(dateVal);
    });

    function showCoBit() {
        if (local_data !== false) {
            console.log(local_data);

            $("#libraries").empty();

            var libsVal = local_data.libraries.split(",");

            for (var i = 0; i < libsVal.length; i++) {
                $("#libraries").append('<input type="text" class="libraryInput" placeholder="add js libraries" value="' + libsVal[i] + '"><button class="deleteLibrary"><i class="fa fa-minus"></i></button>');
            }

            jsEditor.setValue(local_data.js);
            cssEditor.setValue(local_data.css);
            htmlEditor.setValue(local_data.html);
            $("#headInput").text(local_data.head);
            $("#title").text(local_data.title);
            var patt = new RegExp("([0-9])");
            if (patt.test(local_data.owner)) {
                $("#owner").text("A CoBit by anon");
            }

            else {
                $("#owner").text("A CoBit by: " + local_data.owner);
            }

            $.get("https://ipinfo.io", function (response) {
                ip = response.ip;
                console.log(ip);
                if (local_data.owner !== login_data) {
                    if (local_data.owner !== "anon: " + ip) {
                        $("#save").remove();
                    }
                }

            }, "jsonp");
            update();
            setTimeout(function(){
                window.stop();
            }, 300);
        }
    }

    if (local_data !== false) {
        showCoBit();
    }

    $("#tidyHtml").click(function () {
        var totalLines = htmlEditor.lineCount();
        htmlEditor.autoFormatRange({line: 0, ch: 0}, {line: totalLines});
    });

    $("#tidyJs").click(function () {
        var totalLines = jsEditor.lineCount();
        jsEditor.autoFormatRange({line: 0, ch: 0}, {line: totalLines});
    });

    $("#tidyCss").click(function () {
        var totalLines = cssEditor.lineCount();
        cssEditor.autoFormatRange({line: 0, ch: 0}, {line: totalLines});
    });

    $('#title').click(function () {
        var name = $(this).text();
        $(this).html('');
        $('<input>')
            .attr({
                'type': 'text',
                'name': 'fname',
                'id': 'txt_fullname',
                'size': '20',
                'value': name
            }).css("height", "30px").css("font-size", "25px")
            .appendTo('#title');
        $('#txt_fullname').focus();
    });

    $(document).on('focusout', '#txt_fullname', function () {
        var name = $(this).val();
        if (name === "") {
            $('#title').text("Untitled");
        }
        else {
            $('#title').text(name);
        }
    });


});