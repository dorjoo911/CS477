/*
List all books in index.html when open index.html in browser
Click "Submit" button to add a new book with properties: title, ISBN, publishedDate, author (id is auto generated)
Click "Update" button to Edit a book and save to server side
Click "Delete" button to remove a book from server side */
window.onload = function () {
  fetchMusic();
  fetchPlaylist();
};
let playlistSongs = [];
let rootURL = "http://localhost:7000/api/v1/";
let currentSong;

/* <<<===***--- ADD/FETCH TO TOP MUSIC TABLE ---***===>>> */
async function fetchMusic() {
  let result = await fetch(`${rootURL}books`, {});

  let response = await result.json();
  renderSongs(response, "song-list", "add");
}

// /* <<<===***--- ADD/FETCH TO PLAY LIST ---***===>>> */
// async function fetchPlaylist() {
//   let result = await fetch(`${rootURL}playlist`, {
//     headers: new Headers({
//       Authorization: "Bearer " + localStorage.getItem("accessToken"),
//     }),
//   });

//   let response = await result.json();
//   playlistSongs = response; // *** All songs saved in global array ***
//   renderSongs(response, "playlist-table", "remove");
// }

/* <<<===***--- Render songs depend on which table and type ---***===>>> */
function renderSongs(songs, table, type) {
  const songTable = document.getElementById(table);
  if (type === "add") {
    songTable.innerHTML = `<tr class="table-success">
    <th class="table-success">ID</th>
    <th class="table-success">Title</th>
    <th class="table-success">Release Date</th>
    <th class="table-success">Actions</th>
  </tr>`;
  } else {
    songTable.innerHTML = `<tr class="table-success">
  <th class="table-success">Index</th>
  <th class="table-success">Title</th>
  <th class="table-success" style="text-align: center">Actions</th>
  <th class="table-success"></th>
</tr>`;
  }

  let songList = ""; // later, concat on <th> tag
  for (let i = 0; i < songs.length; i++) {
    let song = songs[i];
    songList += `
      <tr class="table-primary">
          <td class="table-info">${i + 1}</td>
          <td class="table-info">${song.title}</td>`;

    if (type === "add") {
      songList += `<td class="table-info">${song.releaseDate}</td><td class="table-info"><button class="btn-success" onclick="addSong('${song.id}')">+</button></td>`;
    } else if (type === "remove") {
      songList += `<td class="table-info"><button class="btn-danger" onclick="removeSong('${song.songId}')">-</button></td>`;
      songList += `<td class="table-info"><button class="btn-primary" onclick="addToPlayer('${song.id}')">></button></td>`;
    }

    songList += `</tr>`;
  }
  songTable.innerHTML += songList; // new <tr> row added/concat on type of <th> in type of tables
}

/* <<<===***--- ADD SONG INTO PLAYLIST FROM MUSIC TABLE ---***===>>> */
async function addSong(id) {
  let result = await fetch(`${rootURL}playlist/add`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      songId: id, // have to in "" JSON
    }),
  });

  let response = await result.json();
  playlistSongs = response; // *** Only choosen songs in global array ***
  renderSongs(response, "playlist-table", "remove");
}

/* <<<===***--- REMOVE SONG FROM PLAY LIST ---***===>>> */
async function removeSong(id) {
  let result = await fetch(`${rootURL}playlist/remove`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      songId: id, // have to in "" JSON
    }),
  });

  let response = await result.json();
  playlistSongs = response; // *** Updated choosen songs in global array ***
  renderSongs(response, "playlist-table", "remove");
}
