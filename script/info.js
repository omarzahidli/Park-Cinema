const params = new URLSearchParams(location.search)
const filmId =  params.get('id')
const main = document.querySelector('main')
const loading = document.getElementById('loading')
const content = document.getElementById('content')
const filmCover = document.getElementById('filmCover')
const filmName = document.getElementById('filmName')
const genres = document.getElementById('genres')
const langs = document.getElementById('langs')
const subtitles = document.getElementById('subtitles')
const genInfo = document.getElementById('genInfo')
const actorsInfo = document.getElementById('actorsInfo')
const desc = document.getElementById('desc')
const yotubeVideo = document.getElementById('yotubeVideo')
const wordToNumber = {
    "SIX": 6,
    "TWELVE": 12,
    "SIXTEEN": 16,
    "EIGHTEEN": 18,
};
const table = document.querySelector('table')









fetch('https://parkcinema-data-eta.vercel.app/detail')
.then(res => res.json())
.then(data => {
    console.log(data)
    let selectedFilm = data.find(filmDetails => filmDetails.movie.id == filmId)
    renderFilmInfo(selectedFilm)
    renderSeans(selectedFilm)
    loading.classList.toggle('hidden')
    content.classList.toggle('hidden')
})
function renderFilmInfo(selectedFilm) {
    console.log(selectedFilm);
    if (!selectedFilm) {
        let kod = ''
        kod = '<div class="flex justify-center items-center w-full h-screen text-center my-5 text-[#d52b1e] text-3xl">Məlumat Bazasında Film haqqinda melumat yoxdu! <br /> -_- </div>'
        main.innerHTML = kod
    }
    else {
        let movieCover = `<img width="500" height="500" class="w-full h-full object-cover" src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${selectedFilm.movie.image}&w=640&q=75" alt="${selectedFilm.movie.name}" />`
        filmCover.innerHTML = movieCover
        let movieName = `${selectedFilm.movie.name}`
        filmName.innerHTML = movieName
        let movieGenres = selectedFilm.movie.genres.map(i => i.title)
        movieGenres.forEach(title => {
            let kod = ''
            kod += `<span>${title}</span>`
            genres.innerHTML = kod

        });
        let movieLangs = selectedFilm.movie.languages
        movieLangs.forEach(lang => {
            let kod = ''
            kod += `<li>
                        <img alt="${lang}-flag" src="img/${lang}-flag.svg" />
                    </li>`
            langs.innerHTML = kod
        });
        let movieSubtitles = selectedFilm.movie.subtitles
        if (movieSubtitles) {     
            movieSubtitles.forEach(sub => {
                let kod = ''
                kod += `<li>
                            <img alt="${sub}-flag" src="img/${sub}-flag.svg" />
                        </li>`
                subtitles.innerHTML = kod
            });
        }
        else {
            let kod = '<li class="text-red-700 !text-[12px] font-semibold">Altyazı yoxdur</li>'
            subtitles.innerHTML = kod
        }
        let hours = Math.floor(selectedFilm.movie.duration / 60)
        let mins = Math.floor(selectedFilm.movie.duration % 60)
        let movieGenInfo = `<p class="text-[#D9DADB] !text-[16px] font-normal">
                                <span class="!text-[16px] font-semibold">Müddət:</span>
                                0${hours}:${mins}:00
                            </p><p class="text-[#D9DADB] !text-[16px] font-normal">
                                <span class="!text-[16px] font-semibold">İl:</span> 
                                ${selectedFilm.movie.year}
                            </p>
                            <p class="text-[#D9DADB] !text-[16px] font-normal">
                                <span class="!text-[16px] font-semibold">Ölkə:</span>
                                ${selectedFilm.movie.country}
                            </p>
                            <p class="text-[#D9DADB] !text-[16px] font-normal">
                                <span class="!text-[16px] font-semibold">Rejissor:</span>
                                ${selectedFilm.movie.director}
                            </p>`
        genInfo.innerHTML = movieGenInfo
        let movieActors = selectedFilm.movie.actors.join(", ")
        let [year, month, day] = selectedFilm.movie.firstScreeningDate.split("T")[0].split("-")
        let movieActorsInfo = `<p class="text-[#D9DADB] font-normal">
                                    <span class="text-[16px] font-semibold">Aktyorlar : </span>
                                    <span>${movieActors}</span>
                                </p>
                                <p class="text-[#D9DADB] !text-[16px] font-normal">
                                    <span class="!text-[16px] font-semibold">Yaş Həddi:</span>
                                    ${wordToNumber[selectedFilm.movie.ageLimit]}+
                                </p>
                                <p class="text-[#D9DADB] !text-[16px] font-normal">
                                    <span class="!text-[16px] font-semibold">Nümayiş Tarixi:</span>
                                    ${day}.${month}.${year}
                                </p>`
        actorsInfo.innerHTML = movieActorsInfo
        let movieDesc = `<h2 class="text-[#D9DADB]">${selectedFilm.movie.description}</h2>`
        desc.innerHTML = movieDesc
        let movieVideo = `<iframe src="https://www.youtube.com/embed/${selectedFilm.movie.youtubeUrl.split("v=")[1]}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" width="100%" height="100%"></iframe>`
        yotubeVideo.innerHTML = movieVideo
    }    
}

function renderSeans(selectedFilm) {
    let kod, subs = ''
    selectedFilm.subtitle ? subs = `<span class="text-[12px] max-xs:text-[10px] max-xxs:text-[8px] text-wrap whitespace-pre">${selectedFilm.subtitle}</span>` : '<span class="text-[12px] max-xs:text-[10px] max-xxs:text-[8px] text-wrap whitespace-pre">NO</span>'
    kod = ` <tr class="border-b border-[#D9DADB] bg-[#383838] transition">
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF]">${selectedFilm.time}</td>
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF] max-sm:hidden"></td>
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF] max-sm:text-[12px]">
                    <div class="flex justify-center items-center gap-2">
                        <span class="max-xxs:text-[8px]">${selectedFilm.theatreTitle} | ${selectedFilm.hallTitle}</span>
                    </div>
                </td>
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF]">
                    <div class="flex flex-col leading-none gap-1">${selectedFilm.type.split("_")[1]}</div>
                </td>
                <td class="py-4 px-2 max-sm:p-1 text-center">
                    <img alt="flag" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="img/${selectedFilm.language.toLowerCase()}-flag.svg" style="color: transparent;">
                </td>
                <td class="py-4 px-2 text-sm text-[#FFFFFF] max-sm:p-1">
                    <div class="flex items-center justify-center">
                        <div class="border border-solid border-[#D9DADB] min-h-[40px] rounded-[10px] flex flex-col gap-1 p-0.5 max-xxs:px-[1px] py-1 min-w-[20px] max-md:leading-[13px] md:leading-[16px] max-w-[100px] justify-center items-center w-max px-4">
                            ${subs}
                            <span class="max-xxs:text-[6px] text-[10px] max-xs:text-[8px] leading-none">sub</span>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-2 text-end max-sm:p-1">
                    <a class="md:w-max inline-block text-end" href="/ticket.html?id=${selectedFilm.id}">
                        <button class="flex items-center justify-center opacity-65 hover:opacity-100 duration-200 rounded-[20px] h-[36px] px-4 py-2 bg-[#C02020] text-white text-sm hover:bg-[#A81A1A] transition md:w-[160px] w-[100px] max-sm:w-[60px] max-sm:p-0 max-sm:text-[12px] max-sm:leading-3">Bilet Al</button>
                    </a>
                </td>
            </tr>`
    console.log(selectedFilm.subtitle);
    console.log(subs);
    
    table.innerHTML = kod
}