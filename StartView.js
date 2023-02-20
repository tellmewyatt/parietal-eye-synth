import { markdown } from "markdown";
const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
export async function StartView({ next }) {
   const md = await (await fetch('/performancenotes.md')).text()
   const performancenotes = await markdown.toHTML(md)
   document.querySelector("#app").innerHTML = html`
   <div style="display: block; flex-grow: 1">
      <div class="programnotes">
         ${performancenotes}
         <button id="startbutton">Click here to start</button>
      </div>
   </div>
   `
   document.querySelector("#startbutton").addEventListener('click', next)
}
