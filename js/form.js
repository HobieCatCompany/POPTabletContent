$(document).ready(function() {
    // Validate form using jQuery plugin
    $('form.lead-form').validate({
        errorPlacement: function(error, element) {
            error.appendTo('div.validation-messages');
        }
    });

    // Check if we can use browser based localStorage
    if (typeof(Storage) != 'undefined') {
        // Collect form submitted data on submit and write it to localStorage
        $('button.input-submit').click(function(event) {
            // Stop form from actually submitting on button click
            event.preventDefault();

            // Get form's submitted email & zip field data
            var email = $('input.input-email').val();
            var zip = $('input.input-zip').val();

            // Create JSON object to pass along to localStorage
            var json_data = {'email': email, 'zip': zip};

            // Get number of items stored in localStorage
            var num_rows = localStorage.length + 1;

            // Commit data to localStorage if form passes validation
            if ($('input.input-email').hasClass('valid') && $('input.input-zip').hasClass('valid')) {
                // Write JSON data to localStorage
                localStorage.setItem(num_rows, JSON.stringify(json_data));

                // Show success message and reload page (clear form fields) after data written to localStorage
                $('div.validation-messages').append('<label class="form-success">Thanks for signing up!</label>').delay(3000).fadeOut(500, function() {
                    location.reload();
                });
            }
        });
    }

    // Can't use browser based localStorage? Show JS alert message.
    else {
        alert('***** Browser based localStorage is not available. Collected data will not be saved! *****');
    }
});