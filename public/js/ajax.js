$(document).ready(function () {

	$('form').eq(0).submit(function (e) {
		e.preventDefault();
		var category = $('#pick-a-service').find('a.active').find('span').text().trim();

		switch (category) {
			case 'Health':
				var name = $('#healthName').val().trim(),
					description = $('#healthDescription').val().trim(),
					start = $('#healthStart').val().trim(),
					duration = $('#healthDuration').val().trim();
				break;
			case 'Work':
				var name = $('#workName').val().trim(),
					description = $('#workDescription').val().trim(),
					start = $('#workStart').val().trim(),
					duration = $('#workDuration').val().trim();
				break;
			case 'Recreational':
				var name = $('#recName').val().trim(),
					description = $('#recDescription').val().trim(),
					start = $('#recStart').val().trim(),
					duration = $('#recDuration').val().trim();
				break;
			case 'Other':
				var name = $('#otherName').val().trim(),
					description = $('#otherDescription').val().trim(),
					start = $('#otherStart').val().trim(),
					duration = $('#otherDuration').val().trim();
				break;
		};

		$.ajax({
			type: 'POST',
			url: '/api/tasks',
			data: {
				category: category,
				name: name,
				description: description,
				start: start,
				duration: duration
			}
		}).then(function (data) {
			console.log('done');
		});
		location.reload();
	});

	$('.delete-task').click(function () {
		var id = this.closest('tr').id;
		$.ajax({
			type: 'DELETE',
			url: 'tasks/delete/' + id
		})
		$('#' + id).hide();
	})

	$('.complete').click(function () {
		var id = this.closest('tr').id;
		console.log(id);
		$.ajax({
			type: 'PUT',
			url: '/tasks/update/' + id})
	$('#' + id).hide();
	location.reload();
	})
});