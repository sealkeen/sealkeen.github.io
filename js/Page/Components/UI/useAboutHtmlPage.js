import routes from "../../../Router/routing-table.js";

export function useAboutHtmlPage() {
    routes["/about"] = setAboutHtmlPage;
}

export async function setAboutHtmlPage() {
    let container=document.querySelector('#page-body-container');
    if(!container) return;
    container.innerHTML = 
`
<div class="text-center">
    <h1 id="welcome" class="display-4 stroke-shadow">About the author</h1>
</div>
<div class="shadow-box__white">
<section class="name-headline inset"><section><h1 class="page-author__name display-4 m-weight-600 m-cursive m-dark-blue">Ivan Silkin</h1></section><section><h2 class="headline"><span class="roles"><span class="role m-dark-blue">Software Developer</span>,<!-- --> <span class="role m-dark-blue">Musician</span>,<!-- --> <!-- --></span> <span class="location">in <span class="location">Санкт-Петербург, Россия</span></span></h2></section></section></br>
<section class="bio inset">
<div><p>I am a Computer Science / Engineering bachelor, musician, software engineer and a digital multimedia producer</br>currently living in Санкт-Петербург, Россия.</p></br><h3>My Interests</h3><ul><li>cycling</li><li>guitar</li><li>metal and *core music</li><li>northern europe</li></ul><h3>Languages</h3><ul  class="social-links__list"><li>English. B2, Upper Intermediate (EF English First test [2018])</li><li>Swedish. Beginner (A2)</li><li>German. Beginner (A1)</li><li>Russian. Native (71/100 ЕГЭ)</li></ul><h3>Social Networks</h3><ul class="social-links__list"><li><a href="https://github.com/sealkeen" target="_blank" rel="nofollow noopener noreferrer">GitHub</a></li><li><a href="https://stackoverflow.com/users/6897369/ivan-silkin" target="_blank" rel="nofollow noopener noreferrer">StackOverflow</a></li><li><a href="https://www.duolingo.com/profile/lagolas2010" target="_blank" rel="nofollow noopener noreferrer">Duolingo</a></li><li><a href="https://sealkeen.bandcamp.com/" target="_blank" rel="nofollow noopener noreferrer">BandCamp (Artist)</a></li><li><a href="https://soundcloud.com/sealkeen" target="_blank" rel="nofollow noopener noreferrer">SoundCloud</a></li><li><a href="https://www.last.fm/user/Lore-master" target="_blank" rel="nofollow noopener noreferrer">Last.fm</a></li><li><a href="https://Facebook.com/sealkeen" target="_blank" rel="nofollow noopener noreferrer">FaceBook</a></li><li><a href="https://vk.com/sealkeen_one" target="_blank" rel="nofollow noopener noreferrer">VK</a></li><li><a href="https://instagram.com/sealkeen" target="_blank" rel="nofollow noopener noreferrer">Instagram</a></li><li><a href="https://open.spotify.com/artist/0x7IOZzXXiF6kI4AAP5YOt" target="_blank" rel="nofollow noopener noreferrer">Spotify (Artist):</a></li><li><a href="https://music.yandex.ru/artist/12686654" target="_blank" rel="nofollow noopener noreferrer">Yandex.Music (Artist):</a></li></ul></div></section>
<section><ul class="social-links__list"><li class="schools"><div class="meta-header">Education</div><ul class="meta-list"><li class="meta-item">State University of Aerospace Instrumentation 2021'</li></ul></li></ul></section></br></br></br>
<section class="social-links inset"><ul class="social-links__list">
<li><a class="social-link" title="Visit me on Facebook" href="https://www.facebook.com/sealkeen" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M1000 500c0 233-159 429-375 484V604h107l18-125H625V369c0-36 18-56 55-56h79V196s-37-8-90-8c-120 0-180 67-180 166v125H375v125h114v396C218 994 0 772 0 500 0 224 224 0 500 0s500 224 500 500z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on GitHub" href="https://github.com/sealkeen" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M1000 508c0 232-160 429-375 485V862c0-41-10-98-52-131 134-20 239-99 239-223 0-51-21-102-58-144 11-47 17-105-4-148-53 5-106 32-145 56-33-8-67-14-105-14s-73 6-106 14c-39-24-91-51-144-56-21 43-16 101-5 148-37 42-57 93-57 144 0 124 105 203 239 223-20 15-32 36-40 57-105 2-189-81-190-81-5-4-12-5-16-2-6 3-9 10-7 16 2 5 44 124 201 172v100C160 937 0 740 0 508 0 233 223 8 500 8c275 0 500 225 500 500z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on Instagram" href="https://www.instagram.com/sealkeen/" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" width="1000" height="1001" viewBox="-56 -369 1000 1001" xmlns="http://www.w3.org/2000/svg"><path d="M444 631c276.142 0 500-223.858 500-500S720.142-369 444-369-56-145.142-56 131s223.858 500 500 500zm.406-800.81c-81.586 0-91.816.345-123.857 1.807-31.976 1.46-53.814 6.537-72.922 13.964-19.754 7.677-36.507 17.95-53.208 34.65-16.7 16.7-26.973 33.454-34.65 53.208-7.425 19.108-12.504 40.945-13.962 72.92C144.346 38.78 144 49.01 144 130.595s.346 91.815 1.808 123.856c1.458 31.976 6.537 53.814 13.963 72.922 7.677 19.754 17.95 36.507 34.65 53.208 16.7 16.7 33.454 26.973 53.208 34.65 19.108 7.425 40.946 12.504 72.92 13.962C352.59 430.654 362.82 431 444.407 431c81.584 0 91.814-.346 123.856-1.808 31.975-1.458 53.812-6.537 72.92-13.962 19.754-7.677 36.507-17.95 53.21-34.65 16.7-16.7 26.97-33.454 34.648-53.208 7.426-19.108 12.504-40.946 13.963-72.92 1.462-32.042 1.807-42.272 1.807-123.857 0-81.585-.345-91.815-1.807-123.857-1.46-31.975-6.537-53.812-13.963-72.92-7.677-19.754-17.95-36.507-34.65-53.21-16.7-16.7-33.454-26.97-53.208-34.647-19.108-7.426-40.945-12.504-72.92-13.963-32.042-1.462-42.272-1.807-123.856-1.807zm0 54.127c80.21 0 89.712.306 121.39 1.75 29.288 1.337 45.194 6.23 55.78 10.345 14.022 5.45 24.03 11.96 34.54 22.472 10.513 10.51 17.023 20.518 22.472 34.54 4.114 10.586 9.008 26.492 10.344 55.78 1.445 31.678 1.75 41.18 1.75 121.39 0 80.212-.305 89.714-1.75 121.39-1.336 29.29-6.23 45.196-10.344 55.78-5.45 14.023-11.96 24.03-22.472 34.542-10.51 10.513-20.518 17.022-34.54 22.472-10.586 4.114-26.492 9.008-55.78 10.343-31.673 1.447-41.173 1.753-121.39 1.753-80.218 0-89.717-.306-121.39-1.752-29.29-1.334-45.196-6.228-55.78-10.342-14.023-5.45-24.03-11.96-34.542-22.472s-17.022-20.52-22.472-34.54c-4.114-10.586-9.008-26.493-10.343-55.782-1.447-31.676-1.753-41.178-1.753-121.39 0-80.21.306-89.712 1.752-121.39 1.334-29.288 6.228-45.194 10.342-55.78 5.45-14.022 11.96-24.03 22.472-34.54 10.512-10.513 20.52-17.023 34.54-22.472 10.586-4.114 26.493-9.008 55.782-10.344 31.676-1.445 41.178-1.75 121.39-1.75zm0 346.413c-55.304 0-100.136-44.832-100.136-100.135 0-55.304 44.832-100.135 100.136-100.135 55.303 0 100.134 44.83 100.134 100.135 0 55.303-44.83 100.135-100.134 100.135zm0-254.397c-85.198 0-154.263 69.065-154.263 154.262s69.065 154.262 154.263 154.262c85.196 0 154.26-69.065 154.26-154.262S529.603-23.667 444.407-23.667zm196.405-6.095c0 19.91-16.14 36.048-36.048 36.048s-36.048-16.14-36.048-36.048c0-19.91 16.14-36.05 36.048-36.05 19.91 0 36.05 16.14 36.05 36.05z" fill-rule="evenodd"></path></svg></span></a></li><li><a class="social-link" title="Visit me on LinkedIn" href="https://www.linkedin.com/in/ivan-silkin-95ab9b110/" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M1000 500c0 277-223 500-500 500S0 777 0 500 223 0 500 0s500 223 500 500zM375 260c-1-41-32-73-83-73-50 0-83 32-83 73s32 73 82 73h1c51 0 83-32 83-73zm-21 136H229v354h125V396zm458 166c0-114-56-187-146-187-50 0-87 30-104 75l-4-54H434c1 13 3 83 3 83v271h125V562c0-50 23-83 62-83 38 0 63 20 63 83v188h125V562z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on LastFM" href="http://www.last.fm/ru/user/Lore-master" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M500 0c276.142 0 500 223.858 500 500s-223.858 500-500 500S0 776.142 0 500 223.858 0 500 0zm166 385c.25-14.475 5.25-26.225 15-35 9.25-9.223 20.75-13.723 34-14 21.25.277 35 3.277 42 9 7 6.276 14.5 16.025 22 30l54-42c-2-1.223-4.75-4.972-8-11-3.75-5.972-7.25-10.971-11-15-3.25-3.97-6.5-7.47-9-10-13.5-12.47-26-19.969-38-23-12-2.969-28.75-4.968-50-6-31.25-.468-59 10.53-83 33-25 22.528-37.25 49.276-37 80-.25 4.774.25 9.273 1 14 2.25 20.272 7.5 37.52 16 52 8.5 13.519 17.75 24.768 28 33 9.75 8.767 21 16.016 34 22 12 6.015 24.25 10.765 36 14 12.25 3.764 24 7.514 36 12 11 3.514 21 8.013 30 13 8 5.013 15 11.512 21 20 5 7.511 7.75 17.51 8 30-.25 22.008-8.25 40.007-24 54-16.25 13.005-35.5 19.755-58 20-38.5-.245-71-28.243-97-84-7.5-15.739-15.25-33.487-24-53-8.25-20.485-15.25-38.733-21-55-5.25-16.731-12.25-33.98-21-52-8.25-17.978-16.5-34.226-24-49-8.5-14.225-18.5-28.224-30-42-12.5-13.222-25.75-24.221-40-33-14.75-8.22-32-15.22-52-21-20-5.219-42.25-7.968-67-8-29.25.032-57.75 6.531-85 20-27.75 12.53-51.75 29.528-72 51-20.75 20.525-37 45.024-49 73-12 28.02-18 56.768-18 86 .5 40.763 10 79.01 29 115 18 36.006 44.5 65.004 79 87 34.5 22 72.25 33 113 33 71.75 0 125.75-21.249 162-64 8.25-9.745 14.25-19.494 18-29l-35-64c-7.5 14.76-19 31.009-34 49-23 26.506-59 39.755-108 40-44.5-.245-81.25-16.994-111-50-29.25-33.99-44-72.987-44-117 0-26.982 7-52.73 21-78 14-24.727 33.25-44.976 58-60 24.25-15.974 49.75-23.723 76-24 22.75.277 42.5 3.027 60 9 16.5 5.026 31 14.025 43 27 12 12.024 22.25 25.523 31 40 8.25 14.52 17 33.02 26 56 3 7.517 8 20.767 15 39 7 18.764 12.5 33.763 17 45 3.5 11.761 9.5 26.01 17 43 8.5 17.008 16 31.507 23 44 7 11.506 15.75 23.755 26 36 10.75 12.753 21.5 23.002 33 31 10.5 8.001 23.25 14.5 38 20 14.25 4.5 29.75 7 46 7 41.75 0 77.25-13.5 107-40 29.25-27.495 44-61.243 44-102 0-67.236-45.25-113.483-136-138-9.25-3.98-17-6.48-23-8-6-1.48-12.25-4.23-19-8-6.25-4.23-11.75-8.98-16-14-4.75-5.979-8.25-12.728-11-21-2.75-9.727-4.25-15.476-4-17z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on SoundCloud" href="https://soundcloud.com/ivan-silkin" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M1000 500c0 276-224 500-500 500S0 776 0 500 224 0 500 0s500 224 500 500zm-792 21c0-10-5-44-14-71-4-9-11-11-17-11s-13 2-17 11c-9 27-14 61-14 71 0 9 5 43 14 70 4 9 11 11 17 11s13-2 17-11c9-28 14-61 14-70zm108-4c0-13-6-95-16-140-2-6-9-11-15-11s-14 4-16 11c-10 45-16 127-16 140 0 11 7 72 15 98 3 9 9 14 17 14s14-4 17-14c8-26 14-87 14-98zm107-3c0-14-7-151-16-197-1-7-8-12-15-12s-14 5-15 12c-8 46-16 183-16 197s5 66 15 102c2 9 9 13 16 13s14-4 17-13c9-36 14-88 14-102zm448 8c0-57-46-103-103-103-14 0-27 3-40 8-8-93-86-169-181-169-24 0-44 7-64 15-8 3-10 6-10 13v327c0 6 5 11 11 12h284c57 0 103-46 103-103z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on Strava" href="https://www.strava.com/athletes/29785196" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M500 0C224 0 0 224 0 500s224 500 500 500 500-224 500-500S776 0 500 0zM246 553l207-411 208 410H538l-85-165-83 166H246zm354 305L444 552h92l63 124 63-124h92L600 858z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on VK" href="https://vk.com/lore_master" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M1000 500c0 276-224 500-500 500S0 776 0 500 224 0 500 0s500 224 500 500zm-299 38c0-14 17-36 58-89 38-49 55-85 55-99 0-12-11-17-27-17H673c-12 0-19 6-22 14-14 36-29 66-46 92-30 51-50 68-60 68-7 0-18-6-18-43 0-41 2-85 2-102 0-36-10-49-88-49s-87 24-87 29 14-1 27 13c12 11 16 27 16 87 0 25-3 67-22 67-13 0-32-21-68-81-25-44-35-78-42-86-6-5-12-9-24-9h-90c-19 0-26 7-26 16 0 4 2 10 4 15 41 91 107 211 170 273 46 45 110 71 162 71h38c17 0 29-5 29-29 1-38 14-62 28-62 17 0 34 20 59 49 21 25 45 43 74 43h94c11 0 30-7 30-24s-10-33-54-77c-41-41-58-56-58-70z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on YouTube" href="https://www.youtube.com/channel/UC1Er-kGZs_Ohu5Y28tmhZgQ" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M1000 500c0 277-223 500-500 500S0 777 0 500 223 0 500 0s500 223 500 500zm-188 0c0-229 0-229-312-229s-312 0-312 229 0 229 312 229 312 0 312-229zM417 375l208 125-208 125V375z"></path></svg></span></a></li><li><a class="social-link" title="Visit me on Stack Overflow" href="https://stackoverflow.com/users/6897369/ivan-silkin" target="_blank" rel="me nofollow noopener noreferrer"><span class="SVGInline"><svg class="SVGInline-svg" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path d="M64 0C28.654 0 0 28.654 0 64c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64zm-9.113 41.471l27.034 16.332-3.641 5.847-26.924-16.331 3.531-5.848zm-7.283 15.448l30.344 8.607-1.875 6.51-30.345-8.607 1.876-6.51zm-2.869 13.573l31.448 2.979-.662 6.84-31.448-2.979.662-6.84zm-.773 12.027H75.3v6.621H43.962v-6.621zm42.373 17.545H34.142V66.74l6.069.109-.22 26.704h40.054V66.85h6.29v33.214zm-3.199-43.365l-18.318-25.71 5.518-3.973 18.428 25.71-5.628 3.973zm6.951-4.414l-5.186-31.117 6.73-1.103 5.187 31.117-6.731 1.103z"></path></svg></span></a></li></ul>
</section>
</div>
`;
}