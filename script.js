
const searchField = document.getElementById("searchField");
const pohone_details = document.getElementById("pohone_details");
const searchResultWrapper = document.getElementById("searchResultWrapper");


const spinnerShow = isShow => {
    document.getElementById('spinner').style.display = isShow;
}

const searchButtonPress = () => {
    spinnerShow('block')
    searchResultWrapper.innerText = " "
    fetchAPI(searchField.value, false);
}

// fetching API
const fetchAPI = (keyword, isAll) => {
    if (!isAll) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${keyword}`)
            .then(res => res.json())
            .then(data => {
                fetchResponse(data.data.slice(0, 20), data.status)
            })
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${keyword}`)
            .then(res => res.json())
            .then(data => fetchResponse(data.data, data.status))
    }
}

const noResultFOund = () => {
    let div = document.createElement('div');
    div.classList.add('error')
    div.innerHTML = `
    <div class="alert alert-danger text-center" role="alert">
        <p class="fw-bold my-0">No Result Found!</p>
    </div>
    `
    searchResultWrapper.appendChild(div);
    // console.log(searchResultWrapper.appendChild(div));

}

const fetchResponse = (response, status) => {
    spinnerShow('none')
    if (status) {
        console.log(response);
        searchResultWrapper.innerText = " "
        pohone_details.innerText = " "
        const div = document.createElement('div');
        div.classList.add('row', "gy-3", "gx-3")
        for (const index in response) {
            console.log(response[index])
            const colDiv = document.createElement('div');
            colDiv.classList.add("col-12", "col-lg-4", "col-md-4")
            colDiv.innerHTML = `
           
                <div class="card rounded shadow-lg p-3">
                    <img src="${response[index].image}" alt="" class="card-img-top img-fluid w-50 mx-auto">

                    <div class="card-body text-center">
                        <p class="h4"> ${response[index].phone_name}</p>
                        <p class="h5 fw-light">${response[index].brand} </p>
                    </div>

                    <div class="card-footer bg-transparent">
                        <button onclick="fetchPhoneDetails('${response[index].slug}')" class="btn btn-primary w-100">Details</button>
                    </div>

                </div>
        
            `
            div.appendChild(colDiv)
        }

        const div2 = document.createElement('div');
        div2.classList.add('row');
        div2.innerHTML = `
        <div class="col-12 text-center py-3">
            <button onclick="fetchAPI( '${searchField.value}','true')" class="btn btn-light ">Load More</button>
        </div>
        `
        searchResultWrapper.appendChild(div)
        searchResultWrapper.appendChild(div2)
    } else {
        noResultFOund()
    }

}

const fetchPhoneDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => showPhoneDetails(data.data, data.status))
}

const createTableRows = data => {

    test = `
    <tr>Test</tr>
    <tr>Test</tr>
    `
    return test
}

const showPhoneDetails = (data, status) => {
    if (status) {
        pohone_details.innerText = " "
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('col-12');

        for (const info in data) {
            div.innerHTML = `
            <div class="card rounded-lg p-2">
                <div class="row">
               
                    <img src="${data.image}" class="card-img-top img-fluid w-50 w-lg-25 mx-auto">
                    <h4 class="text-center mt-3">${data.name}</h4>
               

                    <div class="row pt-3">
                    <div class="col-12">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Specification</th>
                                    <th scope="col">Details</th>
                                </tr>
                            </thead>
    
                            <tbody>
                                <tr>
                                    <td>Brand</td>
                                    <td>${data.brand}</td>
                                </tr>
                                <tr>
                                    <td>Release Date</td>
                                    <td>${data?.releaseDate || "No release Date Found"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h5 class="text-center">Main Features</h5>

                        <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Specification</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Chip Set</td>
                                <td>${data?.mainFeatures?.chipSet}</td>
                            </tr>
                            <tr>
                                <td>Display Size</td>
                                <td>${data?.mainFeatures?.displaySize}</td>
                            </tr>
                            <tr>
                                <td>Memory</td>
                                <td>${data?.mainFeatures?.memory}</td>
                            </tr>
                            <tr>
                                <td>Storage</td>
                                <td>${data?.mainFeatures?.storage}</td>
                            </tr>
                            <tr>
                                <td>Sensors</td>
                                <td>${data?.mainFeatures?.sensors.map(data => `<li>${data}</li>`).join(" ")}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h5 class="text-center">Others</h5>

                    <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Specification</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Bluetooth</td>
                            <td>${data?.others?.Bluetooth}</td>
                        </tr>
                        <tr>
                            <td>GPS</td>
                            <td>${data?.others?.GPS}</td>
                        </tr>
                        <tr>
                            <td>NFC</td>
                            <td>${data?.others?.NFC}</td>
                        </tr>
                        <tr>
                            <td>Radio</td>
                            <td>${data?.others?.Radio}</td>
                        </tr>
                        <tr>
                            <td>USB</td>
                            <td>${data?.others?.USB}</td>
                        </tr>
                        <tr>
                            <td>WLAN</td>
                            <td>${data?.others?.WLAN}</td>
                        </tr>
                    </tbody>
                </table>
                    </div>
                </div>
                
               
            </div>
            `
        }

        pohone_details.appendChild(div);
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    }
}

