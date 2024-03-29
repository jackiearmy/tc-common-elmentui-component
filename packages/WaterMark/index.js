export default function CanvasWM({
  container = document.body,
  width = '300px',
  height = '200px',
  textAlign = 'center',
  textBaseline = 'middle',
  font = "20px Microsoft Yahei",
  fillStyle = 'rgba(184, 184, 184, 0.6)',
  content = '水印',
  rotate = '45',
  zIndex = 10000
} = {}) {
  const args = arguments[0];
  const canvas = document.createElement('canvas');

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  const ctx = canvas.getContext("2d");

  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate(Math.PI / 180 * rotate);
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

  const base64Url = canvas.toDataURL();
  const __wm = document.querySelector('.__wm');

  const watermarkDiv = __wm || document.createElement("div");
  const styleStr = `
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`;

  watermarkDiv.setAttribute('style', styleStr);
  watermarkDiv.classList.add('__wm');

  if (!__wm) {
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  if (MutationObserver) {
    let mo = new MutationObserver(function () {
      const __wm = document.querySelector('.__wm');
      // 只在__wm元素变动才重新调用 CanvasWM
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        // 避免一直触发
        mo.disconnect();
        mo = null;
        CanvasWM(JSON.parse(JSON.stringify(args)));
      }
    });

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true
    })
  }
}

window.CanvasWM = CanvasWM;

// 调用
// CanvasWM({
// content: '水印123'
// });

