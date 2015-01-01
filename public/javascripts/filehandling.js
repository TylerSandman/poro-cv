$(document).ready(function(){
var uploader = $("#uploader");
var fileInput = $("#input1");
var img = $("#uploaded-img");
var resultText = $("#result-text");

function updateResultText(detected){
    if (detected){
        resultText.text("I see a poro! Look at the cute little guy.");
    }
    else{
        resultText.text("I don't see any poros in this image...");
    }
}

function isValid(file){

    //Less than 2MB 
    var validSize = (file.size / 1048576 < 2);

    //Valid formats
    var validFormat = 
        ((file.type === "image/jpg")||
         (file.type === "image/jpeg")||
         (file.type === "image/png")||
         (file.type === "image/bmp"));

    return (validSize && validFormat);
}

function loadPreview(file){

    var reader = new FileReader(); 
    reader.onload = function (e) {
        img.attr('src', e.target.result);
    }
    reader.readAsDataURL(file);
}

function uploadImage(file){

    var reader = new FileReader();  
    var fd = new FormData();
    fd.append('file', file);
    uploader.addClass('spinner');
    $.ajax({
        url: '/process',
        type: "POST",
        contentType: false,
        success: function(data){
            console.log("Success!")
            updateResultText(data.detected)
            uploader.removeClass('spinner')
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error with processing request!")
            console.log(textStatus)
            console.log(errorThrown)
            uploader.removeClass('spinner')
        },
        data: fd,
        dataType: 'json',
        processData: false
    });
}

function processImage(src){
    //Send post request with local file source to work with busboy
    var fd = new FormData();
    fd.append('text', src);
    uploader.addClass('spinner');
    $.ajax({
        url: '/process',
        type: "POST",
        contentType: false,
        success: function(data){
            console.log("Success!")
            updateResultText(data.detected)
            uploader.removeClass('spinner')
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error with processing request!")
            console.log(textStatus)
            console.log(errorThrown)
            uploader.removeClass('spinner')
        },
        data: fd,
        dataType: 'json',
        processData: false
    });
}

//Drag and drop events
function UploaderDragHover(e){  
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
}

function UploaderDrop(e){
    UploaderDragHover(e);
    var files = e.originalEvent.dataTransfer.files; 
    var file = files[0];
    
    //Not uploaded
    if (!file){
        var src = e.originalEvent.dataTransfer.getData("src", '');
        var name = e.originalEvent.dataTransfer.getData("name");
        if (src !== ''){
            img.attr('src', src);
            processImage("/home/ubuntu/poro-cv/public/images/examples/" + name);
        }
    }
    
    else if (isValid(file)){
        loadPreview(file);
        uploadImage(file);
    }
}

//Upload from input rather than drag and drop
function InputUpload(e){
    var files = e.target.files;
    var file = files[0];
    if (isValid(file)){
        loadPreview(file);
        uploadImage(file);
    }
}

//Click to upload
uploader.on("click", function(){
    fileInput.click();
})

uploader.on("dragover", UploaderDragHover);
uploader.on("dragleave", UploaderDragHover);
uploader.on("drop", UploaderDrop);
fileInput.on("change", InputUpload);
$("img").on("dragstart", function(e){
    var src = e.target.src;
    var name = src.split("/");
    name = name[name.length-1];
    e.originalEvent.dataTransfer.setData("src", src);
    e.originalEvent.dataTransfer.setData("name", name);
});
});
