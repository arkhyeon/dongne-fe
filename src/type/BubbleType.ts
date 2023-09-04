export interface BubbleInitType {
  labelScale: number;
  items: ItemInitType[];
}

export interface BubbleType {
  labelScale: number;
  items: ItemsRenderingType[];
  bounds: BoundsType;
}

export interface ItemInitType {
  text: string;
  value: number;
}

export interface CandidatType {
  x: number;
  y: number;
  r: number;
  bounds: BoundsType;
}

export interface ItemsRenderingType extends CandidatType {
  text: string;
  backgroundColor: string;
  index?: number;
}

export interface BoundsType {
  width?: number;
  height?: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}
