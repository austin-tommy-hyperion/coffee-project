(function() {
    "use strict"

    const SELECTORS = {
        tbody: document.getElementById("coffees"),
        submitButton: document.getElementById("submit"),
        roastSelection: document.getElementById("roast-selection"),
        searchInput: document.getElementById("coffee-search")
    }

    let coffees = [
        {id: 38, name: 'Super Coffee', roast: "light"},
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

    const sortCoffee = function() {
        coffees.sort(function(a,b) {
            return a.id - b.id;
        });
    }
    sortCoffee();

    const searchCoffee = function() {
        let searchTerm = SELECTORS.searchInput.value.toLowerCase();
        let results = [];
        coffees.forEach(function(e) {
           if(e.name.toLowerCase().includes(searchTerm)) {
               results.push(e);
           }
        });
        console.log(results);
        return results;
    }

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
        for(var i = 0; i < coffees.length; i++) {
            html += renderCoffee(coffees[i]);
        }
        return html;
    }

    function updateCoffees(e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
        let selectedRoast = SELECTORS.roastSelection.value;
        let filteredCoffees = [];
        coffees.forEach(function(coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        SELECTORS.tbody.innerHTML = renderCoffees(filteredCoffees);
    }

    // from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide


    SELECTORS.tbody.innerHTML = renderCoffees(coffees);

    SELECTORS.submitButton.addEventListener('click', updateCoffees);
    SELECTORS.searchInput.addEventListener("change", searchCoffee);
})();
