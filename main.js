import './style.css'
import { StartView } from './StartView'
import {startTone, incrementSequence, stopAll, setVolume, setMute} from './synth.js'
const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
const measurenumbers = [1, 2, 18, 78, 142, 155, 159, 173]
const images = [0, 1, 2, 3, 4, 5, 6, 7]
let counter = 0
function MusicView() {
   document.querySelector("#app").innerHTML =
      html`
      <div class="fader">
         <div>
         <input id="volume" type="range" min="-50" max="0" step="0.01" orient="vertical" value="0" onkeydown="return false" />
         </div>
         <div>
         <label>Mute <input id="mute" type="checkbox" /></label>
         </div>
      </div>
   <div id="musicbox">
      ${images.map(i => html`
      <div class="musicitem" >${measurenumbers[i]}<img src="${i}.svg" class="musicimg" id="select_${i}"/>
         <span class="material-symbols-outlined" id="play_${i}">${i == 0 ? "chevron_left" : ""}</span>
      </div>
      `).join("")}
   </div>
   `
   images.forEach(i =>
      document.querySelector(`#select_${i}`)
         .addEventListener("click", () => {
            counter = i; setActive(i)
         }))
   document.querySelector("#volume").addEventListener("change", e => setVolume(e.target.value))
   document.querySelector("#mute").addEventListener("change", e => setMute(e.target.checked))

}
function setActive(i) {
   images.forEach(i => {
      i === counter ?
      document.querySelector(`#play_${i}`).innerHTML = "chevron_left" :
      document.querySelector(`#play_${i}`).innerHTML = ""
   })
   stopAll()
}
document.addEventListener("onload", StartView({ next: () => { startTone(); MusicView() } }))
document.addEventListener("keydown", (e) => {
   if (e.key === "PageDown") {
      counter = incrementSequence(images, counter)
   }
   if (e.key === "Escape") {
      synths.forEach(s => {
         s.synth.triggerRelease(s.pitch)
      })
   }
})