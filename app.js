//frontend
const fs = require('fs');
const path = require ('path')
const express = require('express');
// const { get } = require('http');
// const { emitWarning } = require('process');
const app = express(); 
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('assets'))
app.use('', express.static('pages'))


app.get('/', (req, res) => {
  res.send(path.join(__dirname, 'pages/index.html'));
});
//task 1
let rowData = fs.readFileSync('database/genres.json')
let genresList = JSON.parse(rowData);
let genreFilter = []
genresList.forEach(element => {
  genreFilter.push({"title":element["title"],"genre_id":element["genre_id"],"parent":element["parent"]})
});



app.get ('/api/getAllGenres', (req, res) => {
    res.send(genreFilter);
});

app.get('/api/genres/:id', (req,res) => {
 // console.log(req.params.id)
  const genre = genreList.find(g=>g.genre_id === parseInt(req.params.id));
  if (!genre) res.send(res.status(404).send ('Genre not found'));
  res.send(genre)
})

//task 2
let rowDataArtist = fs.readFileSync('database/raw_artists.json')
let artistList = JSON.parse(rowDataArtist);
let artistFilter = []
artistList.forEach(element => {
  artistFilter.push({"artist_name":element["artist_name"],"artist_id":element["artist_id"],"tags":element["tags"], "artist_date_created":element["artist_date_created"], "artist_contact":element["artist_contact"], "artist_location":element["artist_location"]})
});

app.get ('/api/getAllArtists', (req, res) => {
    res.send(artistFilter);
});

app.get('/api/SearchArtistById/:searchSelect', (req,res) => {
  console.log(req.params.searchSelect)
  const artist = artistFilter.find(r=>r.artist_id === parseInt(req.params.searchSelect));
  if (!artist) res.send(res.status(404).send ('Artist not found'));
  res.send(artist)
})

app.get('/api/SearchTrackById/:searchSelect', (req,res) => {
  console.log(req.params.searchSelect)
  const track = tracksFilter.find(r=>r.track_id === parseInt(req.params.searchSelect));
  if (!track) res.send(res.status(404).send ('Track not found'));
  res.send(track)
})

//task3
let rowDataTracks = fs.readFileSync('database/raw_tracks.json')
let tracksList = JSON.parse(rowDataTracks);
let tracksFilter = []
tracksList.forEach(element => {
  tracksFilter.push({"track_id":element["track_id"], "album_id":element["album_id"],"album_title":element["album_title"],"artist_id":element["artist_id"], "artist_name":element["artist_name"], "tags":element["tags"], "track_date_created":element["track_date_created"], "track_date_recorded":element["track_date_recorded"], "track_duration":element["track_duration"], "track_genres":element["track_genres"], "track_number":element["track_number"], "track_title":element["track_title"]})
});



app.get ('/api/getAllTracks', (req, res) => {
    res.send(tracksFilter);
});

app.get('/api/getTracksById:id', (req,res) => {
  const track = tracksFilter.find(t=>t.track_id === parseInt(req.params.id));
  if (!track) res.send(res.status(404).send ('Track not found'));
  res.send(track)
})


function filterTrackList(filterNameInput){

  let filterArray =[];
  console.log(tracksList[0], filterNameInput)

   let counterArray=0;
  for (let i = 0;tracksFilter.length;i++){
    checkArrayTrack=[];
    checkArrayTrack.push(tracksList[i]?.track_id, tracksList[i]?.album_title, tracksList[i]?.track_title)

    if (counterArray == 17 || checkArrayTrack[0]==tracksList[tracksList.length-1].track_id){
      break;
    }

   if(checkArrayTrack[1]?.toLowerCase().includes(filterNameInput.toLowerCase()) || checkArrayTrack[2]?.toLowerCase().includes(filterNameInput.toLowerCase())){
    filterArray.push(tracksList[i].track_id);
    console.log(checkArrayTrack)
    counterArray++;
   }

  } 

  console.log(filterArray)

   return filterArray;
 }

app.get('/api/searchAllTracks/:searchSelect', (req, res) => {
  // http://localhost:3000/api/tracks?search=wol or Blues
   res.send(filterTrackList(req.params.searchSelect));

// http://localhost:3000/api/genres
})




