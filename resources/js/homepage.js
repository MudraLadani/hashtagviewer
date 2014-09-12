$(document).ready(function() {
	$("#makeBoard").click(function() {
		$.post("/create", {query: $("#query").val()}).done(function(data) {
			$("#public_url").val("http://hashtagviewer.herokuapp.com/s/" + data);
			$("#private_url").val("http://hashtagviewer.herokuapp.com/s/" + data + "/admin");
			$('#create-done').modal('show')
		});
	});
});