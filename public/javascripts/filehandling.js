$(document).ready(function(){
var uploader = $("#uploader");
var fileInput = $("#input1");
var img = $("#uploaded-img");

function isValid(file){
	//Less than 2MB and valid formats
	return ((file.size / 1048576 < 2) &&
			(file.type === "image/jpg" || file.type === "image/png" || file.type === "image/bmp" || file.type === "image/jpeg"))
}

function loadPreview(file){

	var reader = new FileReader();  
	reader.onload = function (e) {
		img.attr('src', e.target.result);
	}		
	reader.readAsDataURL(file);
}

function uploadFile(file){

	var fd = new FormData();
	fd.append('file', file);
	$.ajax({
        url: '/',
        type: "POST",
		processData: false,
		contentType: false,
        success: function(data){
			console.log("Success!");
			console.log(data);
		},
        data: 'hi',
		dataType: 'text'
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
		var src = e.originalEvent.dataTransfer.getData("src", '')
		if (src !== ''){
			img.attr('src', src)
		}
	}
	
	else if (isValid(file)){
		loadPreview(file)
		uploadFile(file)
	}
}

//Upload from input rather than drag and drop
function InputUpload(e){
	var files = e.target.files;
	var file = files[0];
	if (isValid(file)){
		loadPreview(file)
		uploadFile(file)
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
	e.originalEvent.dataTransfer.setData("src", e.target.src)
})
})