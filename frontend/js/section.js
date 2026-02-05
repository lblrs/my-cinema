    function show(id) {
        document.querySelectorAll('.section').forEach(div => {
            div.classList.remove('active');
        });
        
        document.getElementById(id).classList.add('active');
    }


    