const loading = document.getElementById('loading')
const content = document.getElementById('content')

fetch('https://parkcinema-data-eta.vercel.app/landing')
.then(res => res.json())
.then(data => {
    console.log(data)
    renderFilms(data)
    loading.classList.toggle('hidden')
    content.classList.toggle('hidden')
})
const films = document.getElementById('films')
const wordToNumber = {
    "SIX": 6,
    "TWELVE": 12,
    "SIXTEEN": 16,
    "EIGHTEEN": 18,
};
function renderFilms(data) {
    let kod = ''
    data.forEach(film => {
        let langs = ''
        film.languages.forEach(lang => {
        langs += `<div class="w-6 h-6">
                        <img alt="${lang.toLowerCase()}-flag" loading="lazy" width="280" height="410" class="w-full h-full" src="img/${lang.toLowerCase()}-flag.svg" style="color: transparent;" />
                    </div>`
        });
        kod += `
            <li class="w-full">
                <a href="info.html?id=${film.id}">
                    <div class="aspect-[290/480] max-sm:w-full rounded-[18px] shadow-box relative cursor-pointer flex items-center overflow-hidden">
                        <div class="absolute top-0 left-0 bg-gradient-to-b from-[#00000000] via-[#0000004E] to-[#000000] z-[10] w-full h-full"></div>
                        ${film.preSale ? `<div class="absolute top-7 -right-12 bg-red-600 text-white text-sm sm:text-sm md:text-base font-bold rotate-[45deg] w-40 sm:w-36 md:w-48 h-6 sm:h-8 md:h-10 flex items-center justify-center shadow-lg z-10 max-sm:text-[12px] md:text-[14px] max-md:!text-[12px] max-md:-translate-y-2 max-md:-translate-x-3 max-sm:-translate-x-1 max-sm:translate-y-0">Öncədən satış</div>` : ''}
                        <img width="300" height="300" class="absolute top-0 left-0 object-cover scale-100 duration-300 z-0 w-full h-full" src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${film.image}&w=640&q=75" alt="${film.name}" />
                        <div class="absolute bottom-0 left-0 w-full px-3 pb-4 z-10">
                            <h2 class="mb-3 text-white text-[22px] font-semibold">${film.name}</h2>
                            <div class="text-[#D9DADB] text-[14px]">${film.firstScreeningDate.split("T")[0].replace(/-/g, ".")}</div>
                            <div class="flex items-center justify-between">
                                <div class="text-[#D9DADB]">${wordToNumber[film.ageLimit]}+</div>
                                <div class="flex items-center gap-2">
                                    ${langs}
                                </div>
                            </div>
                        </div>
                    </div> 
                </a>
            </li>
            `
        });
    
    
    films.innerHTML = kod
}






