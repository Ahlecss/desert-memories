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
        // displace our pixels along the X axis based on our time uniform
        // textures coords are ranging from 0.0 to 1.0 on both axis
        // textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(u_time / 50.0)) / 25.0;

        // textureCoord.x += u_time * 0.1;
        // gl_FragColor = texture2D(uSampler0, textureCoord);

        vec3 color = rgbShift(uSampler0, vTextureCoord, vec2(vWave * 0.05 * -u_mouse));
        gl_FragColor = vec4(color, 1.);

//         float wave = vWave * 0.2;
//         float r = texture2D(uSampler0, textureCoord).r;
//         float g = texture2D(uSampler0, textureCoord).g;
//         float b = texture2D(uSampler0, textureCoord + wave).b;
//   // Put them back together
//         vec3 texture = vec3(r, g, b);
//         gl_FragColor = vec4(texture, 1.);
}