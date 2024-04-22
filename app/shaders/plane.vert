precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float u_time;
uniform float u_index;
uniform float u_totalIndex;
uniform float u_scroll;

uniform float u_unwrap;
uniform float u_cardsEffect;

uniform mat4 uTextureMatrix0;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

float circle(vec2 uv, vec2 circlePosition, float radius) {
    float dist = distance(circlePosition, uv);
    return 1. - smoothstep(0.0, radius, dist);
}

mat4 rotationX(in float angle) {
    return mat4(1.0, 0, 0, 0, 0, cos(angle), -sin(angle), 0, 0, sin(angle), cos(angle), 0, 0, 0, 0, 1);
}

mat4 rotationY(in float angle) {
    return mat4(cos(angle), 0, sin(angle), 0, 0, 1.0, 0, 0, -sin(angle), 0, cos(angle), 0, 0, 0, 0, 1);
}

mat4 rotationZ(in float angle) {
    return mat4(cos(angle), -sin(angle), 0, 0, sin(angle), cos(angle), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
}

void main() {
    vec3 vertexPosition = aVertexPosition;
    vec2 textureCoord = aTextureCoord;

    vec4 vertexRotation = vec4(vertexPosition, 1.0);

    vertexRotation = vertexRotation * rotationX(0.) * rotationY(2. * 3.1415 * -u_unwrap * u_index / u_totalIndex - u_scroll * 1.);

    vertexRotation.y -= 9. - u_cardsEffect;
    vertexRotation.x += sin(2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1.) * 3.1415 * 1.5;
    vertexRotation.z -= cos(2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1.) * 3.1415 * 1.5;
    vertexRotation.y -= vertexRotation.z / 8.;

    vertexRotation.z -= circle(textureCoord, textureCoord + vertexPosition.xy, 3.) * -1.;
    vertexRotation.z -= u_cardsEffect * 0.9;

        // vertexPosition.x = vertexPosition.x + (sin(textureCoord.y * 3.1415)) * sin(u_time * 0.01) ;
        // vertexPosition.y = vertexPosition.y + (sin(textureCoord.x * 3.1415)) * sin(u_time * 0.01) ;
    // vertexRotation.z -= distance(textureCoord,textureCoord + vertexPosition.xy)* 0.4;
    // vertexRotation.z -= length(textureCoord.xy);
        // vertexRotation.xy -= distance(textureCoord / 2., textureCoord) /* * sin(u_time * 0.01) */;
        // vertexRotation.xy -= distance(textureCoord / 2., textureCoord) /* * sin(u_time * 0.01) */;

        // vertexPosition.y = vertexPosition.y + (sin(textureCoord.x * 3.1415)) * sin(u_time * 0.01) ;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexRotation.xyz, 1.0);

        // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
}