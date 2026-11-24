const API_KEY = "a0ed834cd0d98b60af4f48559d8c136e";
const USER = "RenanDaboit";

const API_URL = `https://ws.audioscrobbler.com/2.0/`;

async function buscarDados(metodo, parametros = {}) {
    const query = new URLSearchParams({
        method: metodo,
        user: USER,
        api_key: API_KEY,
        format: "json",
        ...parametros
    });

    try {
        const response = await fetch(`${API_URL}?${query}`);
        const data = await response.json();
    
        if(!response.ok || data.error) {
            throw new Error(data.error)
        }

        return data;

    } catch (error) {
        console.log("Erro ao consultar o Last Fm: " + error);
        throw error;
    }
}

async function pegarArtistas() {
    const data = await buscarDados("user.getTopArtists", {
        limit: 20,
        period: "overall"
    });

    return data.topartists.artist;
}

async function pegarMusicas() {
    const data = await buscarDados("user.getTopTracks", {
        limit: 20,
        period: "overall"
    });

    return data.toptracks.track;
}

async function pegarAlbuns() {
    const data = await buscarDados("user.getTopAlbums", {
        limit: 20,
        period: "overall"
    });

    return data.topalbums.album;
}

async function pegarUltimasMusicas() {
    const data = await buscarDados("user.getRecentTracks", {
        limit: 20,
        period: "overall"
    });

    return data.recenttracks.track;
}

function pegarImagem(imagens) {
    const imagem = imagens?.find(img =>
        img.size === "extralarge" && img["#text"]
    ) || imagens?.find(img => img["#text"]);

    return imagem?.["#text"] || "";
}

function renderizarArtistas(artistas) {
    const container = document.getElementById('artistsGrid');

    container.innerHTML = "";

    artistas.forEach((artista, index) => {
        const card = document.createElement("div");
        card.classList.add("artist-card");

        const imagem = pegarImagem(artista.image);

        if (imagem) {
            const img = document.createElement("img");
            img.src = imagem;
            img.alt = artista.name;
            card.appendChild(img);
        }

        const nome = document.createElement("strong");
        nome.textContent = `${index + 1}. ${artista.name}`;

        const reproducoes = document.createElement("small");
        reproducoes.textContent = `${Number(artista.playcount).toLocaleString("pt-BR")} reproduções`;

        card.append(nome, reproducoes);

        container.appendChild(card);
    });
}

function renderizarMusicas(musicas) {
    const container = document.getElementById('tracksList');

    container.innerHTML = "";

    musicas.forEach((musica, index) => {
        const linha = document.createElement("div");
        linha.classList.add("rank-row");

        const numero = document.createElement("span");
        numero.classList.add("rank-number");
        numero.textContent = index + 1;

        const imagem = document.createElement("img");
        imagem.src = pegarImagem(musica.image);
        imagem.alt = musica.name;

        const informacoes = document.createElement("div");
        informacoes.classList.add("rank-info");

        const nome = document.createElement("strong");
        nome.textContent = musica.name;

        const artista = document.createElement("small");
        artista.textContent = musica.artist.name;

        informacoes.append(nome, artista);

        const reproducoes = document.createElement("span");
        reproducoes.classList.add("playcount");
        reproducoes.textContent = `${Number(musica.playcount).toLocaleString("pt-BR")} plays`;

        linha.append(numero, imagem, informacoes, reproducoes);

        container.appendChild(linha);
    });
}

function renderizarAlbuns(albuns) {
    const container = document.getElementById("albumsList");

    container.innerHTML = "";

    albuns.forEach((album, index) => {
        const linha = document.createElement("div");
        linha.classList.add("rank-row");

        const numero = document.createElement("span");
        numero.classList.add("rank-number");
        numero.textContent = index + 1;

        const imagem = document.createElement("img");
        imagem.src = pegarImagem(album.image);
        imagem.alt = album.name;

        const informacoes = document.createElement("div");
        informacoes.classList.add("rank-info");

        const nome = document.createElement("strong");
        nome.textContent = album.name;

        const artista = document.createElement("small");
        artista.textContent = album.artist.name;

        informacoes.append(nome, artista);

        const reproducoes = document.createElement("span");
        reproducoes.classList.add("playcount");
        reproducoes.textContent =
            `${Number(album.playcount).toLocaleString("pt-BR")} plays`;

        linha.append(numero, imagem, informacoes, reproducoes);

        container.appendChild(linha);
    });
}

function renderizarUltimasMusicas(tracks) {
    const container = document.getElementById("recentList");

    container.innerHTML = "";

    tracks.forEach(track => {
        const linha = document.createElement("div");
        linha.classList.add("recent-row");

        const imagem = document.createElement("img");
        imagem.src = pegarImagem(track.image);
        imagem.alt = track.name;

        const informacoes = document.createElement("div");
        informacoes.classList.add("recent-info");

        const nome = document.createElement("strong");
        nome.textContent = track.name;

        const artista = document.createElement("small");

        const tocandoAgora = track["@attr"]?.nowplaying === "true";

        const data = tocandoAgora
            ? "Tocando agora"
            : track.date?.["#text"] || "Data indisponível";

        artista.textContent =
            `${track.artist["#text"]} · ${data}`;

        if (tocandoAgora) {
            artista.classList.add("now-playing");
        }

        informacoes.append(nome, artista);
        linha.append(imagem, informacoes);

        container.appendChild(linha);
    });
}

async function inicializarDashboard() {
    try {
        const artistas = await pegarArtistas();
        renderizarArtistas(artistas);

        const musicas = await pegarMusicas();
        renderizarMusicas(musicas); 

        const albuns = await pegarAlbuns();
        renderizarAlbuns(albuns);

        const ultimasMusicas = await pegarUltimasMusicas();
        renderizarUltimasMusicas(ultimasMusicas);

    } catch (error) {
        console.error("Erro ao carregar dashboard: ", error);
        
    }
}

inicializarDashboard();