//create a getListItem()

export function JSONFileFetcher(){
    fetch("C:\Users\hieud\Downloads\MOCK_DATA.json")
    .then((res)=>{
    return res.json();
    })
    .then((data)=>console.log(data));
}