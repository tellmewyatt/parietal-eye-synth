import './style.css'
import * as Tone from 'tone'
let counter = 0
const reverb = new Tone.Reverb(5)
const chorus = new Tone.Chorus(0.03, 2.5, 0.5).start()
const phaser = new Tone.Phaser({
   frequency: 0.05,
   octaves: 3,
   baseFrequency: "D3"
})
const lfo = new Tone.LFO(0.04, 0.01, 0.03).connect(phaser.frequency)
const synth = new Tone.PolySynth(Tone.Synth).chain(chorus, phaser, reverb, Tone.Destination)
synth.set({
   oscillator: {
      partialCount: 0,
      type: 'triangle16'
   },
   envelope: {
      attack: 2,
      decay: 2,
      sustain: 0.5,
      release: 2,
   }
})
const synths = [
   {
      start: 1,
      end: 3,
      pitch: "D3",
      synth: synth
   },
   {
      start: 2,
      end: 3,
      pitch: "D2",
      synth: synth
   },
   {
      start: 4,
      end: 7,
      synth: synth,
      pitch: ["A1", "E2", "A2"]
   },
   {
      start: 5,
      end: 7,
      synth: synth,
      pitch: ["A3", "E4", "A4"]
   },
   {
      start: 6,
      end: 7,
      synth: synth,
      pitch: "C#5"
   },
]
function startTone() {
   console.log("starting tone")
   Tone.start()
}
const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
document.querySelector("#app").innerHTML =
   html`
   <div>
      <button id="startbutton">
         Click to start
      </button>
      <button id="incrementbutton">
         Click to increment
      </button>
   </div>
   `
function incrementSequence() {
   counter++
   synths.forEach(s => {
      console.log(s.start, s.end, counter)
      if (s.start === counter) s.synth.triggerAttack(s.pitch)
      if (s.end === counter) s.synth.triggerRelease(s.pitch)
   })
}
document.querySelector("#startbutton").addEventListener('click', startTone)
document.querySelector('#incrementbutton').addEventListener('click', incrementSequence);
document.addEventListener("keydown", (e) => {
   if (e.key === "PageDown") {
      incrementSequence()
   }
   if (e.key === "Escape") {
      synths.forEach(s => {
         s.synth.triggerRelease(s.pitch)
      })
   }
})