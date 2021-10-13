import {STTStyle} from "@store/style/style.store";

const root = document.documentElement.style;

export function InitStyles() {
  var styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .stt-box {
      width: var(--stt-box-width);
      height: var(--stt-box-height);
      max-height: var(--stt-box-max-height);
      background-color: var(--stt-box-bg-color);
      background-image: var(--stt-box-bg-image);
      transform: var(--stt-box-transform);
      opacity: var(--stt-box-opacity);
      box-shadow: var(--stt-box-shadow);
      border: var(--stt-box-border);
      border-radius: var(--stt-box-border-radius);
      border-image-slice: var(--stt-box-border-image-slice);
      border-image-width: var(--stt-box-border-image-width);
    }
    .hide .stt-box {
      width: var(--stt-box-width-alt);
      height: var(--stt-box-height-alt);
      max-height: var(--stt-box-max-height-alt);
      background-color: var(--stt-box-bg-color-alt);
      background-image: var(--stt-box-bg-image-alt);
      transform: var(--stt-box-transform-alt);
      opacity: var(--stt-box-opacity-alt);
      box-shadow: var(--stt-box-shadow-alt);
      border: var(--stt-box-border-alt);
      border-radius: var(--stt-box-border-radius-alt);
      border-image-slice: var(--stt-box-border-image-slice-alt);
      border-image-width: var(--stt-box-border-image-width-alt);
    }
    
    .stt-box-text {
      color: var(--stt-text-color);
      font-size: var(--stt-text-font-size);
      font-family: var(--stt-text-font-family);
      line-height: var(--stt-text-line-height);
      font-weight: var(--stt-text-font-weight);
      text-transform: var(--stt-text-text-transform);
      justify-content: var(--stt-text-justify-content);
      align-content: var(--stt-text-align-content);
      margin: var(--stt-text-margin);
      padding: var(--stt-text-padding);
      text-shadow: var(--stt-text-shadow);
      -webkit-text-stroke: var(--stt-text-stroke);
    }
    
    .hide .stt-box-text {
      color: var(--stt-text-color-alt);
      font-size: var(--stt-text-font-size-alt);
      font-family: var(--stt-text-font-family-alt);
      line-height: var(--stt-text-line-height-alt);
      font-weight: var(--stt-text-font-weight-alt);
      text-transform: var(--stt-text-text-transform-alt);
      justify-content: var(--stt-text-justify-content-alt);
      align-content: var(--stt-text-align-content-alt);
      margin: var(--stt-text-margin-alt);
      padding: var(--stt-text-padding-alt);
      text-shadow: var(--stt-text-shadow-alt);
      -webkit-text-stroke: var(--stt-text-stroke-alt);
    }
    
    .stt-box-avatar {
      order: var(--stt-avatar-order);
      width: var(--stt-avatar-width);
      height: var(--stt-avatar-height);
      background-image: var(--stt-avatar-bg-image);
      opacity: var(--stt-avatar-opacity);
      transform: var(--stt-avatar-transform);
    }
    
    .hide .stt-box-avatar {
      order: var(--stt-avatar-order-alt);
      width: var(--stt-avatar-width-alt);
      height: var(--stt-avatar-height-alt);
      background-image: var(--stt-avatar-bg-image-alt);
      opacity: var(--stt-avatar-opacity-alt);
      transform: var(--stt-avatar-transform-alt);
    }
    
    .emote {
      height: var(--stt-emote-height);
    }
  `
  document.head.appendChild(styleEl);
}

export function SelectUpdateCssStyle< K extends keyof STTStyle>(target: K, object: any) {
  if (target === "avatarStyle") UpdateAvatar(object);
  if (target === "boxStyle") UpdateBox(object);
  if (target === "textStyle") UpdateTextContainer(object);
  if (target === "globalStyle") UpdateEmotes(object);
}

function SetCssProperty(property: string, fn: (i: number) => string | number) {
  root.setProperty(property, fn(0) as string);
  root.setProperty(property + '-alt', fn(1) as string);
}

export function UpdateBox(boxStyle: STTStyle['boxStyle']) {
  SetCssProperty('--stt-box-width', i => boxStyle.width.value[i]+'px');
  SetCssProperty('--stt-box-bg-color', i => boxStyle.backgroundColor.value[i]);
  SetCssProperty('--stt-box-opacity', i => boxStyle.opacity.value[i]);
  SetCssProperty('--stt-box-transform', i => `translateX(${boxStyle.transformX.value[i]}px) translateY(${boxStyle.transformY.value[i]}px) scale(${boxStyle.scale.value[i]})`);
  SetCssProperty('--stt-box-shadow', i => `${boxStyle.shadowX.value[i]}px ${boxStyle.shadowY.value[i]}px ${boxStyle.shadowB.value[i]}px ${boxStyle.shadowSpread.value[0]}px ${boxStyle.shadowColor.value[i]}`)

  // calculated values
  // height
  if (boxStyle.heightMode.value[0] === 'grow') {
    SetCssProperty('--stt-box-height', i => 'auto');
    SetCssProperty('--stt-box-max-height', i => boxStyle.height.value[i]+'px');
  }
  else {
    SetCssProperty('--stt-box-height', i => boxStyle.height.value[i]+'px');
    SetCssProperty('--stt-box-max-height', i => 'none');
  }

  //background
  if (boxStyle.bgStyle.value[0] === 'normal') {
    SetCssProperty('--stt-box-bg-image', i => `url('${boxStyle.backgroundImage.value[i]}')`);
    SetCssProperty('--stt-box-border', i => `${boxStyle.borderWidth.value[i]}px solid ${boxStyle.borderColor.value[i]}`);
    SetCssProperty('--stt-box-border-radius', i => `${boxStyle.borderRadius.value[i]}px`);
    SetCssProperty('--stt-box-border-image-slice', i => 'none');
    SetCssProperty('--stt-box-border-image-width', i => 'none');
  }
  else {
    SetCssProperty('--stt-box-bg-image', i => `none`);
    SetCssProperty('--stt-box-border', i => `0px solid transparent`);
    SetCssProperty('--stt-box-border-radius', i => 0);
    SetCssProperty('--stt-box-border-image-slice', i => `${boxStyle.borderWidthTop.value[i]} ${boxStyle.borderWidthRight.value[i]} ${boxStyle.borderWidthBottom.value[i]} ${boxStyle.borderWidthLeft.value[i]} fill`);
    SetCssProperty('--stt-box-border-image-width', i => `${boxStyle.borderWidthTop.value[i]}px ${boxStyle.borderWidthRight.value[i]}px ${boxStyle.borderWidthBottom.value[i]}px ${boxStyle.borderWidthLeft.value[i]}px`);
    // border-image-slice x-x-x-x fill
    // border-image-width x-x-x-x
  }
}

function UpdateTextContainer(textStyle: STTStyle['textStyle']) {
  SetCssProperty('--stt-text-color', i => textStyle.color.value[i]);
  SetCssProperty('--stt-text-font-family', i => textStyle.fontFamily.value[i]);
  SetCssProperty('--stt-text-font-size', i => `${textStyle.fontSize.value[i]}px`);
  SetCssProperty('--stt-text-line-height', i => textStyle.lineHeight.value[i]);
  SetCssProperty('--stt-text-font-weight', i => textStyle.fontWeight.value[i]);
  SetCssProperty('--stt-text-text-transform', i => textStyle.textTransform.value[i]);
  SetCssProperty('--stt-text-justify-content', i => textStyle.justifyContent.value[i]);
  SetCssProperty('--stt-text-align-content', i => textStyle.alignContent.value[i]);
  SetCssProperty('--stt-text-margin', i => `${textStyle.marginTop.value[i]}px ${textStyle.marginRight.value[i]}px ${textStyle.marginBottom.value[i]}px ${textStyle.marginLeft.value[i]}px`);
  SetCssProperty('--stt-text-padding', i => `${textStyle.paddingTop.value[i]}px ${textStyle.paddingRight.value[i]}px ${textStyle.paddingBottom.value[i]}px ${textStyle.paddingLeft.value[i]}px`);
  SetCssProperty('--stt-text-shadow', i => `${textStyle.shadowX.value[i]}px ${textStyle.shadowY.value[i]}px ${textStyle.shadowB.value[i]}px ${textStyle.shadowColor.value[i]}`);
  SetCssProperty('--stt-text-stroke', i => `${textStyle.webkitTextStrokeWidth.value[i]}px ${textStyle.webkitTextStrokeColor.value[i]}`);
}

function UpdateAvatar(avatarStyle: STTStyle['avatarStyle']) {
  SetCssProperty('--stt-avatar-order', i => avatarStyle.order.value[i]);
  SetCssProperty('--stt-avatar-width', i => `${avatarStyle.width.value[i]}px`);
  SetCssProperty('--stt-avatar-height', i => `${avatarStyle.height.value[i]}px`);
  SetCssProperty('--stt-avatar-bg-image', i => `url('${avatarStyle.backgroundImage.value[i]}')`);
  SetCssProperty('--stt-avatar-opacity', i => avatarStyle.opacity.value[i]);
  SetCssProperty('--stt-avatar-transform', i => `translateX(${avatarStyle.transformX.value[i]}px) translateY(${avatarStyle.transformY.value[i]}px)`);
}

function UpdateEmotes(emoteHeight: STTStyle['globalStyle']) {
  SetCssProperty('--stt-emote-height', i => `${emoteHeight.emoteHeight.value[0]}px`);
}

export function UpdateCssStyle(template: STTStyle) {
  const root = document.documentElement?.style;
  if (!root)
    return;
  UpdateBox(template.boxStyle);
  UpdateTextContainer(template.textStyle);
  UpdateAvatar(template.avatarStyle);
  UpdateEmotes(template.globalStyle);
}
