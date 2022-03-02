document.getElementById('search_btn').addEventListener('click', () => {
    const searchField = document.getElementById('search_text');
    const searchText = searchField.value.toLowerCase();
    if (searchField.value.length > 0) {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        searchField.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data));
    }
    else {
        console.log('empty');
    }

});

const displayPhones = (data) => {
    if (data.status !== true) {
        console.log('not found');
    }
    else {
        const phoneContainerDiv = document.getElementById('phone-container');
        phoneContainerDiv.textContent = '';
        data.data.forEach(phone => {
            const { brand, image, phone_name, slug } = phone;

            const div = document.createElement('div');
            div.innerHTML = `
                <div class="w-52 rounded-2xl bg-white p-5 mx-auto text-center drop-shadow-xl">
                    <div class="flex justify-center">
                        <img width="127" src="${image}" alt="image">
                    </div>
                    <div>
                        <h3 class="font-medium">${phone_name}</h3>
                        <h4>${brand}</h4>
                    </div>
                    <button onclick="loadDetails('${slug}')" class="h-8 w-36 mt-3 text-white rounded-lg bg-red-500 hover:bg-red-600">
                        Details</button>
                </div>
            `
            phoneContainerDiv.appendChild(div);
        });
    };
};

const loadDetails = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
        .then(res => res.json())
        .then(data => phoneDetails(data.data));
};

const phoneDetails = data => {
    const { brand, image, mainFeatures, name, others, releaseDate } = data;
    console.log(brand, image, mainFeatures, name, others, releaseDate);
};