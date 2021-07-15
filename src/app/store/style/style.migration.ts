import {STTStyle, STYLE_TEMPLATE} from "@store/style/style.store";
import deepmerge                  from "deepmerge";

const migrations = [
  migrate_1,
  migrate_2,
  migrate_3,
  migrate_4,
  migrate_5,
  migrate_6,
  migrate_7,
  migrate_8,
]

export function migrate_style(style: STTStyle): STTStyle {
  if (style.version === STYLE_TEMPLATE.version)
    return style;
  let styleClone = {...style};
  console.log("[Migrate] template from", style.version);
  for (let i = style.version || 0; i < STYLE_TEMPLATE.version; i++) {
    if (i < STYLE_TEMPLATE.version)
      styleClone = migrations[i](styleClone);
  }
  return styleClone;
}

function migrate_1(style: STTStyle): STTStyle {
  console.log("migrate 0 -> 1");
  return style;
}

function migrate_2(style: STTStyle): STTStyle {
  console.log("migrate 1 -> 2");
  const currentStyle: any = deepmerge(STYLE_TEMPLATE, style, {arrayMerge: (destinationArray, sourceArray, options) => sourceArray});
  // remove inset
  if (currentStyle.avatarStyle.bottom) delete currentStyle.avatarStyle.bottom;
  if (currentStyle.avatarStyle.left) delete currentStyle.avatarStyle.left;
  // remove animations
  if (currentStyle.avatarStyle.animationName) delete currentStyle.avatarStyle.animationName;
  if (currentStyle.avatarStyle.animationDuration) delete currentStyle.avatarStyle.animationDuration;
  // rename
  if (currentStyle.globalStyle.clearOnHide) delete currentStyle.globalStyle.clearOnHide;
  if (currentStyle.globalStyle.alwaysShow) delete currentStyle.globalStyle.alwaysShow;
  if (currentStyle.globalStyle.hideAfter) delete currentStyle.globalStyle.hideAfter;
  if (currentStyle.textStyle.alignItems) {
    currentStyle.textStyle.alignContent.value = currentStyle.textStyle.alignItems.value;
    delete currentStyle.textStyle.alignItems;
  }
  const textValues = currentStyle.textStyle;

  // inset -> margin
  if (!!textValues.top) {
    currentStyle.textStyle.marginTop.value = textValues.top.value;
    delete currentStyle.textStyle.top;
  }
  if (!!textValues.bottom) {
    currentStyle.textStyle.marginBottom.value = textValues.bottom.value;
    delete currentStyle.textStyle.bottom;
  }
  if (!!textValues.left) {
    currentStyle.textStyle.marginLeft.value = textValues.left.value;
    delete currentStyle.textStyle.left;
  }
  if (!!textValues.right) {
    currentStyle.textStyle.marginRight.value = textValues.right.value;
    delete currentStyle.textStyle.right;
  }
  if (typeof textValues.marginRight !== "object") currentStyle.textStyle.marginRight = STYLE_TEMPLATE.textStyle.marginRight;
  if (typeof textValues.marginLeft !== "object") currentStyle.textStyle.marginLeft = STYLE_TEMPLATE.textStyle.marginLeft;
  if (typeof textValues.marginTop !== "object") currentStyle.textStyle.marginTop = STYLE_TEMPLATE.textStyle.marginTop;
  if (typeof textValues.marginBottom !== "object") currentStyle.textStyle.marginBottom = STYLE_TEMPLATE.textStyle.marginBottom;

  // validate numbers
  if (typeof textValues.scaleMin.value === "string") currentStyle.textStyle.scaleMin.value = parseFloat(textValues.scaleMin.value)
  if (typeof textValues.scaleMax.value === "string") currentStyle.textStyle.scaleMax.value = parseFloat(textValues.scaleMax.value)
  if (typeof textValues.durationMin.value === "string") currentStyle.textStyle.durationMin.value = parseFloat(textValues.durationMin.value)
  if (typeof textValues.durationMax.value === "string") currentStyle.textStyle.durationMax.value = parseFloat(textValues.durationMax.value)
  if (typeof textValues.rotationMin.value === "string") currentStyle.textStyle.rotationMin.value = parseFloat(textValues.rotationMin.value)
  if (typeof textValues.rotationMax.value === "string") currentStyle.textStyle.rotationMax.value = parseFloat(textValues.rotationMax.value)
  if (typeof textValues.translationXMin.value === "string") currentStyle.textStyle.translationXMin.value = parseFloat(textValues.translationXMin.value)
  if (typeof textValues.translationXMax.value === "string") currentStyle.textStyle.translationXMax.value = parseFloat(textValues.translationXMax.value)
  if (typeof textValues.translationYMin.value === "string") currentStyle.textStyle.translationYMin.value = parseFloat(textValues.translationYMin.value)
  if (typeof textValues.translationYMax.value === "string") currentStyle.textStyle.translationYMax.value = parseFloat(textValues.translationYMax.value)

  for (let styleSection of ["boxStyle", "textStyle", "avatarStyle", "soundStyle", "globalStyle"]) {
    for (let styleKey in currentStyle[styleSection]) {
      const value = currentStyle[styleSection][styleKey].value;
      if (!Array.isArray(value)) {
        delete currentStyle[styleSection][styleKey].iValue;
        currentStyle[styleSection][styleKey].value = [value, value];
      }
    }
  }
  // transform: {
  //   x: {type: StyleValueType.translateX, value: ['0', '0'], linked: true},
  //   y: {type: StyleValueType.translateY, value: ['0', '0'], linked: true},
  // }
  if (currentStyle.avatarStyleComposite) {
    const transformX                          = currentStyle.avatarStyleComposite?.transform?.x?.value;
    const transformY                          = currentStyle.avatarStyleComposite?.transform?.y?.value;
    currentStyle.avatarStyle.transformX.value = transformX ? [transformX, transformX] : [0, 0];
    currentStyle.avatarStyle.transformY.value = transformX ? [transformY, transformY] : [0, 0];
    console.log(currentStyle.avatarStyle.transformX, currentStyle.avatarStyle.transformY)
    delete currentStyle.avatarStyleComposite;
  }

  if (currentStyle.textStyleComposite) {
    const x     = currentStyle.textStyleComposite?.textShadow?.x?.value;
    const y     = currentStyle.textStyleComposite?.textShadow?.y?.value;
    const b     = currentStyle.textStyleComposite?.textShadow?.b?.value;
    const color = currentStyle.textStyleComposite?.textShadow?.color?.value;

    currentStyle.textStyle.shadowX.value     = x ? [x, x] : ['0', '0']
    currentStyle.textStyle.shadowY.value     = y ? [y, y] : ['0', '0']
    currentStyle.textStyle.shadowB.value     = b ? [b, b] : ['0', '0']
    currentStyle.textStyle.shadowColor.value = color ? [color, color] : ['black', 'black']
  }

  currentStyle.version = 2
  return currentStyle;
}


