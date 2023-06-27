//create a getListItem()

// export

// export default function JSONFileFetcher() {
//     let result = [];
//    return fetch("./user.json").then(response => {
//         return response.json();
//     })
//     .then(data => {
//         // appendData(data)
//         result = data.requests;
//         console.log("This is JSON FETCHER", result);//This returns correct data.requests
//         return result;

//     }).catch(err => {
//         console.log("Error");
//     });
//     // console.log("This is JSON outside", result);//This return undefined
// };



// console.log(JSONFileFetcher );

async function JSONFileFetcher() {
    const result = await fetch('./user.json');
    const data = await result.json();
    console.log("=================== Async", data.requests);
    return data.requests;
}


export default JSONFileFetcher