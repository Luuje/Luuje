// Fork from http://glslsandbox.com/e#8143.0
#define PI 3.14159
#define color_filter mat3(0.5, 0.2, 0.2, 0.0, 0.0, 0.2, 0.8, 0.2, 0.6)

precision mediump float;

uniform float uRandomSeed;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMorph;
uniform vec2 uGrid;

const int complexity = 6;   // complexity of curls/computation
const float mouseSpeed = 0.3;  // control the color changing
const float fixedOffset = 2.9;  // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.
const float fluidSpeed = 0.01; // Drives speed, smaller number will make it slower.
const float baseColor = 0.2;
const float BLUR = 0.97;
const float brightness = 0.7;

// more about noise: 
// http://thebookofshaders.com/11/
float random(float x) {
    return fract(sin(x) * uRandomSeed);
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(0.48764, 0.68567))) * uRandomSeed);
}

float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    return mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));
}

float noiseS(float x) {
    return noise(x) * 2.0 - 1.0;
}

float grain(in vec2 st, float noiseTime) {
    vec2 i = floor(st);
    vec2 f = fract(st);

      // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

      // Smooth Interpolation

      // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0 * f);
      // u = smoothstep(0.,1.,f);

      // Mix 4 coorners percentages
    //return 0.0 + ((mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y) / 10.0) * 10.0;
    return pow(random(st) + mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y, 0.5); //pow 0.5 to make grain more gray
}

vec3 blend(vec3 base, vec3 blend, float blendFactor) {
    vec3 blendedColor;
    if(base[0] + base[1] + base[2] < 1.5) { //1.5?
        blendedColor = (2.0 * base * blend + base * base * (1.0 - 2.0 * blend));
    } else {
        blendedColor = (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
    }

    blendedColor += 0.1 * blend;

    return mix(base, blendedColor, blendFactor);
}

void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
    float t = uTime * fluidSpeed + uMorph;
    float noiseTime = noise(t);
    float noiseSTime = noiseS(t);
    float noiseSTime1 = noiseS(t + 1.0);

    float blur = (BLUR + 0.14 * noiseSTime);
    for(int i = 1; i <= complexity; i++) {
        p += blur / float(i) * sin(float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1)) + fixedOffset;
    }
    for(int i = 1; i <= complexity; i++) {
        p += blur / float(i) * cos(float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1)) + fixedOffset;
    }
    p += uMouse * mouseSpeed;

    vec2 grid = uGrid * 2.0; // set complexity to 0 to debug the grid

    // Modified color computation
    float r = pow(0.5 * (1.0 + baseColor + sin(grid.x * p.x + 2.0 * noiseSTime)), 1.5) * brightness;
    float g = pow(0.5 * (1.0 + baseColor + sin(grid.y * p.y + 3.0 * noiseSTime1)), 1.5) * brightness;
    float b = pow(0.5 * (1.0 + baseColor + sin(p.x + p.y + noiseSTime)), 1.5) * brightness;

    // Color filter
    // Product between matrix filter and pixel color to get new color
    vec3 color = vec3(r, g, b) * color_filter;

    // Grain filter
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    //vec2 pos = vec2(st * uResolution.xy);

    //blend the noise over the background
    vec3 blendColor = blend(color, vec3(grain(gl_FragCoord.xy, noiseSTime)), 0.4);

    //get the luminance of the background
    //float luminance = (color[0] + color[1] + color[2])/3.0;

    //reduce the noise based on some 
    //threshold of the background luminance
    //float response = smoothstep(0.05, 0.4, luminance);
    //blendColor = mix(blendColor, color, pow(response, 0.5));

    // Output to screen
    gl_FragColor = vec4(blendColor, 1.0);
    //gl_FragColor = vec4(vec3(grain(st.xy, noiseSTime)), 1.0);

}