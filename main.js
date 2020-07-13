(function() {
    "use strict"

    // Descirption and Price
    // Sort by price
    // Edit Coffee
    // Bring up info in the add coffee section and be able to save changes
    // search through coffee name and description

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

    function renderCoffee(coffee) {
        let roastClass = (coffee.roast === "light") ? "light-roast" : (coffee.roast === "medium" ) ? "medium-roast" : "dark-roast";
        let html = '<div class="coffee-card">';
        html += '<h2>' + coffee.name + '</h2>';
        html += '<div class="coffee-footer">'
        html += '<p class="mr-3 mb-0 ' + roastClass + '">' + coffee.roast + '</p>';
        html += '<i class="far fa-edit"></i>'
        html += '</div>'
        html += '<hr style="width: 50%">';
        html += '</div>';

        return html;
    }

    function renderCoffees(coffees) {
        let html = '';
        for(let i=0; i<coffees.length; i++) {
            html += renderCoffee(coffees[i]);
        }
        return html;
    }

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

    function updateCoffees() {
        coffeeContainer.innerHTML = renderCoffees(filterCoffees());
    }

    function newCoffee(e) {
        e.preventDefault();
        let coffeeName = document.querySelector('#new-name').value;
        let coffeeRoast = document.querySelector('#new-roast').value;
        let coffeePrice = document.querySelector('#new-price').value;
        let coffeeDescription = document.querySelector('#new-description').value;
        let coffee = {
            id: coffees.length + 1,
            name: (coffeeName === "") ? "New Name" : coffeeName,
            roast: coffeeRoast,
            price: (coffeePrice === "") ? 1.25 : coffeePrice,
            coffeeDescription: (coffeeDescription === "") ? "This coffee wasn't loved enough to be described" : coffeeDescription
        };
        coffees.push(coffee);
        console.log(coffees);
        window.localStorage.setItem("coffeeArray", JSON.stringify(coffees));
        coffeeName = "";
        coffeeContainer.innerHTML = renderCoffees(coffees);
    }

    let coffees = checkStorage();
    let coffeeContainer = document.querySelector('#coffee-container');
    let submitButton = document.querySelector('#submit');
    let roastSelection = document.querySelector('#roast-selection');
    let searchInput = document.querySelector('#search-input');

    coffeeContainer.innerHTML = renderCoffees(coffees);

    roastSelection.addEventListener('change', updateCoffees);
    searchInput.addEventListener('keyup', searchCoffees);
    submitButton.addEventListener('click',newCoffee);
    coffeeContainer.addEventListener('click', function(e) {
        if(e.target.nodeName === "I") {
            edit();
        }
    })
})();