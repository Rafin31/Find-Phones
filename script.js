const searchField = document.getElementById("searchField");


const spinnerShow = isShow => {
    document.getElementById('spinner').style.display = isShow;
}
const searchButtonPress = () => {
    spinnerShow('block')
    fetchAPI(searchField.value);
}

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
    console.log("No Result Found");
}

const fetchResponse = (response, status) => {
    spinnerShow('none')
    if (status) {
        console.log(response)
    } else {
        noResultFOund()
    }

}