import {Injectable}   from '@angular/core';
import {EffectsStore} from './effects.store';
import anime          from "animejs";
import {StyleQuery}   from "@store/style/style.query";

@Injectable({providedIn: 'root'})
export class EffectsService {
  constructor(private effectsStore: EffectsStore, private styleQuery: StyleQuery) {
  }

  PlayParticles(boundingClientRect?: DOMRect) {
    if (document.hidden)
      return;
    // scale
    // image url
    // n particles
    // rotation
    // duration
    // opacity
    // translate x
    // translate y
    const style = this.styleQuery.getValue().currentStyle.particleStyles;

    if (!style?.enable?.value[0] || !style?.url?.value[0])
      return;

    const listOfParticles = new Array(Math.min(10, anime.random(style.particles.value[0], style.particles.value[1]))).fill(null).map(_ => {
      var particle = document.createElement("div");
      particle.classList.add("dot");
      particle.style.position = 'absolute';
      // particle.style.opacity  = style.opacity.value[0].toString();

      // fallback to first link
      const targetImg = Math.random() < 0.5 ? style.url.value[0] : (style.url.value[1] || style.url.value[0]);
      particle.style.backgroundImage  = `url("${targetImg}")`;

      particle.style.left     = `${boundingClientRect?.x}px`;
      particle.style.top      = `${boundingClientRect?.y}px`;
      return document.body.appendChild(particle);
    });
    const duration = anime.random(style.duration.value[0], style.duration.value[1]);
    anime({
      loop:    false,
      easing:  "easeInOutQuad",
      targets: listOfParticles,
      duration: duration,
      translateX: (_: any, i: number) => [0, anime.random(style.x.value[0], style.x.value[1])],
      translateY: (_: any, i: number) => [0, anime.random(style.y.value[0], style.y.value[1])],
      rotateZ: (_: any, i: number) => [0, anime.random(style.rotation.value[0], style.rotation.value[1])],
      scale: [0, anime.random(style.scale.value[0], style.scale.value[1])],
      opacity: [
        {value: 0, duration: 0}, // 0
        {value: anime.random(style.opacity.value[0], style.opacity.value[1]), duration: duration - duration/4}, // 20%
        {value: 0, duration: duration/4} // 100%
      ],
      complete: () => {
        listOfParticles.forEach(c => document.body.removeChild(c))
      }
    });

    // console.log(boundingClientRect);
  }

}
