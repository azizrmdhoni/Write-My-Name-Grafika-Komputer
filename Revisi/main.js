function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        // ================= HURUF A =================
        // Kaki Kiri A
        -0.85, -0.60, 0.0,  -0.65, -0.60, 0.0,  -0.55,  0.55, 0.0,
        -0.85, -0.60, 0.0,  -0.55,  0.55, 0.0,  -0.75,  0.55, 0.0,

        // Kaki Kanan A
        -0.45,  0.55, 0.0,  -0.25,  0.55, 0.0,  -0.15, -0.60, 0.0,
        -0.45,  0.55, 0.0,  -0.15, -0.60, 0.0,  -0.35, -0.60, 0.0,

        // Atas / Sambungan A
        -0.75,  0.55, 0.0,  -0.25,  0.55, 0.0,  -0.50,  0.75, 0.0,

        // Palang Tengah A
        -0.70, -0.05, 0.0,  -0.30, -0.05, 0.0,  -0.30, -0.20, 0.0,
        -0.70, -0.05, 0.0,  -0.30, -0.20, 0.0,  -0.70, -0.20, 0.0,

        // ================= HURUF R =================
        // Batang Tegak R
        0.05, -0.60, 0.0,   0.25, -0.60, 0.0,   0.25,  0.65, 0.0,
        0.05, -0.60, 0.0,   0.25,  0.65, 0.0,   0.05,  0.65, 0.0,

        // Head Atas R (Balok Atas)
        0.25,  0.65, 0.0,   0.75,  0.65, 0.0,   0.75,  0.48, 0.0,
        0.25,  0.65, 0.0,   0.75,  0.48, 0.0,   0.25,  0.48, 0.0,

        // Lengkung Samping R (Sisi Kanan)
        0.58,  0.48, 0.0,   0.75,  0.48, 0.0,   0.75,  0.08, 0.0,
        0.58,  0.48, 0.0,   0.75,  0.08, 0.0,   0.58,  0.08, 0.0,

        // Head Bawah R (Balok Tengah)
        0.25,  0.23, 0.0,   0.75,  0.23, 0.0,   0.75,  0.08, 0.0,
        0.25,  0.23, 0.0,   0.75,  0.08, 0.0,   0.25,  0.08, 0.0,

        // Kaki Diagonal R
        0.30,  0.08, 0.0,   0.50,  0.08, 0.0,   0.80, -0.60, 0.0,
        0.30,  0.08, 0.0,   0.80, -0.60, 0.0,   0.60, -0.60, 0.0,

        // Dynamic Sharp Tail R (Ujung Kanan Bawah)
        0.80, -0.60, 0.0,   0.90, -0.45, 0.0,   0.60, -0.60, 0.0
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderCode = `
        attribute vec3 aPosition;
        varying vec2 vPosition;
        void main(){
            vPosition = aPosition.xy;
            gl_Position = vec4(aPosition, 1.0);
        }`;

    var fragmentShaderCode = `
        precision mediump float;
        varying vec2 vPosition;
        void main(){
            float tY = clamp((vPosition.y + 0.6) / 1.35, 0.0, 1.0);
            float tX = clamp((vPosition.x + 0.85) / 1.75, 0.0, 1.0);

            vec3 colorBottom = vec3(1.00, 0.08, 0.58); // Neon Pink
            vec3 colorMiddle = vec3(0.45, 0.10, 0.85); // Deep Violet
            vec3 colorTop    = vec3(0.00, 0.82, 1.00); // Electric Cyan

            vec3 verticalGrad = mix(colorBottom, colorMiddle, smoothstep(0.0, 0.5, tY));
            verticalGrad = mix(verticalGrad, colorTop, smoothstep(0.5, 1.0, tY));

            vec3 finalColor = mix(verticalGrad, vec3(1.0, 0.4, 0.1), tX * 0.25);

            gl_FragColor = vec4(finalColor, 1.0);
        }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
}
