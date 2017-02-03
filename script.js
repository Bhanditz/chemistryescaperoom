var Codes;

function SubmitPassword(){
	var EnteredPassword = document.getElementById("Password");
	var PassRef = firebase.database().ref().child("Password");
	PassRef.on('value', function(data){
		if(EnteredPassword.value == data.val()){
			//Code to be run if Password is correct.
			var mainConsole = document.getElementById("mainConsole");
			document.getElementById("passH1").innerHTML = "Administrator Console";
			document.getElementById("passwordTextBox").style.display = "none";
			mainConsole.style.display = "block";
			/*mainConsoleRef = firebase.database().ref().child("mainConsole");
			mainConsoleRef.on('value', function(data2){
				mainConsole.innerHTML = data2.val();
			});*/
			firebase.database().ref().child("Codes").on('value', function(data){
				Codes = data.val();
				Update();
			});
		}
		else{
			//Code to be run if Password is incorrect.
			EnteredPassword.placeholder = "Wrong!";
			EnteredPassword.value = "";
		}
	});
}

function Update(){
	for(var i = 0; i < Codes.length - 1; i++){
		document.getElementById("Codes").innerHTML =
		document.getElementById("Codes").innerHTML +
		"<p>Code " + (i + 1) + ": <input value='" + Codes[i + 1] +
		"' id='Code" + i + "'></p>";
	}
}

function plusCode(){
	if(Codes.length < 100){
		document.getElementById("Codes").innerHTML = "";
		firebase.database().ref().child("Codes").child(Codes.length).set("sample code");
	}
}

function minCode(){
	if(Codes.length > 2){
		document.getElementById("Codes").innerHTML = "";
		firebase.database().ref().child("Codes").child(Codes.length - 1).remove();
	}
}

function Save(){
	window.location.replace("password.html");
}