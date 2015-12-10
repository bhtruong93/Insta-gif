var record = document.getElementsByClassName('btn-danger');
var webCam = document.getElementById('face');
var container = document.getElementById('img-frame');
var saveGIF = document.getElementById('saveGIF');
var postGIF = document.getElementById('postGIF');
var recordGIF = document.getElementById('recordGIF');
var btnArray = [recordGIF, saveGIF, postGIF];
var newGIF;
console.log($);
record[0].addEventListener("click", function() {
    var inputs = document.getElementsByTagName('input');
    var text = inputs[0];
    var time = inputs[1];
    var oldImage = document.getElementsByTagName('img')[0];
    if(oldImage) {
        oldImage.parentNode.removeChild(oldImage);
    }
    webCam.style.display = "inline-block";

    btnArray.forEach(function(btn) {
      btn.style.opacity = 0.3;
    });

    gifshot.createGIF({
        'webcamVideoElement': document.getElementById("video"),
        'keepCameraOn': true,
        'numFrames': time.value * 10,
        'gifWidth': 500,
        'numWorkers': 4,
        'gifHeight': 350,
        'text': text.value,
        'fontFamily': 'Helvetica',
        'fontSize': '36px',
        'resizeFont': true,
        'saveRenderingContexts': true
    },
    function(obj) {
        if(!obj.error) {
            webCam.style.display = "none";
            var image = obj.image;
            console.log(image);
            newGIF = dataURItoBlob(image);
            saveGIF.href = image;
            btnArray.forEach(function(btn) {
                btn.style.opacity = 1;
                btn.style.display = 'inline-block';
            });
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            container.appendChild(animatedImage);
        }
    });
});

var video = document.getElementById("face");

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.oGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}

function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
    // do something
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

var slackButton = document.getElementsByClassName('btn-default')[0];
slackButton.addEventListener("click", function() {

    $.ajax({
      type: "POST",
      url: "https://slack.com/oauth/authorize",
      data: JSON.stringify({
        client_id: 13532050355.16339300902,
        scope: "chat:write:user",
        redirect_uri: "chrome-extension://lplpdamannhgogjmebmoencploejbckg/index.html",
      }),
      success: function() {
        console.log("it's posted!");
      },
      error: function(error) {
        console.log("didn't work", error);
      },
      dataType: "json"
    });



    //
    //
    // $.ajax({
    //   type: "POST",
    //   url: "https://slack.com/api/files.upload",
    //   data: JSON.stringify(newGIF),
    //   success: function() {
    //     console.log("it's posted!");
    //   },
    //   dataType: dataType
    // });
});
