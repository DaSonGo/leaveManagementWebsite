//create a getListItem()

// export

function JSONFileFetcher(){
    let result;
    fetch("./user.json").then(response => {
        return response.json();
        }).then(data => {
            // appendData(data)
            console.log("1");
            result = data.requests;
            console.log("This is JSON FETCHER", result);
          
            }).catch(err => {
            console.log("Error");
        });
        console.log("This is JSON", result);
        return result;

        
}
JSONFileFetcher()
  .then(result => {
    console.log("Received result:", result);
    // Do something with the result
   })
  .catch(error => {
    console.log("Error occurred:", error);
});


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