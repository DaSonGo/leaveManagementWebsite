//create a getListItem()

// export

function JSONFileFetcher(){
    let result = [];
    fetch("./user.json").then(response => {
        return response.json();
        }).then(data => {
            // appendData(data)
            result = data;
        console.log(data);
            }).catch(err => {
            console.log("Error");
        });
    console.log("import working?");
    return result;
}
    // function appendData(data){
    //     let mainContainer = document.getElementById("myData");
    //     for(let i = 0; i < data.length; i++){
    //         let div = document.createElement('div');
    //         div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
    //         mainContainer.appendData(div);
    //     }
    // }

// console.log(JSONFileFetcher );

export default JSONFileFetcher;