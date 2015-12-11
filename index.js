var record = document.getElementsByClassName('btn-danger');
var webCam = document.getElementById('face');
var container = document.getElementById('img-frame');
var saveGIF = document.getElementById('saveGIF');
var postGIF = document.getElementById('postGIF');
// var slackGIF = document.getElementById('slackGIF');
var recordGIF = document.getElementById('recordGIF');
var btnArray = [recordGIF, saveGIF];
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
              // $.ajax({
              //   type: "POST",
              //   url: "http://data-uri-to-img-url.herokuapp.com/images",
              //   data: 'image[' + image + ']',
              //   success: function(data) {
              //     console.log('here' + data);
              //   },
              //   error: function(error) {console.log(error);},
              //    dataType: "json"
              // });

            // slackGIF.addEventListener('click', function(event) {
            //   slackGIF.href = "https://slack.com/api/chat.postMessage?token=xoxp-13532050355-13532050371-16334980115-c6816b3200&channel=%23general&text=%20&attachments=%5B%20%20%20%20%20%20%20%20%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%22fallback%22%3A%20%22Error%20uploading%20GIF%20(code%3A1312YAN)%22%2C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22color%22%3A%20%22%2336a64f%22%2C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22image_url%22%3A%20%22data%3Aimage%2Fgif%3Bbase64%2CR0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o%2FXBs%2FfNwfjZ0frl3%2Fzy7%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7%22%2C%20%20%20%20%20%20%20%20%20%20%20%20%20%22thumb_url%22%3A%20%22http%3A%2F%2Fexample.com%2Fpath%2Fto%2Fthumb.png%22%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%5D&pretty=1";
            // });
            newGIF = dataURItoBlob(image);
            var urlGIF = URL.createObjectURL(newGIF);
            var fd = new FormData(document.forms[0]);
            fd.append("myFile", newGIF);
            console.log(fd);



            console.log(urlGIF);
            saveGIF.href = urlGIF;
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
