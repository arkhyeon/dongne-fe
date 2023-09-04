import {
  BoundsType,
  CandidatType,
  ItemInitType,
  ItemsRenderingType,
} from '../../../type/BubbleType';

export function prepare(items: ItemInitType[]) {
  const itemsForRendering: ItemsRenderingType[] = [];
  const aspectRatio = 1.3;
  let itemsBounds: BoundsType = { bottom: 0, right: 0, left: 0, top: 0 };

  for (let i = 0; i < items.length; i++) {
    const r = items[i].value ?? 0;
    const text = items[i].text;
    const backgroundColor =
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase();
    let x;
    let y;
    let bounds;

    switch (i) {
      case 0:
        x = 0;
        y = 0;
        bounds = { left: -r, top: -r, right: r, bottom: r };
        itemsBounds = { left: -r, top: -r, right: r, bottom: r };
        break;
      case 1:
        items[0].value = items[0].value ?? 0;
        items[1].value = items[1].value ?? 0;

        x = items[0].value + items[1].value;
        y = 0;
        bounds = { left: -r, top: -r, right: r, bottom: r };
        itemsBounds = {
          top: 0,
          right: 0,
          left: -items[0].value,
          bottom: Math.max(items[0].value, items[1].value),
        };
        break;
      default: {
        let candidats = [];
        for (let j = 0; j < itemsForRendering.length; j++) {
          for (let k = j + 1; k < itemsForRendering.length; k++) {
            const index1 = j;
            const index2 = k;
            const x1 = Number(itemsForRendering[index1].x);
            const y1 = Number(itemsForRendering[index1].y);
            const r1 = Number(itemsForRendering[index1].r) + r;
            const x2 = Number(itemsForRendering[index2].x);
            const y2 = Number(itemsForRendering[index2].y);
            const r2 = Number(itemsForRendering[index2].r) + r;

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

            const cos2 = (Math.pow(a, 2) - Math.pow(c, 2) + Math.pow(b, 2)) / (2 * a * b);
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
              Math.pow(r + Number(item.r), 2) * 0.95 >
              Math.pow(candidat.x - Number(item.x), 2) + Math.pow(candidat.y - Number(item.y), 2)
            ) {
              return false;
            }
          }
          return true;
        });
        for (let i = candidats.length; i--; ) {
          const candidat = candidats[i] as CandidatType;
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
          const { bounds } = candidats[index] as CandidatType;

          let left = minX,
            right = maxX;
          let top = minY,
            bottom = maxY;
          if (left > bounds.left) {
            left = bounds.left;
          }
          if (right < bounds.right) {
            right = bounds.right;
          }
          if (top > bounds.top) {
            top = bounds.top;
          }
          if (bottom < bounds.bottom) {
            bottom = bounds.bottom;
          }
          const width = right - left,
            height = bottom - top;
          const value = Math.abs(width / height - aspectRatio) * (width * height);
          results.push({ value, index, bounds: { width, height, left, top } });
        }
        // results.sort(sortByValue);
        results.sort((a, b) => a.value - b.value);

        const candidat = candidats[results[0].index] as CandidatType;

        itemsBounds = results[0].bounds as BoundsType;
        x = candidat.x;
        y = candidat.y;
        bounds = candidat.bounds;
      }
    }
    itemsForRendering.push({ x, y, r, text, bounds, backgroundColor });
  }

  for (let i = itemsForRendering.length; i--; ) {
    const item = itemsForRendering[i] as CandidatType;

    item.x -= itemsBounds.left;
    item.y -= itemsBounds.top;
  }

  return {
    preparedItems: itemsForRendering,
    bounds: itemsBounds,
  };
}

// function sortByValue(a: ItemType, b: ItemType) {
//   const prevValue = a.value ?? 0;
//   const nextValue = b.value ?? 0;
//
//   if (prevValue > nextValue) {
//     return 1;
//   } else if (prevValue < nextValue) {
//     return -1;
//   } else {
//     return 0;
//   }
// }
