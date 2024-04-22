precision mediump float;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform sampler2D uSampler0;

uniform float u_time;

void main() {
        vec2 textureCoord = vTextureCoord;
        // displace our pixels along the X axis based on our time uniform
        // textures coords are ranging from 0.0 to 1.0 on both axis
        // textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(u_time / 50.0)) / 25.0;

        gl_FragColor = texture2D(uSampler0, textureCoord);
        // gl_FragColor = vec4(vec3(1.0, 0., 0.), 1.);
}