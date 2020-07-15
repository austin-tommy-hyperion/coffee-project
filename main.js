(function() {
    "use strict";

    // Check local storage for existing array and if there is none, create one.
    const checkStorage = function() {
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

    // Renders each coffee
    const renderCoffee = function(coffee) {
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

    // Displays all the rendered coffees to the screen
    const renderCoffees = function(coffees) {
        let html = '';
        for(let i=0; i<coffees.length; i++) {
            html += renderCoffee(coffees[i]);
        }
        return html;
    }

    // Draws new coffees to the screen
    const updateCoffees = function(coffeeArray) {
        doc.coffeeContainer.innerHTML = renderCoffees(coffeeArray);
    }

    // Clears the input for adding / editing a coffee
    const clearInput = function() {
        doc.coffeeName.value = "";
        doc.coffeePrice.value = "";
        doc.coffeeDescription.value = "";
    }

    // Puts coffee into into the editing a coffee section
    const showCoffee = function(coffee) {
        doc.coffeeName.value = coffee.name;
        doc.coffeeRoast.value = coffee.roast;
        doc.coffeePrice.value = coffee.price;
        doc.coffeeDescription.value = coffee.description;
    }

    // returns coffee object using ID
    const getCoffee = function(id) {
        let coffee = item.coffees[id-1];
        showCoffee(coffee);
    }

    // Filter the coffees and updates the coffees and returns an array just in case
    const filterCoffees = function() {
        let selectedRoast = doc.roastSelection.value;
        let filteredCoffees = [];
        if(selectedRoast === "all") {
            updateCoffees(item.coffees);
            return item.coffees;
        }
        item.coffees.forEach(function(coffee) {
            if(coffee.roast === selectedRoast)
                filteredCoffees.push(coffee);
        });
        updateCoffees(filteredCoffees);
        return filteredCoffees;
    }

    // Sorts the coffee by price
    const sortByPrice = function() {
        let coffees = filterCoffees().slice(0,item.coffees.length);
        if(doc.priceSort.value !== "default") {
            coffees.sort(function(a,b) {
                if(doc.priceSort.value === "low") {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
            updateCoffees(coffees);
        } else {
            updateCoffees(item.coffees);
        }
    }

    // Searches through the coffee names and description for matching terms
    const searchCoffees = function() {
        let input = doc.searchInput.value.toLowerCase().trim();
        let filteredCoffees = [];
        filterCoffees().forEach(function(coffee) {
            let name = coffee.name.toLowerCase();
            let desc = coffee.description.toLowerCase();
            if(name.includes(input) || desc.includes(input))
                filteredCoffees.push(coffee);
        });
        updateCoffees(filteredCoffees);
    }

    // Adds a new coffee to the coffee array and saves it to local storage
    const newCoffee = function(e) {
        e.preventDefault();
        let coffee = {
            id: item.coffees.length + 1,
            name: (doc.coffeeName.value === "") ? "New Name" : doc.coffeeName.value,
            roast: doc.coffeeRoast.value,
            price: (doc.coffeePrice.value === "") ? 1.25 : parseFloat(doc.coffeePrice.value),
            description: (doc.coffeeDescription.value === "") ? "This coffee wasn't loved enough to be described" : doc.coffeeDescription.value
        };
        item.coffees.push(coffee);
        window.localStorage.setItem("coffeeArray",JSON.stringify(item.coffees));
        updateCoffees(item.coffees);
        clearInput();
    }

    // Changes the form text
    const changeForm = function() {
        if(item.addForm) {
            doc.titleSpan.innerText = "Add your own";
            doc.submitSpan.innerText = "Add";
        } else {
            doc.titleSpan.innerText = "Edit a";
            doc.submitSpan.innerText = "Save";
        }
    }

    // Gets the data from the form and adds it as a coffee
    const editCoffee = function(e) {
        e.preventDefault();
        let coffee = {
            id: item.selectedCoffee,
            name: doc.coffeeName.value,
            roast: doc.coffeeRoast.value,
            price: doc.coffeePrice.value,
            description: doc.coffeeDescription.value
        }
        item.coffees[item.selectedCoffee-1] = coffee;
        window.localStorage.setItem("coffeeArray", JSON.stringify(item.coffees));
        updateCoffees(item.coffees);
        clearInput();
        item.selectedCoffee = -1;
        item.addForm = true;
        changeForm();
    }

    // Gets a couple pieces of vital data and toggles the form
    const toggleForm = function(selectedNode, selectedCoffee) {
        if(item.addForm) {
            item.selectedCoffee = selectedCoffee.id;
            item.addForm = false;
            item.selectedNode = selectedNode;
            item.selectedNode.classList.add('active');
            doc.submitButton.removeEventListener('click', newCoffee);
            doc.submitButton.addEventListener('click', editCoffee);
            changeForm();
            getCoffee(item.selectedCoffee);
        } else {
            if(item.selectedCoffee === selectedCoffee.id) {
                item.selectedNode.classList.remove('active');
                item.addForm = true;
                clearInput();
                changeForm();
                doc.submitButton.removeEventListener('click', editCoffee);
                doc.submitButton.addEventListener('click', newCoffee);
            } else {
                item.selectedNode.classList.remove('active');
                item.selectedNode = selectedNode;
                item.selectedNode.classList.add('active');
                item.selectedCoffee = selectedCoffee.id;
                getCoffee(item.selectedCoffee);
            }
        }
    }

    // Create an object that will be filled with items used.
    const item = {
        coffees: checkStorage(),
        addForm: true,
        selectedCoffee: -1,
        selectedNode: -1
    };

    // Create an object that contains all the selectors
    const doc = {
        coffeeContainer: document.querySelector('#coffee-container'),
        submitButton: document.querySelector('#submit'),
        roastSelection: document.querySelector('#roast-selection'),
        searchInput: document.querySelector('#search-input'),
        priceSort: document.querySelector('#sort-selection'),
        coffeeName: document.querySelector('#coffee-name'),
        coffeeRoast: document.querySelector('#coffee-roast'),
        coffeePrice: document.querySelector('#coffee-price'),
        coffeeDescription: document.querySelector('#coffee-description'),
        titleSpan: document.querySelector('#form-title-span'),
        submitSpan: document.querySelector('#submit-span')
    };

    // Init will run on page load.
    const init = function() {
        updateCoffees(item.coffees);
        doc.roastSelection.addEventListener('change', filterCoffees);
        doc.priceSort.addEventListener('change', sortByPrice);
        doc.searchInput.addEventListener('keyup', searchCoffees);
        doc.submitButton.addEventListener('click', newCoffee);
        doc.coffeeContainer.addEventListener('click', function(event) {
            if(event.target.nodeName === "I") {
                let selectedNode = event.target;
                let selectedCoffee = event.target.parentNode.parentNode.firstChild;
                toggleForm(selectedNode, selectedCoffee);
            }
        });
    }
    init();
})();