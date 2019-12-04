//here is where you will add the vanilla javascript/jquery to create the visual functionality of the page
$(function() {
    //event listener for add burger button
    $('#burgerMe').on('click', function(event) {
        event.preventDefault();
        createBurger();
        location.reload();
    });
    //allows user to hit 'enter' after entering burger name
    $('#burgerInput').keypress(function(event){
        //enter key number
        if (event.which === 13) {
            event.preventDefault();
            createBurger();
        }
    })
    function createBurger() {
        //new burger object, stores each value in it's pertinent field in db.
        let newBurger = {
            burger_name: $('#burgerInput').val().trim(),
            devoured: 0
        }
        //post data entered into database
        $.ajax('/api/burgers', {
            type: 'post',
            data: newBurger
        }).then(function(burger) {
            console.log('added new burger');
            //dynamically creates devour buttons for newly added burgers
            let li = $('<li>');
            let p = $('<p>').text(newBurger.burger_name);
            let button = $('<button>').text('Devour').addClass('updateMe').attr('data-id', burger.id).attr('data-devour', newBurger.devoured);

            $(li).append(p, button);
            $('#toEat').prepend(li);
            $('#burgerInput').val('')
        })
    }
    $('.updateMe').on('click', function() {
        //allows user to update the name of any burger by clicking the 
        let burger = $(this).parent();
        let id = $(this).data('id');
        let devour = {devoured: $(this).data('devour')};
        let name = $(this).prev().text();
        
        if (devour.devoured === false || devour.devoured === 0 || devour.devoured === '0') {
            $.ajax(`/api/burgers/${id}`, {
                type: 'PUT',
                data: devour
            }).then(function(burgerUpdate) {
                if (burgerUpdate) {
                    burger.remove();
                    let li = $('<li>'); 
                    let p = $('<p>').text(name);
                    let button = $('<button>').text('Destroy').addClass('updateMe').attr('data-id', id).attr('data-devour', 1);

                    $(li).append(p, button);
                    $('#toDelete').prepend(li);
                }
                
            })
        } else {
            $.ajax(`/api/burgers/${id}`, {
                type: 'DELETE'
            }).then(function(burgerDelete) {
                
                if (burgerDelete) {
                    burger.remove();
                }
                
            })
        }
        location.reload();
    })
})