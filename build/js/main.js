var request = new XMLHttpRequest();
request.open('HEAD', 'http://localhost:8080', true);
request.onreadystatechange = function(e){
	if (this.readyState == 4){
		if (this.status == 200){
			var response = this.responseText;
			console.log(response);
		}
		else{
			console.log('Something is wrong, checkout the error code.');
		}
	}
}
request.send(null);