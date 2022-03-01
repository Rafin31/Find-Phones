
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
        searchResultWrapper.innerText = " "
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
        .then(data => showPhoneDetails(data))
}

const showPhoneDetails = (data) => {
    console.log(data);
}