(function() {
    "use strict"

    function renderCoffee(coffee) {
        let html = '<tr class="coffee">';
        html += '<td>' + coffee.id + '</td>';
        html += '<td>' + coffee.name + '</td>';
        html += '<td>' + coffee.roast + '</td>';
        html += '</tr>';

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
            if(coffee.name.toLowerCase().includes(input)) {
                filteredCoffees.push(coffee);
            }
        });
        tbody.innerHTML = renderCoffees(filteredCoffees);
    }

    function updateCoffees() {
        tbody.innerHTML = renderCoffees(filterCoffees());
    }

    function newCoffee(e) {
        e.preventDefault();
        let coffeeName = document.querySelector('#new-name');
        let coffeeRoast = document.querySelector('#new-roast');
        let coffee = {
            id: coffees.length + 1,
            name: coffeeName.value,
            roast: coffeeRoast.value
        };
        coffees.push(coffee);
        storage.setItem("coffeeArray", coffees);
        coffeeName.value = "";
        tbody.innerHTML = renderCoffees(coffees);
    }

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
    let coffees = [
        {id: 1, name: 'Light City', roast: 'light'},
        {id: 2, name: 'Half City', roast: 'light'},
        {id: 3, name: 'Cinnamon', roast: 'light'},
        {id: 4, name: 'City', roast: 'medium'},
        {id: 5, name: 'American', roast: 'medium'},
        {id: 6, name: 'Breakfast', roast: 'medium'},
        {id: 7, name: 'High', roast: 'dark'},
        {id: 8, name: 'Continental', roast: 'dark'},
        {id: 9, name: 'New Orleans', roast: 'dark'},
        {id: 10, name: 'European', roast: 'dark'},
        {id: 11, name: 'Espresso', roast: 'dark'},
        {id: 12, name: 'Viennese', roast: 'dark'},
        {id: 13, name: 'Italian', roast: 'dark'},
        {id: 14, name: 'French', roast: 'dark'},
    ];

    let storage = window.localStorage;
    let tbody = document.querySelector('#coffees');
    let submitButton = document.querySelector('#submit');
    let roastSelection = document.querySelector('#roast-selection');
    let searchInput = document.querySelector('#search-input');


    tbody.innerHTML = renderCoffees(coffees);

    roastSelection.addEventListener('change', updateCoffees);
    searchInput.addEventListener('keyup', searchCoffees);
    submitButton.addEventListener('click',newCoffee);
})();