function filterArtistList(filterNameInput){

  let filterArray =[];

  let counterArray=0;

  for (let i = 0;artistFilter.length;i++){
    checkArrayArtist=[];
    checkArrayArtist.push(artistList[i]?.artist_id, artistList[i]?.artist_name)

    if (counterArray == 17 || checkArrayArtist[0]==artistList[artistList.length-1].artist_id){
      break;
    }

    if(checkArrayArtist[1]?.toLowerCase().includes(filterNameInput.toLowerCase())){
      filterArray.push(artistList[i].artist_id);
      console.log(filterArray,)
      console.log("Test1")
      counterArray++;
    }
  } 
  console.log(filterArray)

   return filterArray;
 }

app.get('/api/searchAllArtists/:searchSelect', (req, res) => {
  // http://localhost:3000/api/tracks?search=wol or Blues
  let arrayTest = filterArtistList(req.params.searchSelect)
  console.log(arrayTest)
   res.send(filterArtistList(req.params.searchSelect));

// http://localhost:3000/api/genres
})


//get method 
//go through track and match cases
//go through album and get chances 
//? Selector 

//check if track name or album name has string, if yes send it to the front
//select statement if anything matches 


//track/track_id

//create
let listRowData = fs.readFileSync('database/lists.json');
let listList = JSON.parse(listRowData);
let listFilter = []
listList.forEach(element => {
  listFilter.push({"name":element["name"],"list":element["list"]})
});


let trackInfo = fs.readFileSync('database/raw_tracks.json');
let songTracks = JSON.parse(trackInfo);

//refreshJsonList();

app.get('/api/createList/:searchSelect', (req,res) => {
  //access existing lists in JSON
    
  //compare new list to old list name
  let nameDoesntExist = true;
  nameDoesntExist = nameCheck(req.params.searchSelect)
  console.log(listFilter,"filter:",listFilter.length,"list",listList.length)
  //if  doesn't exist, create new list
    if (nameCheck(req.params.searchSelect)) 
    res.send(res.status(400).send ('Name already exists'))
    else{
      console.log("else")
    let newList = {name:req.params.searchSelect, list: []};
    listFilter.push(newList);
    var jsonList = JSON.stringify(listFilter)
    fs.writeFileSync('database/lists.json', jsonList, 'utf8')
    res.send(listFilter)
    }
})

// function refreshJsonList()
//   let listRowData = fs.readFileSync('database/lists.json');
//   let listList = JSON.parse(listRowData);
//   let updatelistFilter = []
//   listList.forEach(element => {
//     updatelistFilter.push({"name":element["name"],"list":element["list"]})
//   });
//   return listFilter = updatelistFilter;
// }

function nameCheck(filterNameInput){
  //refreshJsonList();
  for (let i=0;i < listFilter.length; i++){
    //refreshJsonList();
    console.log(listFilter[i].name.toLowerCase(),filterNameInput.toLowerCase())
    if (listFilter[i].name.toLowerCase() == filterNameInput.toLowerCase()){
      return true;
    }
  }
  return false;
}

app.post('/api/updateLists/', (req, res) => {
    req.body.name
    req.body.list

  let updateList = listFilter.find(t=>t.name.toLowerCase() === req.body.name.toLowerCase());
  updateList.list = req.body.list
  if (nameCheck) {
    res.send(res.status(404).send ('Update not found'));
  }
  else{
    listFilter.push(updateList);
    var jsonList = JSON.stringify(listFilter)
    fs.writeFileSync('database/lists.json', jsonList, 'utf8')
  }
  res.send(track)

// http://localhost:3000/api/genres
})  

app.get('/api/getTrackIdOfList/:searchSelect', (req, res) => {
  // http://localhost:3000/api/tracks?search=wol or Blues
  let list = listFilter.find(t=>t.name.toLowerCase() === req.params.searchSelect.toLowerCase());
  res.send(list.list);

  

// http://localhost:3000/api/genres
})


app.get('/api/retrieveListWithDetails/:searchSelect', (req, res) => {
  // http://localhost:3000/api/tracks?search=wol or Blues

  const obj = {}
  const array = []
  let list = listFilter.find(t=>t.name.toLowerCase() === req.params.searchSelect.toLowerCase());
  list.list.forEach(s => {
    const track = songTracks.find(t=>t.track_id === parseInt(s));
    array.push({trackid: s, artist:track.artist_name, title: track.track_title, album: track.album_title, playtime:track.track_duration});
  });
    res.send(array);

// http://localhost:3000/api/genres
})

