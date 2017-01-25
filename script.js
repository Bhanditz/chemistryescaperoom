function SubmitPassword(){
	var EnteredPassword = document.getElementById("Password").value;
	var PassRef = firebase.database().ref().child("Password");
	PassRef.on('value', function(data){
		if(EnteredPassword == data.val()){
			//Code to be run if Password is correct.
			
		};
	});
}