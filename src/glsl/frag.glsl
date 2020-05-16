#version 300 es
precision mediump float;

in vec3 vColor;
in vec3 vNormal;

out vec4 fColor;

#include <common>
#include <bsdfs>
#include <lights_pars_begin>

void main() {
  float intensity = max(0.0, dot(vNormal, directionalLights[0].direction));
  intensity += max(0.0, dot(vNormal, directionalLights[1].direction));
  fColor = vec4(intensity * vColor, 1.0);
}