function migrate_3(style: STTStyle): STTStyle {
  console.log("migrate 2 -> 3");
  const s = deepmerge(STYLE_TEMPLATE, style, {arrayMerge: (destinationArray, sourceArray, options) => sourceArray});
  s.version = 3;
  return s;
}

// add text-stroke
function migrate_4(style: STTStyle): STTStyle {
  console.log("migrate 3 -> 4");
  const s = deepmerge(STYLE_TEMPLATE, style, {arrayMerge: (destinationArray, sourceArray, options) => sourceArray});
  s.version = 4;
  return s;
}

// add type-clip
function migrate_5(style: STTStyle): STTStyle {
  console.log("migrate 4 -> 5");
  const s = deepmerge(STYLE_TEMPLATE, style, {arrayMerge: (destinationArray, sourceArray, options) => sourceArray});
  s.version = 5;
  return s;
}

// add typing animation
function migrate_6(style: STTStyle): STTStyle {
  console.log("migrate 5 -> 6");
  const s = deepmerge(STYLE_TEMPLATE, style, {arrayMerge: (destinationArray, sourceArray, options) => sourceArray});
  s.version = 6;
  return s;
}

// add emote height
function migrate_7(style: STTStyle): STTStyle {
  console.log("migrate 6 -> 7");
  const s = deepmerge(STYLE_TEMPLATE, style, {arrayMerge: (destinationArray, sourceArray, options) => sourceArray});
  s.version = 7;
  return s;
}

// add audio playback and detune
function migrate_8(style: STTStyle): STTStyle {
  console.log("migrate 7 -> 8");
  const s = deepmerge(STYLE_TEMPLATE, style, {arrayMerge: (destinationArray, sourceArray, options) => sourceArray});
  s.version = 8;
  return s;
}
