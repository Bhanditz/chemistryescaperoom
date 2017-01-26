function SubmitPassword(){
	var EnteredPassword = document.getElementById("Password");
	var PassRef = firebase.database().ref().child("Password");
	PassRef.on('value', function(data){
		if(EnteredPassword.value == data.val()){
			//Code to be run if Password is correct.
			location.replace("console.html");
		}
		else{
			//Code to be run if Password is incorrect.
			EnteredPassword.placeholder = "Wrong!";
			EnteredPassword.value = "";
		}
	});
}