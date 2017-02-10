var CurrentCode = 1;
var Codes;

firebase.database().ref().child("Codes").on('value', function(data){
	Codes = data.val();
});

function Enter(){
	var enteredCode = document.getElementById("code");
	if(enteredCode.value  == Codes[CurrentCode]){
		CurrentCode += 1;
		document.getElementById("title").innerHTML = CurrentCode;
		enteredCode.value = "";
		enteredCode.placeholder = "Input Code";
		if(CurrentCode == Codes.length){
			document.getElementById("codeInputBox").style.display = "none";
			document.getElementById("title").innerHTML = "Nice job, you did it!";
		}
	}
	else{
		enteredCode.value = "";
		enteredCode.placeholder = "WRONG!";
	}
}