
const searchField = document.getElementById("searchField");
const searchResultWrapper = document.getElementById("searchResultWrapper");


const spinnerShow = isShow => {
    document.getElementById('spinner').style.display = isShow;
}
const searchButtonPress = () => {
    spinnerShow('block')
    fetchAPI(searchField.value);
}

// fetching API
const fetchAPI = keyword => {
    if (keyword) {
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
        console.log(response)
    } else {
        noResultFOund()
    }

}