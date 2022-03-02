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
    const phoneDetailsDiv = document.getElementById('phone-details-container');
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="w-auto sm:w-4/5 my-16 rounded-2xl bg-white p-5 mx-4 sm:mx-auto  drop-shadow-xl grid grid-cols-1  md:grid-cols-3 gap-0 sm:gap-4">
                <div class="w-full xl:w-60 mx-auto">
                    <img src="images/2.jpg" alt="">
                    <h3 class="font-bold text-xl mt-5"> iPhone 13 mini </h3>
                    <h4 class="font-semibold mt-1"> Apple </h4>
                    <h4 class="font-semibold mt-4"> Released 2021, September 24</h4>
                </div>

                <div class="col-span-2">
                    <p class="font-bold">Main Features:</p>
                    <p><span class="font-medium">Chip Set: </span>Apple A15 Bionic (5 nm)</p>
                    <p><span class="font-medium">Display </span> 5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)</p>
                    <p><span class="font-medium">Display Size: </span>5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)
                    </p>
                    <p><span class="font-medium">Memory: </span>128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM</p>
                    <p><span class="font-medium">Sensors: </span>Face ID, accelerometer, gyro, proximity, compass,
                        barometer
                    </p>
                    <p><span class="font-medium">Storage: </span>128GB/256GB/512GB storage, no card slot</p>
                    <p class="font-bold">Other Features:</p>
                    <p><span class="font-medium">Bluetooth:</span>Bluetooth: 5.0, A2DP, LE</p>
                    <p><span class="font-medium">GPS: </span>Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS</p>
                    <p><span class="font-medium">NFC: </span>Yes</p>
                    <p><span class="font-medium">Radio: </span> No</p>
                    <p><span class="font-medium">USB: </span> Lightning, USB 2.0</p>
                    <p><span class="font-medium">WLAN: </span> Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot</p>
                </div>
            </div>
    
    `
    phoneDetailsDiv.appendChild(div);
};