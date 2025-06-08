var slider = document.getElementById("slider");
var txtSize = document.getElementById("txt-size");
var stlTxt = document.styleSheets[0].cssRules[3].style;
var stlTxtSize = document.styleSheets[0].cssRules[5].style;
slider.value = "6";
txtSize.value = "64";
stlTxtSize.setProperty("font-size", "4rem");
slider.addEventListener("input",updateTxtSize_slider);
txtSize.addEventListener("input",updateTxtSize_txtSize);

function updateTxtSize_slider(e){
	var v = e.target.valueAsNumber;
	var newSizeValue = Math.floor(Math.pow(2,v)).toString();
	txtSize.value = newSizeValue;
	stlTxt.setProperty("font-size", newSizeValue);
}

function updateTxtSize_txtSize(e){
	var v = e.target.valueAsNumber;
	var newSizeValue = Math.log2(v).toString();
	slider.value = newSizeValue;
	stlTxt.setProperty("font-size", e.target.value);
}