app.delete('/api/deleteList/:searchSelect', (req, res) => {
  // http://localhost:3000/api/tracks?search=wol or Blues
  const listIndex = listFilter.findIndex(t=>t.name.toLowerCase() === req.params.searchSelect.toLowerCase());
  if (listIndex>0){
    listFilter.splice(listIndex, 1)
    var jsonList = JSON.stringify(listFilter)
    fs.writeFileSync('database/lists.json', jsonList, 'utf8')
    res.send(listFilter);    
  }
else
  res.status(404).send("Not Found");

// http://localhost:3000/api/genres
})

app.post('/api/saveTrackIds', (req, res) => {
  const bodyData = req.body;
  const listName = bodyData.listName;
  const trackList = bodyData.trackList;

  console.log(listName)
  console.log(trackList)
  console.log(bodyData)
  const listIndex = listFilter.findIndex(t=>t.name.toLowerCase() === listName.toLowerCase());
  if (listIndex>0){
    const newTrack = {"name":listName, "list":trackList}
    listFilter[listIndex] = newTrack;

    var jsonList = JSON.stringify(listFilter)
    fs.writeFileSync('database/lists.json', jsonList, 'utf8')
    res.send(listFilter);    
  }
else
  res.status(404).send("Not Found");

// http://localhost:3000/api/genres
})






















//PORT
const port = process.env.PORT || 3000;
app.listen (port, () => console.log("Listening on port" + port + "..."))

app.get('/api/list', (req, res) => {
    //gets access to and reads the json files
const fs = require('fs');
let albumInfo = fs.readFileSync('database/raw_albums.json');
let artistInfo = fs.readFileSync('database/raw_artists.json');
let trackInfo = fs.readFileSync('database/raw_tracks.json');

//parser turns it into array that can be sent across port
let albumSend = JSON.parse(albumInfo);
let artistSend = JSON.parse(artistInfo);
let trackSend = JSON.parse(trackInfo);

//send data as array
    res.send(albumSend, artistSend, trackSend)
  });

  app.get('/api/list/:id', (req,res)=>{

    res,send(req.params.id);

  })


  app.get('/list', (req, res) => {
    //gets access to and reads the json files
    res.send(parse_data());
  


  app.post('/list', (req, res) => {
    res.send("POST Request Called")
  })




  app.get('/create', (req, res) => {
    res.send('root')
  })


  app.get('/view', (req, res) => {
    res.send('root')
  })

 
})





app.get('/api/searchByTrackName/:searchSelect', (req, res) => {
  let list = tracksFilter.find(t=>t.track_title.toLowerCase() === req.params.searchSelect.toLowerCase());
  res.send(list);
})

app.get('/api/searchByArtistName/:searchSelect', (req, res) => {
  let list = artistFilter.find(t=>t.artist_name.toLowerCase() === req.params.searchSelect.toLowerCase());
  res.send(list);
})

let rowDataAlbum = fs.readFileSync('database/raw_tracks.json')
let albumList = JSON.parse(rowDataAlbum);
let albumFilter = []
albumList.forEach(element => {
  albumFilter.push(
    {
      "album_id": element["album_id"],
      "album_comments": element["album_comments"],
      "album_date_created": element["album_date_created"],
      "album_date_released": element["album_date_released"],
      "album_engineer": element["album_engineer"],
      "album_favorites": element["album_favorites"],
      "album_handle": element["album_handle"],
      "album_information": element["album_information"],
      "album_listens": element["album_listens"],
      "album_producer": element["album_producer"],
      "album_title": element["album_title"],
      "album_tracks": element["album_tracks"],
      "album_type":element["album_type"],
      "album_url": element["album_url"],
      "artist_name": element["artist_name"],
      "artist_url": element["artist_url"],
      "tags": element["tags"]
    })
  });

app.get('/api/searchByAlbumName/:searchSelect', (req, res) => {
  let list = albumFilter.find(t=>t.album_title.toLowerCase() === req.params.searchSelect.toLowerCase());
  res.send(list);
})

app.get ('/api/getAllLists', (req, res) => {
  let sendLists = []
  
  listFilter.forEach(l=>{
    playTimeSum = 0;
    
    // l.list.forEach(i =>{
    //   const track = songTracks.find(t=>t.track_id === parseInt(i));
    //   playTimeSum = playTimeSum + track.track_duration;
    // })

    for(i = 0; i<l.list.length;i++){
      const track = songTracks.find(t=>t.track_id === parseInt(l.list[i]));
      var time  = track.track_duration.split(':'); 
      addTime = time[0] * 60 + time[1]
      playTimeSum = playTimeSum+ addTime;
      console.log(l.name,track.track_id,time)
    }
    sendLists.push(l.name,l.list.length, playTimeSum + "sec")
  })

  res.send(sendLists);
});









