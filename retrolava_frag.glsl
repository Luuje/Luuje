// Simple gradient shader

precision mediump float;

uniform vec2 uResolution;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    // Simple gradient - mix between two colors based on the x coordinate
    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), uv.x);

    // Output to screen
    gl_FragColor = vec4(color, 1.0);
}
