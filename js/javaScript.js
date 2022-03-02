// Click Handeler: Search Button
document.getElementById('search_btn').addEventListener('click', () => {
    const searchField = document.getElementById('search_text');
    const searchText = searchField.value.toLowerCase();
    // If input field empty or not:
    if (searchField.value.length > 0) {
        // Input field isn't empty
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        searchField.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => dataProcessing(data));
    }
    else {
        // Input field is empty 
        console.log('empty');
    };
});



// If data found or not:
const dataProcessing = info => {
    if (info.status !== true) {
        console.log('not found');
    }
    else {
        displayPhones(info.data)
    };
};
// Displaying Searched Phones:
const displayPhones = phones => {
    // phones container:
    const phoneContainerDiv = document.getElementById('phone-container');
    // clean phone container:
    phoneContainerDiv.textContent = '';

    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;
        // Adding searched phones in Phone Container with Button 
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
                    <button onclick="loadDetails('${slug}')" class="h-8 w-36 mt-3 text-white rounded-lg bg-red-500 hover:bg-red-600">Details</button>
                </div>
            `
        phoneContainerDiv.appendChild(div);
    });
};

// Loading Details Inforamtion Phone:
const loadDetails = PhoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${PhoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => phoneDetails(data.data));
};

// If Other Features informations is not avaliable will give error massage:
const checkOthers = (others) => {
    if (others === undefined) {
        const errorMassage = " Sorry! information isn't available";
        others = {
            Bluetooth: errorMassage,
            GPS: errorMassage,
            NFC: errorMassage,
            Radio: errorMassage,
            USB: errorMassage,
            WLAN: errorMassage
        };
        return others;
    };
    return others;
};

// Displaying Phone's Details Inforamtion:
const phoneDetails = phone => {
    // Destructuring phone's informations
    const { name, brand, image, mainFeatures } = phone;
    let { others, releaseDate } = phone;

    // Checking Other Inforamtion and Release Date:
    if (releaseDate.length === 0) {
        releaseDate = "Release Date isn't available"
    };

    others = checkOthers(others);

    // Destructuring Other Inforamtion and main Features:
    const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = others;
    const { chipSet, displaySize, memory, sensors, storage } = mainFeatures;


    // Phone Details Container:
    const phoneDetailsContainer = document.getElementById('phone-details-container');
    // Cleaning Details Container:
    phoneDetailsContainer.textContent = '';

    const div = document.createElement('div');

    // Adding Taiwind Multiple Classes using Spread Operator:
    const divClasses = ['w-auto', 'sm:w-4/5', 'my-16', 'rounded-2xl', 'bg-white', 'p-5', 'mx-4', 'sm:mx-auto', 'drop-shadow-xl', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-0', 'sm:gap-4'];
    div.classList.add(...divClasses);

    // Adding Phone's Details Inforamtion:
    div.innerHTML = `
                <div class="w-full xl:w-60 mx-auto">
                    <img src="${image}" alt="">
                    <h3 class="font-bold text-xl mt-5">${name}</h3>
                    <h4 class="font-semibold mt-1">${brand}</h4>
                    <h4 class="font-semibold mt-4">${releaseDate}</h4>
                </div>

                <div class="col-span-2">
                    <p class="font-bold">Main Features:</p>
                    <p><span class="font-medium">Chip Set: </span>${chipSet}</p>
                    <p><span class="font-medium">Display Size: </span>${displaySize}</p>
                    <p><span class="font-medium">Memory: </span>${memory}</p>
                    <p><span class="font-medium">Sensors: </span>Face ID, accelerometer, gyro, proximity, compass,
                        barometer
                    </p>
                    <p><span class="font-medium">Storage: </span>${storage}</p>
                    <p class="font-bold">Other Features:</p>
                    <p><span class="font-medium">Bluetooth:</span>${Bluetooth}</p>
                    <p><span class="font-medium">GPS: </span>${GPS}</p>
                    <p><span class="font-medium">NFC: </span>${NFC}</p>
                    <p><span class="font-medium">Radio: </span>${Radio}</p>
                    <p><span class="font-medium">USB: </span>${USB}</p>
                    <p><span class="font-medium">WLAN: </span>${WLAN}</p>
                </div>   
    `
    phoneDetailsContainer.appendChild(div);
};