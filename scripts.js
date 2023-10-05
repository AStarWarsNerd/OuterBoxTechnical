document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide', {
        type: 'loop',
        perPage: 5,
        perMove: 1,
        width: '80rem',
        classes: {
            arrows: 'splide__arrows slider-arrows',
            arrow : 'splide__arrow slider-arrow',
            prev  : 'splide__arrow--prev slider-prev-arrow',
            next  : 'splide__arrow--next slider-next-arrow',
            pagination: 'splide__pagination slider-pagination',
        },
        breakpoints: {
            1000: {
                perPage: 3,
            },
            769: {
                perPage: 2,
            },
        }
    });
    splide.mount();
} );

$(document).ready(function(){
    var firstName = $('#first-name');
    var lastName = $('#last-name');
    var website = $('#website');
    var email = $('#email');
    var phone = $('#phone');
    var successMessage = $('#submit-message');

    $('#session-form .button').click(function(){
        if(validateFirstName() & validateLastName() &
           validateEmail() & validatePhone()) 
        {
            firstName.val('');
            lastName.val('');
            website.val('');
            email.val('');
            phone.val('');
            successMessage.text('Thanks for your submission!');
            successMessage.fadeIn();

            setTimeout(function() { 
                successMessage.fadeOut();
            }, 5000);
        }
    });

    firstName.on('keyup', function() {
        validateFirstName();
    });

    lastName.on('keyup', function() {
        validateLastName();
    });

    email.on('keyup', function() {
        validateEmail();
    });

    phone.on('keyup', function() {
        validatePhone();
    });

    function validateFirstName() {
        return validateField(firstName, 'Please enter a first name');
    }

    function validateLastName() {
        return validateField(lastName, 'Please enter a last name');
    }

    function validateEmail() {
        return validateField(email, 'Please enter a valid email', /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i);
    }

    function validatePhone() {
        return validateField(phone, 'Please enter a valid phone number', /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
    }

    function validateField(field, errorMessage, pattern) {
        var validationMessage = field.parent().find('.validation-message').first();
        var valid = field.val().length === 0 ? false : true;

        if(valid && pattern !== undefined) {
            valid = pattern.test(field.val());
        }

        if(!valid)
        {
            validationMessage.text(errorMessage);
            validationMessage.show();
            field.addClass('has-error');
            return valid;
        } else {
            validationMessage.hide();
            field.removeClass('has-error');
            return valid;
        }
    }
});
