precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_index;
uniform float u_totalIndex;
uniform float u_scroll;
uniform float u_scrollSpeed;
uniform float u_scrollTarget;
uniform float u_initialPositionX;
uniform float u_initialPositionY;
uniform float u_initialPositionZ;
uniform float u_noisyEffect;
uniform float u_startAnim;
uniform float u_startControl;
uniform float u_startAnimRemoveRotation;

uniform float u_unwrap;
uniform float u_cardsEffect;
uniform float u_isMobile;

uniform mat4 uTextureMatrix0;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
varying float vWave;

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

float dissipatingWave(float dist, float time, float speed) {
    float frequency = 0.31415;
    float attenuation = 0.3;
    float amplitude = 0.1; // Amplifier l'amplitude selon la vitesse

    // Onde avec dissipation
    float wave = cos(dist * (speed * (0.2 + 15. * u_isMobile) )) + 0.5;
    // float wave = sin(dist * (speed * 0.2)) * 0.5;
    return wave;
}

void main() {
    vec3 vertexPosition = aVertexPosition;
    vec2 textureCoord = aTextureCoord;

    vec4 vertexRotation = vec4(vertexPosition, 1.0);

    // Rotate each plane on itself while moving
    // vertexRotation = vertexRotation * rotationX(-0.2 * 3.1415) * rotationZ(0.);
    // vertexRotation = vertexRotation * rotationX(0.) * rotationZ(2. * 3.1415 * 0.3 * -u_unwrap * u_index / u_totalIndex - u_scroll * 1. - u_time * 0.001);
    vertexRotation = vertexRotation * rotationX((-0.2 + (0.1 * u_isMobile)) * 3.1415 * u_startControl) * rotationZ((2. * 3.1415 * 0.4 * -1. * u_index / u_totalIndex - u_time * 0.02 ) * u_startAnimRemoveRotation);

    // Start animation
    // vertexRotation.y -= u_initialPositionY + u_isMobile * 1.;
    // vertexRotation.x -= u_initialPositionX + u_isMobile * 1.;
    vertexRotation.z -= u_initialPositionZ + u_isMobile * 1.;
    // Positions of each plane on X and Z while moving
    // vertexRotation.x += sin(+2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1. + u_time * 0.001) * 3.1415 * 1.5;
    // vertexRotation.z -= cos(+2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1. + u_time * 0.001) * 3.1415 * 1.5;

    // vertexRotation.y -= u_scroll + 10. * (u_index / u_totalIndex);
    // vertexRotation.z -= u_scroll + 10. * (u_index / u_totalIndex) ;
    // Try but not that cool
    // vertexRotation.y += mod(u_index / u_totalIndex + u_scroll, u_totalIndex);

    // Infinite carousel left to right
    // vertexRotation.x += mod(u_scroll + (3. * u_totalIndex) * (u_index / u_totalIndex),  (3. * u_totalIndex)) -  (1.5 * u_totalIndex);
    vertexRotation.x -= ( u_initialPositionX + u_isMobile * 1.) * u_startAnim + u_startControl * (mod(u_scroll / 2. + (2. * u_totalIndex) * (u_index / u_totalIndex),  (2. * u_totalIndex)) -  (1. * u_totalIndex));
    vertexRotation.y -= ( u_initialPositionY + u_isMobile * 1.) * u_startAnim + u_startControl * (mod(u_scroll / 2. + (2. * u_totalIndex) * (u_index / u_totalIndex),  (2. * u_totalIndex)) -  (1. * u_totalIndex));

    // Animation also
    vertexRotation.y -= vertexRotation.z / 10.;


    // Center wrap effect
    // vertexRotation.z -= circle(textureCoord, textureCoord + vertexPosition.xy, + 3. + u_isMobile) * -1.;

    float distanceToCenter = length(vertexPosition.xy - vertexPosition.xy / 2.);
    float wave = dissipatingWave(distanceToCenter, u_time * 0.5, u_scrollTarget);
    vertexRotation.z += wave;
    // vertexRotation.z += u_scrollSpeed;

    // Animation
    vertexRotation.z -= u_cardsEffect * 0.6 - u_isMobile * 3.;

    // vWave = vertexRotation.z;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexRotation.xyz, 1.0);

        // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
}