$(document).ready(function() {

	$('form').eq(0).submit(function(e) {
		e.preventDefault();
		var task	 	= $('#task-menu').find('.active').text(),
			name       	= $('.formName').val().trim(),
			description = $('.formDescription').val().trim(),
			start       = $('.formStart').val().trim(),
			duration    = $('.formDuration').val().trim();
		
		$.ajax({
			type: 'POST',
			url: '/api/tasks',
			data: {
				task: task,
				name: name,
				description: description,
				start: start,
				duration: duration
			}
		}).done(function() {
			alert('Form Submitted!');
		});
	});
});