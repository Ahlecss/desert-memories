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
uniform float u_initialPositionX;
uniform float u_initialPositionY;
uniform float u_noisyEffect;

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

//	Simplex 3D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

// Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

  //  x0 = x0 - 0. + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0 / 7.0; // N=7
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);    // mod(j,N)

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

//Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

// Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
    vec3 vertexPosition = aVertexPosition;
    vec2 textureCoord = aTextureCoord;

    vec4 vertexRotation = vec4(vertexPosition, 1.0);

    // Rotate each plane on itself while moving
    vertexRotation = vertexRotation * rotationX(0.) * rotationY(2. * 3.1415 * -u_unwrap * u_index / u_totalIndex - u_scroll * 1. - u_time * 0.001);

    // Start animation
    vertexRotation.y -= u_initialPositionY - u_cardsEffect + u_isMobile * 1. - (u_mouse.y * u_noisyEffect);

    vertexRotation.x += u_initialPositionX;
    // Positions of each plane on X and Z while moving
    vertexRotation.x += sin(+2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1. + u_time * 0.001) * 3.1415 * 1.5;
    vertexRotation.z -= cos(+2. * 3.1415 * (u_unwrap * u_index / u_totalIndex) + u_scroll * 1. + u_time * 0.001) * 3.1415 * 1.5;

    // Try but not that cool
    // vertexRotation.y += mod(u_index / u_totalIndex + u_scroll, u_totalIndex);

    // Animation also
    vertexRotation.y -= vertexRotation.z / 10.;

    // Center wrap effect
    vertexRotation.z -= circle(textureCoord, textureCoord + vertexPosition.xy, 3. + u_isMobile) * -1.;
    // vertexRotation.z += u_scrollSpeed;

    // Animation
    vertexRotation.z -= u_cardsEffect * 0.9 - u_isMobile * 3.;

    float noiseFreq = 2.5;
    float noiseAmp = 0.35;
    vec3 noisePos = vec3(vertexRotation.x, vertexRotation.y, vertexRotation.z * noiseFreq - u_time * 0.01);
    vertexRotation.z -= snoise(noisePos) * noiseAmp * u_noisyEffect;
    vWave = vertexRotation.z;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexRotation.xyz, 1.0);

        // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
}