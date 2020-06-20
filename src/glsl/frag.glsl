#version 300 es
precision mediump float;

in vec3 vColor;
in vec3 vNormal;
in vec3 vPosition;

out vec4 fColor;

uniform samplerCube tCube;

#include <common>
#include <lights_pars_begin>

void main() {
  float intensity = max(0.0, dot(vNormal, directionalLights[0].direction));
  intensity += max(0.0, dot(vNormal, directionalLights[1].direction));
  fColor = vec4(textureCube(tCube, vPosition).rgb * intensity, 1.0);
}
