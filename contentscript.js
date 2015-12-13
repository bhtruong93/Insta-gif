var record = document.getElementsByClassName('btn-danger');
var webCam = document.getElementById('face');
var container = document.getElementById('img-frame');
record[0].addEventListener("click", function() {
  var oldImage = document.getElementsByTagName('img')[0];
  if(oldImage) {
    oldImage.parentNode.removeChild(oldImage);
  }
  webCam.style.display = "inline-block";

  gifshot.createGIF({
    'webcamVideoElement': document.getElementById("video"),
    'keepCameraOn': true,
    'numFrames': 10,
    'gifWidth': 500,
    'numWorkers': 4,
    'gifHeight': 350,
    'text': 'hi there',
    'saveRenderingContexts': true
  }, function(obj) {
    if(!obj.error) {
      webCam.style.display = "none";
      var image = obj.image;
      var newGIF = dataURItoBlob(image);
      console.log(newGIF);

      var saveGIF = document.getElementById('saveGIF');
      saveGIF.href = image;
      animatedImage = document.createElement('img');
      animatedImage.src = image;
      container.appendChild(animatedImage);
    }
  });

});

var video = document.getElementById("face");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

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
