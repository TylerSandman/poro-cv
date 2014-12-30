$(document).ready(function(){
var uploader = $("#uploader");
var fileInput = $("#input1");

function isValid(file){
	//Less than 2MB and valid formats
	return ((file.size / 1048576 < 2) &&
			(file.type === "image/jpg" || file.type === "image/png" || file.type === "image/bmp" || file.type === "image/jpeg"))
}

//Click to upload
uploader.on("click", function(){
	fileInput.click();
})


//Drag and drop events
function UploaderDragHover(e){	
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function UploaderDrop(e){
	UploaderDragHover(e);
	var files = e.originalEvent.dataTransfer.files;
	if (isValid(files[0])){
	}
}

uploader.on("dragover", UploaderDragHover);
uploader.on("dragleave", UploaderDragHover);
uploader.on("drop", UploaderDrop);
})