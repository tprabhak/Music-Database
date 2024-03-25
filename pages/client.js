function sanitize(input) {
    if (input === " " || input === null) 
    return false;
    else input = input.toString();
    input.replace("(?is)<style.*?>.", "")
    .replace(/(<([^>]+)>)/gi, "");
  
    return input;
  }


async function getAllGenres() {
   fetch('/api/getAllGenres').then(res=>res.json()).then(info =>{
    console.log(info)
    document.getElementById("screen").textContent = JSON.stringify(info)
   });
}

async function getAllArtists() {
fetch('/api/getAllArtists').then(res=>res.json()).then(info =>{
    console.log(info)
    document.getElementById("screen").textContent = JSON.stringify(info)
});

}

   async function getAllTracks() {
    fetch('/api/getAllTracks').then(res=>res.json()).then(info =>{
     console.log(info)
     document.getElementById("screen").textContent = JSON.stringify(info)
    });}


    async function searchAllTracks() {
        let searchSelect = document.getElementById("Search").value;
        sanitize(searchSelect);
        fetch(`/api/searchAllTracks/${searchSelect}`).then(res=>res.json()).then(info =>{
         console.log(info)
         document.getElementById("screen").textContent = JSON.stringify(info)
        });}



        async function searchAllArtists() {
            let searchSelect = document.getElementById("SearchArtist").value;
            sanitize(searchSelect);
            fetch(`/api/searchAllArtists/${searchSelect}`).then(res=>res.json()).then(info =>{
             console.log(info)
             document.getElementById("screen").textContent = JSON.stringify(info)
            });}


    async function SearchArtistById() {
        let searchSelect = document.getElementById("SearchArtistById").value;
        sanitize(searchSelect);
        fetch(`/api/SearchArtistById/${searchSelect}`).then(res=>res.json()).then(info =>{
            console.log(info)
            document.getElementById("screen").textContent = JSON.stringify(info)
        });}        


    async function SearchTrackById() {
        let searchSelect = document.getElementById("SearchTrackById").value;
        sanitize(searchSelect);
        fetch(`/api/SearchTrackById/${searchSelect}`).then(res=>res.json()).then(info =>{
         console.log(info)
         document.getElementById("screen").textContent = JSON.stringify(info)
        });}




    async function SearchByAlbumName() {
        let searchSelect = document.getElementById("SearchByAlbumName").value;
        sanitize(searchSelect);
        fetch(`/api/SearchByAlbumName/${searchSelect}`).then(res=>res.json()).then(info =>{
            console.log(info)
            document.getElementById("screen").textContent = JSON.stringify(info)
        });}

        async function searchByTrackName() {
            let searchSelect = document.getElementById("searchByTrackName").value;
            sanitize(searchSelect);
            fetch(`/api/searchByTrackName/${searchSelect}`).then(res=>res.json()).then(info =>{
                console.log(info)
                document.getElementById("screen").textContent = JSON.stringify(info)
            });}

            async function searchByArtistName() {
            let searchSelect = document.getElementById("searchByArtistName").value;
            sanitize(searchSelect);
            fetch(`/api/searchByArtistName/${searchSelect}`).then(res=>res.json()).then(info =>{
                console.log(info)
                document.getElementById("screen").textContent = JSON.stringify(info)
            });}

    async function getTrackAndAlbum(){
        
        let searchSelect = document.getElementById("Search").value;
        sanitize(searchSelect);
        //trackSelect = "wol";

        fetch(`/api/tracks/${searchSelect}`).then(res=>res.json()).then(info =>{
        console.log(info)
         document.getElementById("screen").textContent = JSON.stringify(info)
           });

    }



    async function getTrackIdOfList() {
        let searchSelect = document.getElementById("getTrackIdOfList").value;
        sanitize(searchSelect);
        console.log(searchSelect)
        fetch(`/api/getTrackIdOfList/${searchSelect}`).then(res=>res.json()).then(info =>{
         console.log(info)
         document.getElementById("screen").textContent = JSON.stringify(info)
        });}


    async function retrieveListWithDetails() {
        let searchSelect = document.getElementById("retrieveListWithDetails").value;
        sanitize(searchSelect);
        console.log(searchSelect)
        fetch(`/api/retrieveListWithDetails/${searchSelect}`).then(res=>res.json()).then(info =>{
            document.getElementById("screen").textContent = JSON.stringify(info);
            let list = "";
            info.Tra
        });}


    
    async function deleteList() {
        let searchSelect = document.getElementById("deleteList").value;
        sanitize(searchSelect);
        fetch(`api/deleteList/${searchSelect}`,{
    
        method: 'DELETE'
        }).then(res=>res.json()).then(info =>{
            console.log("Item removed")
           document.getElementById("screen").textContent = JSON.stringify(info)
        }).catch(err => {console.error(err)});   


        // fetch(`/api/deleteList/${searchSelect}`).then(res=>res.json()).then(info =>{
        //     console.log(info)
        //     document.getElementById("screen").textContent = JSON.stringify(info)
        // });
    }    

    
    async function createList() {
        let searchSelect = document.getElementById("createList").value;
        sanitize(searchSelect);
        fetch(`/api/createList/${searchSelect}`).then(res=>res.json()).then(info =>{
         console.log(info)
         document.getElementById("screen").textContent = JSON.stringify(info)
        });}
    // waits until the request completes...

    async function saveTrackIds() {
        const searchSelect = document.getElementById("playlistName").value;
        sanitize(searchSelect);
         const tracksData = document.getElementById("trackData").value;
         sanitize(tracksData);
         const array = tracksData.split(',')
        const obj = {listName:searchSelect, trackList:array}
        
         console.log(searchSelect)
        // var array = tracksData.split(',');
         console.log(tracksData)
         var myHeaders = new Headers();
         myHeaders.append('Content-Type', 'application/json');
        fetch(`api/saveTrackIds`,
        {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(obj)
        })
        .then(res=>res.json()).then(info =>{
            console.log("Item added")

           document.getElementById("screen").textContent = JSON.stringify(info)
        }).catch(err => {console.error(err)});   

        // fetch(`/api/deleteList/${searchSelect}`).then(res=>res.json()).then(info =>{
        //     console.log(info)
        //     document.getElementById("screen").textContent = JSON.stringify(info)
        // });
    }  

    async function getAllLists() {
        fetch('/api/getAllLists').then(res=>res.json()).then(info =>{
         console.log(info)
         document.getElementById("screen").textContent = JSON.stringify(info)
        });}
    
