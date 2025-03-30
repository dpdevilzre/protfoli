import * as THREE from 'three';

declare module 'three' {
  export class Points<TGeometry extends THREE.BufferGeometry = THREE.BufferGeometry, TMaterial extends THREE.Material = THREE.Material> extends THREE.Object3D {
    constructor(geometry?: TGeometry, material?: TMaterial);
    geometry: TGeometry;
    material: TMaterial;
    type: 'Points';
    morphTargetInfluences?: number[];
    morphTargetDictionary?: { [key: string]: number };
    isPoints: true;
    updateMorphTargets(): void;
  }

  export class PointsMaterial extends THREE.Material {
    constructor(parameters?: THREE.PointsMaterialParameters);
    color: THREE.Color;
    map: THREE.Texture | null;
    alphaMap: THREE.Texture | null;
    size: number;
    sizeAttenuation: boolean;
    morphTargets: boolean;
    isPointsMaterial: true;
  }

  export interface PointsMaterialParameters extends THREE.MaterialParameters {
    color?: THREE.ColorRepresentation;
    map?: THREE.Texture | null;
    alphaMap?: THREE.Texture | null;
    size?: number;
    sizeAttenuation?: boolean;
    morphTargets?: boolean;
  }
}