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
			firebase.database().ref().child("Codes").on('value', function(codeData){
				Codes = codeData.val();
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
	document.getElementById("Codes").innerHTML = "";
	for(var i = 0; i < Codes.length - 1; i++){
		document.getElementById("Codes").innerHTML =
		document.getElementById("Codes").innerHTML +
		"<p>Code " + (i + 1) + ": <input value='" + Codes[i + 1] +
		"' id='Code" + (i + 1) + "' onchange='SaveCodes()'></p>";
	}
}

function plusCode(){
	if(Codes.length < 100){
		firebase.database().ref().child("Codes").child(Codes.length).set("sample code");
	}
}

function minCode(){
	if(Codes.length > 2){
		firebase.database().ref().child("Codes").child(Codes.length - 1).remove();
	}
}

function SavePass(){
	var PassRef = firebase.database().ref().child("Password");

	PassRef.on('value', function(data){
		if(document.getElementById("currentPass").value == data.val()){
			if(document.getElementById("newPass").value == document.getElementById("confirmPass").value){
				if(document.getElementById("newPass").value != ""){
					PassRef.set(document.getElementById("newPass").value);
					document.getElementById("currentPass").value = "";
					document.getElementById("currentPass").placeholder = "Current Password";
					document.getElementById("newPass").value = "";
					document.getElementById("newPass").placeholder = "New Password";
					document.getElementById("confirmPass").value = "";
					document.getElementById("confirmPass").placeholder = "Confirm Password";
					alert("Password Change Successful");
				}
				else{
					document.getElementById("newPass").placeholder = "Can't Be Blank";
					document.getElementById("newPass").value = "";
					document.getElementById("confirmPass").placeholder = "Can't Be Blank";
					document.getElementById("confirmPass").value = "";
				}
			}
			else{
				document.getElementById("newPass").placeholder = "DOESN'T MATCH";
				document.getElementById("newPass").value = "";
				document.getElementById("confirmPass").placeholder = "DOESN'T MATCH";
				document.getElementById("confirmPass").value = "";
			}
		}
		else{
			document.getElementById("currentPass").placeholder = "WRONG!";
			document.getElementById("currentPass").value = "";
		}
	});
}

function SaveCodes(){
	for(var i = 0; i < Codes.length - 1; i++){
		Codes[i+1] = document.getElementById("Code" + (i+1)).value;
	}

	firebase.database().ref().child("Codes").set(Codes);
}