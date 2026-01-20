import{S as d,i}from"./vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u=document.querySelector("#searchForm"),c=document.querySelector(".gallery"),l=document.querySelector("#loader"),f=new d(".gallery a");async function m(n){const r=`https://pixabay.com/api/?key=54263025-950edd76720feea70ed7c80b6&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`;try{return(await(await fetch(r)).json()).hits}catch(s){return i.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error(s),[]}}u.addEventListener("submit",async n=>{n.preventDefault();const o=n.target.query.value.trim();if(!o)return;c.innerHTML="",y();const r=await m(o);if(h(),r.length===0){i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}p(r),f.refresh()});function p(n){const o=n.map(r=>`
      <li class="gallery-item">
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${r.likes}</p>
          <p><b>Views:</b> ${r.views}</p>
          <p><b>Comments:</b> ${r.comments}</p>
          <p><b>Downloads:</b> ${r.downloads}</p>
        </div>
      </li>
    `).join("");c.insertAdjacentHTML("beforeend",o)}function y(){l.classList.remove("hidden")}function h(){l.classList.add("hidden")}
//# sourceMappingURL=main-D3kiXFsC.js.map
