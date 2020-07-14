(function() {
    "use strict"

    // Description and Price
    // Sort by price
    // Edit Coffee
    // Bring up info in the add coffee section and be able to save changes
    // search through coffee name and description


    //checking local storage for the existing array
    function checkStorage() {
        let coffeeArray = window.localStorage.getItem("coffeeArray");
        if(coffeeArray === null) {
            // from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
            return [
                {id: 1, name: 'Light City', roast: 'light', price: 2.00, description: "A nice light roast"},
                {id: 2, name: 'Half City', roast: 'light', price: 2.50, description: "A light and medium roast blend"},
                {id: 3, name: 'Cinnamon', roast: 'light', price: 3.00, description: "A cinnamon late"},
                {id: 4, name: 'City', roast: 'medium', price: 3.50, description: "Ah, tastes like the inner city"},
                {id: 5, name: 'American', roast: 'medium', price: 3.50, description: "An All American Classic"},
                {id: 6, name: 'Breakfast', roast: 'medium', price: 4.50, description: "Pancake flavored"},
                {id: 7, name: 'High', roast: 'dark', price: 5.00, description: "Legal in some states"},
                {id: 8, name: 'Continental', roast: 'dark', price: 5.50, description: "Continental"},
                {id: 9, name: 'New Orleans', roast: 'dark', price: 6.50, description: "My friends dad likse to vacation here"},
                {id: 10, name: 'European', roast: 'dark', price: 7.00, description: "Great Britain in a Coffee Cup"},
                {id: 11, name: 'Espresso', roast: 'dark', price: 7.00, description: "Getting Fancier"},
                {id: 12, name: 'Viennese', roast: 'dark', price: 8.00, description: "I don't even know what this means"},
                {id: 13, name: 'Italian', roast: 'dark', price: 9.00, description: "It's really just a cup of spaghetti"},
                {id: 14, name: 'French', roast: 'dark', price: 10.00, description: "je m'appelle"},
            ];
        }
        return JSON.parse(coffeeArray);
    }

    //rendering the coffee, to display on the page
    function renderCoffee(coffee) {
        let roastClass = (coffee.roast === "light") ? "light-roast" : (coffee.roast === "medium" ) ? "medium-roast" : "dark-roast";
        let html = '<div class="coffee-card">';
        html += '<h2 id="'+ coffee.id +'">' + coffee.name + '</h2>';
        html += '<div class="coffee-footer">'
        html += '<p class="mr-3 mb-0 ' + roastClass + '">' + coffee.roast + '</p>';
        html += '<i class="far fa-edit"></i>'
        html += '</div>'
        html += '<hr style="width: 50%">';
        html += '</div>';

        return html;
    }

    //looping through the coffee array, to call each coffee element
    function renderCoffees(coffees) {
        let html = '';
        for(let i=0; i<coffees.length; i++) {
            html += renderCoffee(coffees[i]);
        }
        return html;
    }

    //grabbing the roast selection and returning the filtered array
    function filterCoffees() {
        let selectedRoast = roastSelection.value;
        let filteredCoffees = [];
        if(selectedRoast === "all") {
            return coffees;
        }
        coffees.forEach(function(coffee) {
            if(coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        return filteredCoffees;
    }


    //searching through the coffee names and description for matching terms
    function searchCoffees() {
        let input = searchInput.value.toLowerCase().trim();
        let filteredCoffees = [];
        filterCoffees().forEach(function(coffee) {
            let coffeeName = coffee.name.toLowerCase();
            let coffeeDes = coffee.description.toLowerCase();
            if(coffeeName.includes(input) || coffeeDes.includes(input)) {
                filteredCoffees.push(coffee);
            }
        });
        coffeeContainer.innerHTML = renderCoffees(filteredCoffees);
    }

    //when changing the select, the inner html will update accordingly to each select
    function updateCoffees() {
        coffeeContainer.innerHTML = renderCoffees(filterCoffees());
    }

    //clear the coffee form, after used.
    function clearCoffee() {
        let coffeeName = document.querySelector('#new-name');
        let coffeePrice = document.querySelector('#new-price');
        let coffeeDescription = document.querySelector('#new-description');
        coffeeName.value = "";
        coffeePrice.value = "";
        coffeeDescription.value = "";
    }

    //adds a new coffee and saves it to local storage
    function newCoffee(e) {
        e.preventDefault();
        let coffeeName = document.querySelector('#new-name');
        let coffeeRoast = document.querySelector('#new-roast');
        let coffeePrice = document.querySelector('#new-price');
        let coffeeDescription = document.querySelector('#new-description');
        let coffee = {
            id: coffees.length + 1,
            name: (coffeeName.value === "") ? "New Name" : coffeeName.value,
            roast: coffeeRoast.value,
            price: (coffeePrice.value === "") ? 1.25 : parseFloat(coffeePrice.value),
            description: (coffeeDescription.value === "") ? "This coffee wasn't loved enough to be described" : coffeeDescription.value
        };
        coffees.push(coffee);
        console.log(coffees);
        window.localStorage.setItem("coffeeArray", JSON.stringify(coffees));
        clearCoffee();
        coffeeContainer.innerHTML = renderCoffees(coffees);
    }

    //displays coffee information to the screen
    function showCoffee(coffee) {
        let coffeeName = document.querySelector('#new-name');
        let coffeeRoast = document.querySelector('#new-roast');
        let coffeePrice = document.querySelector('#new-price');
        let coffeeDescription = document.querySelector('#new-description');

        coffeeName.value = coffee.name;
        coffeeRoast.value = coffee.roast;
        coffeeDescription.value = coffee.description;
        coffeePrice.value = coffee.price;
    }


//grab coffee object, depending on the coffee id provided
    function getCoffee(id) {
        let coffee = coffees[id-1];
        showCoffee(coffee);
    }

    //change a currently existing coffee
    function editCoffee(e) {
        e.preventDefault();
        let coffeeName = document.querySelector('#new-name');
        let coffeeRoast = document.querySelector('#new-roast');
        let coffeePrice = document.querySelector('#new-price');
        let coffeeDescription = document.querySelector('#new-description');
        let coffee = {
            id: currentCoffee,
            name: coffeeName.value,
            roast: coffeeRoast.value,
            price: coffeePrice.value,
            description: coffeeDescription.value
        }
        coffees[currentCoffee-1] = coffee;
        window.localStorage.setItem("coffeeArray", JSON.stringify(coffees));
        coffeeContainer.innerHTML = renderCoffees(coffees);
        clearCoffee();
        currentCoffee = -1;
        addForm = true;
        changeForm();
    }

    //this changes the text of the add/edit form
    function changeForm() {
        let titleSpan = document.querySelector('#form-title-span');
        let submitSpan = document.querySelector('#submit-span');
        if(addForm) {
            titleSpan.innerText = "Add your own";
            submitSpan.innerText = "Add";
        } else {
            titleSpan.innerText = "Edit a";
            submitSpan.innerText = "Save";
        }
    }

    //This is the conditional that toggles the form, and adds a class 'active'
    // Might need to refactor this to split into smaller function
    function toggleForm(currentClicked, currentNode) {
        if(addForm) {
            currentCoffee = currentClicked.id;
            addForm = false;
            changeForm();
            selectedNode = currentNode;
            selectedNode.classList.add('active');
            getCoffee(currentCoffee);
            submitButton.removeEventListener('click', newCoffee);
            submitButton.addEventListener('click', editCoffee);
        } else {
            if(currentCoffee === currentClicked.id) {
                console.log('same coffee');
                selectedNode.classList.remove('active');
                clearCoffee();
                addForm = true;
                changeForm();
                submitButton.removeEventListener('click', editCoffee);
                submitButton.addEventListener('click', newCoffee);
            } else {
                console.log('new Coffee');
                selectedNode.classList.remove('active');
                selectedNode = currentNode;
                selectedNode.classList.add('active');
                currentCoffee = currentClicked.id;
                getCoffee(currentCoffee);
            }
        }
    }

    //sort price
function sortPrice(e){
        e.preventDefault();
        let coffeeArray = filterCoffees().slice(0, coffees.length);
        coffeeArray.sort(function (a, b) {
            return a.price - b.price;
        });
    coffeeContainer.innerHTML = renderCoffees(coffeeArray);
    console.log(coffeeArray);
}

//global variables
    let coffees = checkStorage();
    let addForm = true;
    let currentCoffee = -1, selectedNode = -1;
    let coffeeContainer = document.querySelector('#coffee-container');
    let submitButton = document.querySelector('#submit');
    let roastSelection = document.querySelector('#roast-selection');
    let searchInput = document.querySelector('#search-input');
    let priceSort = document.querySelector('#price-sort');

    coffeeContainer.innerHTML = renderCoffees(coffees);

    //event listeners
    priceSort.addEventListener('click', sortPrice);
    roastSelection.addEventListener('change', updateCoffees);
    searchInput.addEventListener('keyup', searchCoffees);
    submitButton.addEventListener('click', newCoffee);
    coffeeContainer.addEventListener('click', function(event) {
        if(event.target.nodeName === "I") {
            let currentNode = event.target;
            let currentClicked = event.target.parentNode.parentNode.firstChild;
            console.log(currentClicked.id);
            console.log(currentNode);
            toggleForm(currentClicked, currentNode);

        }

    });
})();