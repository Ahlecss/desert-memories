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
uniform float u_initialPositionY;

uniform float u_unwrap;
uniform float u_cardsEffect;
uniform float u_isMobile;

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

    // Rotate each plane on itself while moving
    vertexRotation = vertexRotation * rotationX(0.) * rotationY(2. * 3.1415 * -u_unwrap * u_index / u_totalIndex - u_scroll * 1. - u_time * 0.001);

    // Start animation
    vertexRotation.y -= u_initialPositionY - u_cardsEffect + u_isMobile * 1.;

    // Positions of each plane on X and Z while moving
    vertexRotation.x += sin(+2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1. + u_time * 0.001) * 3.1415 * 1.5;
    vertexRotation.z -= cos(+2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1. + u_time * 0.001) * 3.1415 * 1.5;

    // Try but not that cool
    // vertexRotation.y += mod(u_index / u_totalIndex + u_scroll, u_totalIndex);

    // Animation also
    vertexRotation.y -= vertexRotation.z / 8.;

    // Center wrap effect
    vertexRotation.z -= circle(textureCoord, textureCoord + vertexPosition.xy, 3. + u_isMobile) * -1.;
    // vertexRotation.z += u_scrollSpeed;

    // Animation
    vertexRotation.z -= u_cardsEffect * 0.9 - u_isMobile * 3.;


    
    vec2 st = vertexRotation.xy / u_res.xy - vec2(0.5);
    // tip: use the following formula to keep the good ratio of your coordinates
    st.y *= u_res.y / u_res.x;

    // We readjust the mouse coordinates
    vec2 mouse = u_mouse * -0.5;
    // tip2: do the same for your mouse
    // mouse.y += 0.5;
    mouse.y *= u_res.y / u_res.x;
    mouse *= -1.;

    vec2 circlePos = st + mouse * 10.;
    // vertexRotation.z += circle(vertexRotation.xy, circlePos, 0.5);

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexRotation.xyz, 1.0);

        // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
}