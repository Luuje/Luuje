// Simple noise shader

precision highp float;

uniform vec2 uResolution;
uniform float uTime;

// Simple hash function
float hash(float n) { return fract(sin(n) * 1e4); }

// Simple noise function
float noise(vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0;
    return mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
               mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
}

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    // Time varying parameter
    float time = uTime * 0.5;

    // Create a gradient background
    vec3 bg = mix(vec3(0.1, 0.0, 0.5), vec3(0.5, 0.0, 0.1), uv.y + 0.5 * sin(time));

    // Overlay noise on the gradient
    float n = noise(uv * 10.0 + time);

    // Mix the gradient with the noise based on the noise value
    vec3 color = mix(bg, vec3(n), 0.5);

    // Output to screen
    gl_FragColor = vec4(color, 1.0);
}
