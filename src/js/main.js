var account = document.getElementById('account'),
	emailMask = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	telMask = ^[0-9]$;
	passMask = ^[a-z][A-Z][0-9]$;

account.onsubmit = function(){
	var	fname = document.getElementById('fname'),
	lname = document.getElementById('lname'),
	email = document.getElementById('email'),
	tcode = document.getElementById('tcode'),
	tnum = document.getElementById('tnum'),
	pass = document.getElementById('pass');

	if (fname.value == ''){
		alert('You should fill in the first name.');
		fname.focus();
	}
	else if (lname.value == ''){
		alert('You should fill in the last name.');
		lname.focus();
	}
	else if ( !emailMask.test(email.value) ){
		alert('Email address should be valid (test@example.com).');
		email.focus();
	}
	else if (tcode.value == '' || tnum.value == ''){
		alert('You should fill in the phone code and number.');
	}
	else if ( !passMask.test(pass.value) ){
		alert('Password should contain minimum 6 chars and at least 1 number and 1 capital letter.');
		pass.focus();
	}
	else{
		var request = new XMLHttpRequest();
		request.open('POST', '/done', true);
		request.onreadystatechange = function(e){
			if (this.readyState == 4){
				if (this.status == 200){
					var response = this.responseText;
					alert('Information was successfully sent. Server responded: ' + response);
				}
				else{
					alert('Something is wrong, check out the error code.');
				}
			}
		}
		request.send(null);
	}
}