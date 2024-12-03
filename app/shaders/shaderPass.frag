precision mediump float;
// get our varyings
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
// our render texture
uniform sampler2D uRenderTexture;
void main() {
// display our render texture, which contains our shader pass frame buffer object content
gl_FragColor = texture2D(uRenderTexture, vTextureCoord);
}
