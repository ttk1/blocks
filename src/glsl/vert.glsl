#version 300 es

in vec3 offset;
in vec3 color;
out vec3 vColor;
out vec3 vNormal;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position + offset, 1.0);
  vColor = color;
  vNormal = normalMatrix * normal;
}
