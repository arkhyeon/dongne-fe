export function prepare({ items, palette, aspectRatio = 1.3 }) {
  const itemsForRendering = [];
  let itemsBounds = {};

  for (let i = 0; i < items.length; i++) {
    let r = items[i].value,
      text = items[i].text,
      backgroundColor =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
          .toUpperCase(),
      x,
      y,
      bounds;
    switch (i) {
      case 0:
        x = 0;
        y = 0;
        bounds = { left: -r, top: -r, right: r, bottom: r };
        itemsBounds = { left: -r, top: -r, right: r, bottom: r };
        break;
      case 1:
        x = items[0].value + items[1].value;
        y = 0;
        bounds = { left: -r, top: -r, right: r, bottom: r };
        itemsBounds = {
          left: -items[0].value,
          bottom: Math.max(items[0].value, items[1].value),
        };
        break;
      default:
        let candidats = [];
        for (let j = 0; j < itemsForRendering.length; j++) {
          for (let k = j + 1; k < itemsForRendering.length; k++) {
            const index1 = j;
            const index2 = k;
            const x1 = itemsForRendering[index1].x;
            const y1 = itemsForRendering[index1].y;
            const r1 = itemsForRendering[index1].r + r;
            const x2 = itemsForRendering[index2].x;
            const y2 = itemsForRendering[index2].y;
            const r2 = itemsForRendering[index2].r + r;

            const a = r2;
            const b = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            const c = r1;
            if (a >= b + c || b >= a + c || c >= a + b) {
              continue;
            }

            const cos1 = (Math.pow(c, 2) - Math.pow(a, 2) + Math.pow(b, 2)) / (2 * c * b);
            const acos1 = Math.acos(cos1);
            const alpha1 = acos1 + Math.atan2(y2 - y1, x2 - x1);
            candidats.push({
              x: x1 + Math.cos(alpha1) * r1,
              y: y1 + Math.sin(alpha1) * r1,
            });

            let cos2 = (Math.pow(a, 2) - Math.pow(c, 2) + Math.pow(b, 2)) / (2 * a * b);
            const acos2 = Math.acos(cos2);
            const alpha2 = acos2 + Math.atan2(y1 - y2, x1 - x2);
            candidats.push({
              x: x2 + Math.cos(alpha2) * r2,
              y: y2 + Math.sin(alpha2) * r2,
            });
          }
        }
        candidats = candidats.filter(candidat => {
          for (let i = itemsForRendering.length; i--; ) {
            const item = itemsForRendering[i];
            if (
              Math.pow(r + item.r, 2) * 0.95 >
              Math.pow(candidat.x - item.x, 2) + Math.pow(candidat.y - item.y, 2)
            ) {
              return false;
            }
          }
          return true;
        });
        for (let i = candidats.length; i--; ) {
          const candidat = candidats[i];
          candidat.bounds = {
            left: candidat.x - r,
            right: candidat.x + r,
            top: candidat.y - r,
            bottom: candidat.y + r,
          };
        }
        let minX = Number.MAX_VALUE,
          maxX = Number.MIN_VALUE;
        let minY = Number.MAX_VALUE,
          maxY = Number.MIN_VALUE;
        for (let i = itemsForRendering.length; i--; ) {
          const { bounds } = itemsForRendering[i];
          if (minX > bounds.left) {
            minX = bounds.left;
          }
          if (maxX < bounds.right) {
            maxX = bounds.right;
          }
          if (minY > bounds.top) {
            minY = bounds.top;
          }
          if (maxY < bounds.bottom) {
            maxY = bounds.bottom;
          }
        }

        const results = [];
        for (let index = candidats.length; index--; ) {
          const candidat = candidats[index];
          let left = minX,
            right = maxX;
          let top = minY,
            bottom = maxY;
          if (left > candidat.bounds.left) {
            left = candidat.bounds.left;
          }
          if (right < candidat.bounds.right) {
            right = candidat.bounds.right;
          }
          if (top > candidat.bounds.top) {
            top = candidat.bounds.top;
          }
          if (bottom < candidat.bounds.bottom) {
            bottom = candidat.bounds.bottom;
          }
          const width = right - left,
            height = bottom - top;
          const value = Math.abs(width / height - aspectRatio) * (width * height);
          results.push({ value, index, bounds: { width, height, left, top } });
        }
        results.sort(sortByValue);

        const candidat = candidats[results[0].index];
        itemsBounds = results[0].bounds;
        x = candidat.x;
        y = candidat.y;
        bounds = candidat.bounds;
    }
    itemsForRendering.push({ x, y, r, text, bounds, backgroundColor });
  }
  console.log(itemsForRendering);
  for (let i = itemsForRendering.length; i--; ) {
    const item = itemsForRendering[i];
    item.x -= itemsBounds.left;
    item.y -= itemsBounds.top;
  }

  return {
    preparedItems: itemsForRendering,
    bounds: itemsBounds,
  };
}

function sortByValue(a, b) {
  if (a.value > b.value) {
    return 1;
  } else if (a.value < b.value) {
    return -1;
  } else {
    return 0;
  }
}
