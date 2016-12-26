var request = new XMLHttpRequest();
request.open('POST', '/done', true);
request.onreadystatechange = function(e){
	if (this.readyState == 4){
		if (this.status == 200){
			var response = this.responseText;
			alert(response);
		}
		else{
			console.log('Something is wrong, check out the error code.');
		}
	}
}
request.send(null);