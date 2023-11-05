// Wave pattern shader

precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    // Time varying parameter
    float time = uTime * 0.5;

    // Create a wave pattern using sin function
    float wave = sin(uv.x * 10.0 + time) * 0.5 + 0.5;

    // Apply the wave pattern to the gradient
    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), wave);

    // Output to screen
    gl_FragColor = vec4(color, 1.0);
}
