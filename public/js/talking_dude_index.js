$(document).on('ready', function () {
	var serverBaseUrl = document.domain;
	var talking_dude = io.connect(serverBaseUrl + '/talking_dude');

	$('form').on('submit', function (e) {
		e.preventDefault();
		var message = $.trim($('#outgoing_message').val());

		if (message.length > 0 && message.length <= 255) {
			sendMessage(message);
		}
		$('#outgoing_message').val('');
	});

	talking_dude.on('incomingMessage', function (data) {
		var message = data.message;
		$('#speech').html('<p>' + message + '</p>');
	});

	talking_dude.on('error', function (reason) {
		alert('Unable to connect: ' + reason );
	});

	function sendMessage(message) {
		$.post('/talking_dude/message', {
			message: message
		});
	}
});