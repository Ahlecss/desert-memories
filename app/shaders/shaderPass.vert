precision mediump float;
// those are the mandatory attributes that the lib sets
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
// pass your vertex and texture coords to the fragment shader
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
void main() {
gl_Position = vec4(aVertexPosition, 1.0);
// set the varyings
// use our aTextureCoord attributes as texture coords in our fragment shader
vTextureCoord = aTextureCoord;
vVertexPosition = aVertexPosition;
}
