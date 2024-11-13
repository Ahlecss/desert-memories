precision mediump float;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
varying float vWave;

uniform sampler2D uSampler0;

uniform float u_time;
uniform vec2 u_mouse;
uniform float u_noisyEffect;

vec3 rgbShift(sampler2D texture, vec2 uv, vec2 offset) {
        float r = texture2D(texture, uv + (offset * u_noisyEffect)).r;
        vec2 gb = texture2D(texture, uv).gb;
        return vec3(r, gb);
}

void main() {
        vec2 textureCoord = vTextureCoord;
        vec3 vertexPosition = vVertexPosition;

        vec3 color = rgbShift(uSampler0, textureCoord, vec2(vWave * 0.05 * -u_mouse));
        gl_FragColor = vec4(color, 1.);
}