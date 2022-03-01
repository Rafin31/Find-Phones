
const searchField = document.getElementById("searchField");
console.log(searchField.value);
const searchResultWrapper = document.getElementById("searchResultWrapper");


const spinnerShow = isShow => {
    document.getElementById('spinner').style.display = isShow;
}
const searchButtonPress = () => {
    spinnerShow('block')
    searchResultWrapper.innerText = " "
    fetchAPI(searchField.value);
}

// fetching API
const fetchAPI = keyword => {
    if (keyword !== "") {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${keyword}`)
            .then(res => res.json())
            .then(data => fetchResponse(data.data, data.status))
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?`)
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
                        <button class="btn btn-primary w-100">Details</button>
                    </div>

                </div>
        
            `
            div.appendChild(colDiv)
        }
        searchResultWrapper.appendChild(div)
    } else {
        noResultFOund()
    }

}