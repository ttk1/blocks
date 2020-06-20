import * as THREE from 'three';
import { Block } from './block';

// texture
const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureStone = cubeTextureLoader.load([
  'texture/stone.png',
  'texture/stone.png',
  'texture/stone.png',
  'texture/stone.png',
  'texture/stone.png',
  'texture/stone.png'
]);

const originalGeometory = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.ShaderMaterial({
  lights: true,
  uniforms: {
    ...THREE.ShaderLib.standard.uniforms,
    tCube: {
      value: textureStone
    }
  },
  vertexShader: require('./glsl/vert.glsl').default as string,
  fragmentShader: require('./glsl/frag.glsl').default as string
});

export class Chunk {
  public mesh: THREE.Mesh;
  private x: number;
  private z: number;

  constructor(x: number, z: number, chunkData: string[][][]) {
    this.x = x;
    this.z = z;
    this.mesh = this.getMesh(chunkData);
  }

  private getMesh(chunkData: string[][][]) {
    const offsetArray = [];
    const colorArray = [];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 256; y++) {
        for (let z = 0; z < 16; z++) {
          const block = new Block(chunkData[x][y][z]);
          if (block.transparent) {
            continue;
          }
          offsetArray.push(
            x + this.x * 16,
            y,
            z + this.z * 16
          );
          colorArray.push(...block.color);
        }
      }
    }

    const instancedGeometory = new THREE.InstancedBufferGeometry();
    instancedGeometory.setAttribute('position', originalGeometory.getAttribute('position'));
    instancedGeometory.setAttribute('normal', originalGeometory.getAttribute('normal'));
    instancedGeometory.setIndex(originalGeometory.getIndex());

    const offset = new THREE.InstancedBufferAttribute(new Float32Array(offsetArray), 3, false);
    const color = new THREE.InstancedBufferAttribute(new Float32Array(colorArray), 3, false);
    instancedGeometory.setAttribute('offset', offset);
    instancedGeometory.setAttribute('color', color);

    const mesh = new THREE.Mesh(instancedGeometory, material);
    mesh.frustumCulled = false;
    return mesh;
  }
}
