
let nav2 = document.querySelector(".nav2");
nav2.style.backgroundColor = "rgb(3, 68, 12)";

fetch('./shop.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let radiowrapper = document.querySelector("#radious");
        let cardWrapper = document.querySelector("#cardWrapper");

        function setcategoryRadios() {
            let categories = data.map(product => product.category);
            let uniqueCategories = [...new Set(categories)];

            uniqueCategories.forEach(category => {
                let div = document.createElement("div");
                div.classList.add("form-check");

                let id = "category-" + category
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                div.innerHTML = `
                    <input
                        class="form-check-input"
                        name="radios"
                        type="radio"
                        id="${id}"
                        value="${category}">

                    <label class="form-check-label" for="${id}">
                        ${category}
                    </label>
                `;

                radiowrapper.appendChild(div);
            });
        }

        setcategoryRadios();

        function showCards(array) {
            cardWrapper.innerHTML = '';

            array.forEach((ad) => {
                let div = document.createElement("div");
                div.classList.add("card-custom");

                div.innerHTML = `
                    <p class="h3" title="${ad.name}">${ad.name}</p>
                    <p class="lead">${ad.category}</p>
                    <p>${ad.price}$</p>
                `;

                cardWrapper.appendChild(div);
            });
        }

        showCards(data);

        let radios = document.querySelectorAll('.form-check-input');

        function filterByCategory(array) {
            let arrayFromNodeList = Array.from(radios);
            let button = arrayFromNodeList.find((button) => button.checked);

            if (!button || button.value == "all") {
                return array;
            }

            let category = button.value;

            let filtered = array.filter((ad) => ad.category == category);
            return filtered;
        }

        let priceInput = document.querySelector('#rangeBubble');
        let priceRange = document.querySelector('#priceValue');
        let maxPriceLabel = document.querySelector('#maxPriceLabel');

        function setRange() {
            let prices = data.map((ad) => +ad.price);
            prices.sort((a, b) => a - b);

            let maxPrice = Math.ceil(prices[prices.length - 1]);

            priceInput.max = maxPrice;
            priceInput.value = maxPrice;
            priceRange.innerHTML = maxPrice;
            maxPriceLabel.innerHTML = maxPrice;
        }

        setRange();

        function filterByPrice(array) {
            let filtered = array.filter((ad) => +ad.price <= +priceInput.value);
            return filtered;
        }

        let wordInput = document.querySelector('#searchProduct');

        function filterByWord(array) {
            let filtered = array.filter((ad) =>
                ad.name.toLowerCase().includes(wordInput.value.toLowerCase())
            );

            return filtered;
        }

        function globalFilter() {
            let filteredByWord = filterByWord(data);
            let filteredByPrice = filterByPrice(filteredByWord);
            let filteredByCategory = filterByCategory(filteredByPrice);

            showCards(filteredByCategory);
        }

        radios.forEach((button) => {
            button.addEventListener('click', () => {
                globalFilter();
            });
        });

        priceInput.addEventListener('input', () => {
            globalFilter();
            priceRange.innerHTML = priceInput.value;
        });

        wordInput.addEventListener('input', () => {
            globalFilter();
        });
    });
