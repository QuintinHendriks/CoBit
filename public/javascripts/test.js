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
            $("#cssEditor").find(".CodeMirror").height(Math.floor($("#htmlHandle").offset().top - $("#cssHandle").offset().top - 30));
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
        var libs = [];
        $(".libraryInput").each(function () {
            if ($(this).val() !== "") {
                libs.push($(this).val());
            }
        });
        console.log(libs);
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
    $.get("http://ipinfo.io", function(response) {
        ip = response.ip;
        console.log(ip);
    }, "jsonp");


    $('#save').click(function () {
        var libsVal = [];
        $(".libraryInput").each(function () {
            if ($(this).val() !== "") {
                libsVal.push($(this).val());
            }
        });

        var updateVal = false;
        var jsVal = jsEditor.getValue();
        var cssVal = cssEditor.getValue();
        var htmlVal = htmlEditor.getValue();
        var headVal = $("#headInput").val();
        var titleVal = $("#title").text();
        var userVal = "anon: "+ip;

        if (getURLVar("coBit") !== false) {
            updateVal = getURLVar("coBit");
        }

        $("#jsValue").text(jsVal);
        $("#cssValue").text(cssVal);
        $("#htmlValue").text(htmlVal);
        $("#headValue").text(headVal);
        $("#libsValue").text(libsVal);
        $("#titleValue").text(titleVal);
        $("#update").text(updateVal);
        $("#user").text(userVal);
    });


    function showCoBit(id) {
        $.getJSON('/cobit/'+ id, function (data) {
            console.log(data);
            $("#libraries").empty();
            var libsVal = data[0].libraries.split(",");
            for (var i = 0; i < libsVal.length; i++) {
                $("#libraries").append('<input type="text" class="libraryInput" placeholder="add js libraries" value="' + libsVal[i] + '"><button class="deleteLibrary"><i class="fa fa-minus"></i></button>');
            }
            jsEditor.setValue(data[0].js);
            cssEditor.setValue(data[0].css);
            htmlEditor.setValue(data[0].html);
            $("#headInput").text(data[0].head);
            $("#title").text(data[0].title);
            if(data[0].owner !== "anon: "+ip){
                $("#save").remove();
            }
            update();
        });
    }

    if (getURLVar("coBit") !== false) {
        showCoBit(getURLVar("coBit"));
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