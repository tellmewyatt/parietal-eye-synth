import * as Tone from 'tone'
const reverb = new Tone.Reverb(5)
const chorus = new Tone.Chorus(0.03, 2.5, 0.5).start()
const phaser = new Tone.Phaser({
   frequency: 0.05,
   octaves: 5,
   baseFrequency: "D2"
})
const lfo = new Tone.LFO(0.04, 0.01, 0.03).connect(phaser.frequency)
const volume = new Tone.Volume(-12)
const synth = new Tone.PolySynth(Tone.Synth).chain(chorus, phaser, reverb, volume,Tone.Destination)
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
export function startTone() {
   console.log("starting tone")
   Tone.start()
}
export function setVolume(v) {
   volume.volume.value = v
}
export function setMute(v) {
   console.log(v)
   volume.mute = v
}
export function incrementSequence(images, counter) {
   counter = (counter+1)%images.length
   images.forEach(i => 
      i === counter ?
      document.querySelector(`#play_${i}`).innerHTML = "chevron_left" :
      document.querySelector(`#play_${i}`).innerHTML = "")
   synths.forEach(s => {
      if (s.start === counter) s.synth.triggerAttack(s.pitch)
      if (s.end === counter) s.synth.triggerRelease(s.pitch)
   })
   return counter
}
export function stopAll() {
   synths.forEach(s => s.synth.triggerRelease(s.pitch))
}
