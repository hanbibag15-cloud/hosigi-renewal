const slides=[{title:'맛있는 순간,<br><em>함께라서 더 즐겁게.</em>',desc:'달콤짭짤한 간장치킨부터 매콤한 매운 간장치킨까지. 취향대로 즐기는 호식이두마리치킨의 맛.',img:'https://images.unsplash.com/photo-1562967914-608f82629710?w=1200&q=85'},{title:'오래 사랑받아 온<br><em>호식이의 시그니처.</em>',desc:'간장 치킨과 매운 간장 치킨, 취향에 맞는 대표 메뉴를 만나보세요.',img:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1200&q=85'},{title:'오늘의 메뉴는<br><em>호식이로 결정!</em>',desc:'다양한 치킨과 사이드 메뉴를 살펴보고 원하는 맛을 찾아보세요.',img:'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=1200&q=85'}];let current=0,playing=true,timer;function renderSlide(){const s=slides[current];document.querySelector('#heroTitle').innerHTML=s.title;document.querySelector('#heroDesc').textContent=s.desc;document.querySelector('#heroImage').src=s.img;document.querySelector('#slideCount').textContent=`0${current+1} / 0${slides.length}`;}function changeSlide(n){current=(current+n+slides.length)%slides.length;renderSlide()}function startTimer(){clearInterval(timer);if(playing)timer=setInterval(()=>changeSlide(1),5500)}document.querySelector('#prev').addEventListener('click',()=>{changeSlide(-1);startTimer()});document.querySelector('#next').addEventListener('click',()=>{changeSlide(1);startTimer()});document.querySelector('#pause').addEventListener('click',e=>{playing=!playing;e.currentTarget.textContent=playing?'Ⅱ':'▶';e.currentTarget.setAttribute('aria-label',playing?'자동재생 정지':'자동재생 시작');startTimer()});startTimer();/* menu slider: one item at a time, cyclic and keyboard-friendly */
const menuTrack=document.querySelector('.menu-grid');
const originalMenuCards=[...menuTrack.querySelectorAll('.menu-card')].map(card=>card.cloneNode(true));
const menuPrev=document.querySelector('.menu-prev');
const menuNext=document.querySelector('.menu-next');
const menuStatus=document.querySelector('.menu-slide-status');
let menuFilter='all',menuIndex=0,menuBusy=false;
function currentMenuItems(){return originalMenuCards.filter(card=>menuFilter==='all'||card.dataset.kind===menuFilter)}
function drawMenu(){
 const items=currentMenuItems(),count=items.length;
 menuTrack.style.transition='none';menuTrack.style.transform='translateX(0)';menuTrack.replaceChildren();
 // Repeat the source items so slides stay filled on desktop even with only 2–3 menus.
 for(let k=0;k<Math.max(6,count*3);k++){
  const idx=((menuIndex+k)%count);const card=items[idx].cloneNode(true);
  card.classList.toggle('is-featured',k===0);menuTrack.appendChild(card);
 }
 menuStatus.textContent=String(menuIndex+1).padStart(2,'0')+' / '+String(count).padStart(2,'0');
 menuPrev.disabled=count<2;menuNext.disabled=count<2;menuBusy=false;
}
function moveMenu(direction){
 if(menuBusy||currentMenuItems().length<2)return;menuBusy=true;
 const card=menuTrack.querySelector('.menu-card');const gap=parseFloat(getComputedStyle(menuTrack).gap)||0;
 const step=card.getBoundingClientRect().width+gap;
 if(direction>0){menuTrack.style.transition='transform .45s cubic-bezier(.22,.61,.36,1)';menuTrack.style.transform='translateX(-'+step+'px)';setTimeout(()=>{menuIndex=(menuIndex+1)%currentMenuItems().length;drawMenu()},470)}
 else{menuIndex=(menuIndex-1+currentMenuItems().length)%currentMenuItems().length;drawMenu();menuTrack.style.transform='translateX(-'+step+'px)';requestAnimationFrame(()=>requestAnimationFrame(()=>{menuTrack.style.transition='transform .45s cubic-bezier(.22,.61,.36,1)';menuTrack.style.transform='translateX(0)';setTimeout(()=>{drawMenu()},470)}))}
}
menuPrev.addEventListener('click',()=>moveMenu(-1));menuNext.addEventListener('click',()=>moveMenu(1));
document.querySelectorAll('.menu-tabs button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.menu-tabs button').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');menuFilter=b.dataset.filter;menuIndex=0;drawMenu()}));
drawMenu();document.querySelector('#siteToggle').addEventListener('click',e=>{const on=document.querySelector('#franchise').hidden;document.querySelector('#franchise').hidden=!on;document.querySelector('#consumer').hidden=on;e.currentTarget.textContent=on?'브랜드 사이트 ↗':'창업 사이트 ↗';e.currentTarget.setAttribute('aria-pressed',String(on));document.querySelector('.nav').innerHTML=on?'<a href="#fran-top">창업 소개</a><a href="#fran-performance">창업 성과</a><a href="#fran-info">창업 안내</a><a href="https://www.9922.co.kr/consulting" target="_blank" rel="noopener">창업 문의</a>':'<a href="#menu">메뉴</a><a href="#app">브랜드 · APP</a><a href="#store">매장찾기</a><a href="#event">이벤트</a>';document.querySelector('.nav').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})});document.querySelector('.hamb').addEventListener('click',e=>{const nav=document.querySelector('.nav');const open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open))});
