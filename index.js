const taylorImg = document.getElementById("taylorImg");

const lyrics = document.getElementById("lyrics");
const album = document.getElementById("album");
const relatedArtist = document.getElementById("relatedArtist");
const relatedArtistFile = document.querySelector(".relatedArtist");
relatedArtistFile.setAttribute("style", "visibility:hidden");

const reveal = document.querySelector(".reveal");

const relatedTwo = document.querySelector(".relatedTwo");
const albums = document.querySelector(".albums");

const options = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/search/",
  params: {
    q: "all to well",
    type: "multi artists",
    offset: "0",
    limit: "10",
    numberOfTopResults: "5",
  },
  headers: {
    "X-RapidAPI-Key": "0b044120f8mshb1a13497c264c20p137db1jsn922c7471e043",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const songLyrics = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/track_lyrics/",
  params: {
    id: "3nsfB1vus2qaloUdcBZvDu",
  },
  headers: {
    "X-RapidAPI-Key": "0b044120f8mshb1a13497c264c20p137db1jsn922c7471e043",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const fearlessData = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/search/",
  params: {
    q: "taylor swift",
    type: "albums",
    offset: "0",
    limit: "10",
    numberOfTopResults: "5",
  },
  headers: {
    "X-RapidAPI-Key": "0b044120f8mshb1a13497c264c20p137db1jsn922c7471e043",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const artist = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/search/",
  params: {
    q: "ariana grande",
    type: "artists",
    offset: "0",
    limit: "10",
    numberOfTopResults: "5",
  },
  headers: {
    "X-RapidAPI-Key": "0b044120f8mshb1a13497c264c20p137db1jsn922c7471e043",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

async function getSong() {
  const { data } = await axios.request(options);

  let image = document.createElement("img");
  image.classList.add("taylor");
  image.src = data.playlists.items[0].data.images.items[0].sources[0].url;

  let musicSong = document.createElement("p");
  musicSong.classList.add("songText");
  musicSong.innerText = data.playlists.items[0].data.name;

  let musicArtist = document.createElement("p");
  musicArtist.classList.add("artist");
  musicArtist.innerHTML = data.artists.items[0].data.profile.name;

  taylorImg.append(image, musicSong, musicArtist);
}
getSong();

lyrics.addEventListener("click", function (e) {
  e.preventDefault();

  relatedArtistFile.setAttribute("style", "visibility:hidden");
  albums.innerHTML = "";

  async function lyrics() {
    const { data } = await axios.request(songLyrics);
    const lyrics = data.lyrics.lines;

    lyrics.map((sing) => {
      let lyric = document.createElement("p");
      lyric.classList.add("lyrics");
      lyric.innerText = sing.words;

      reveal.append(lyric);
    });
  }
  lyrics();
});

album.addEventListener("click", function (e) {
  e.preventDefault();

  reveal.innerHTML = "";
  relatedArtistFile.setAttribute("style", "visibility:hidden");

  async function fearlessAlbum() {
    const { data } = await axios.request(options);
    const file = data.albums.items;

    const filterAlbum = file.slice(6, 9);

    filterAlbum.map((datas) => {
      let column = document.createElement("div");
      column.classList.add("col-4");

      let card = document.createElement("div");
      card.classList.add("card");

      let image = document.createElement("img");
      image.classList.add("card-img-top");
      image.classList.add("albumImage");
      image.src = datas.data.coverArt.sources[0].url;

      image.addEventListener("click", function (e) {
        e.preventDefault();

        let file = datas.data.uri;
        let newFile = file.replace("spotify:album:", "");

        window.location.href = `https://open.spotify.com/album/${newFile}`;
      });

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let title = document.createElement("h5");
      title.classList.add("card-title");
      title.classList.add("text-white");
      title.classList.add("mb-3");
      title.classList.add("fw-bold");
      title.classList.add("fs-4");
      title.innerText = datas.data.name;

      let cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.classList.add("text-white");
      cardText.innerText = datas.data.artists.items[0].profile.name;

      cardBody.append(title, cardText);
      card.append(image, cardBody);
      column.append(card);
      albums.append(column);
    });
  }
  fearlessAlbum();
});

relatedArtist.addEventListener("click", function (e) {
  e.preventDefault();

  relatedArtistFile.setAttribute("style", "visibility:visible");
  reveal.innerHTML = "";
  albums.innerHTML = "";

  async function getArtist() {
    const { data } = await axios.request(artist);
    const artistan = data.artists.items;

    const ariana = document.getElementById("ariana");
    ariana.src = artistan[0].data.visuals.avatarImage.sources[0].url;
    ariana.addEventListener("click", function (e) {
      e.preventDefault();

      let file = artistan[0].data.uri;
      let newFile = file.replace("spotify:artist:", "");

      window.location.href = `https://open.spotify.com/artist/${newFile}`;
    });

    const arianaTitle = document.getElementById("arianaTitle");
    arianaTitle.innerText = artistan[0].data.profile.name;

    const drake = document.getElementById("drake");
    drake.src = artistan[2].data.visuals.avatarImage.sources[0].url;
    drake.addEventListener("click", function (e) {
      e.preventDefault();

      let file = artistan[2].data.uri;
      let newFile = file.replace("spotify:artist:", "");

      window.location.href = `https://open.spotify.com/artist/${newFile}`;
    });

    const drakeTitle = document.getElementById("drakeTitle");
    drakeTitle.innerText = artistan[2].data.profile.name;
  }
  getArtist();
});
