function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        // HURUF "A"
        // Kaki kiri
        -0.500, 0.600, 0.0,  -0.850,-0.600, 0.0,
        -0.524, 0.607, 0.0,  -0.874,-0.593, 0.0,
        -0.476, 0.593, 0.0,  -0.826,-0.607, 0.0,

        // Kaki kanan
        -0.500, 0.600, 0.0,  -0.150,-0.600, 0.0,
        -0.524, 0.593, 0.0,  -0.174,-0.607, 0.0,
        -0.476, 0.607, 0.0,  -0.126,-0.593, 0.0,

        // Garis tengah A
        -0.690,-0.050, 0.0,  -0.310,-0.050, 0.0,
        -0.655,-0.025, 0.0,  -0.345,-0.025, 0.0,
        -0.725,-0.075, 0.0,  -0.275,-0.075, 0.0,

        // Aksen runcing di puncak A
        -0.500, 0.600, 0.0,  -0.560, 0.750, 0.0,
        -0.500, 0.600, 0.0,  -0.440, 0.750, 0.0,

        // HURUF "R"
         0.150,-0.600, 0.0,   0.150, 0.600, 0.0,
         0.175,-0.600, 0.0,   0.175, 0.550, 0.0,
         0.125,-0.600, 0.0,   0.125, 0.650, 0.0,

        // Bendera atas dari puncak turun ke tengah
         0.150, 0.600, 0.0,   0.609, 0.317, 0.0,
         0.177, 0.547, 0.0,   0.554, 0.318, 0.0,
         0.124, 0.655, 0.0,   0.669, 0.315, 0.0,

        // Bendera bawah turun sampai TEPAT di tengah
         0.609, 0.313, 0.0,   0.150,-0.016, 0.0,
         0.669, 0.311, 0.0,   0.176,-0.039, 0.0,
         0.554, 0.319, 0.0,   0.126, 0.009, 0.0,

        // Kaki diagonal mulai dari tengah turun ke bawah
         0.150, -0.055, 0.0,   0.525,-0.585, 0.0,
         0.176, -0.040, 0.0,   0.545,-0.555, 0.0,
         0.124, -0.073, 0.0,   0.499,-0.605, 0.0
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderCode = `
        attribute vec3 aPosition;
        void main(){
            gl_Position = vec4(aPosition, 1.0);
        }`;

    var fragmentShaderCode = `
        precision mediump float;
        uniform vec4 uColor;
        void main(){
            gl_FragColor = uColor;
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

    var uColor = gl.getUniformLocation(program, "uColor");

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.lineWidth(3.0);

    // Huruf A -> merah muda, 22 vertex pertama
    gl.uniform4fv(uColor, [0.90, 0.15, 0.35, 1.0]);
    gl.drawArrays(gl.LINES, 0, 22);

    // Huruf R -> hijau tosca, 24 vertex berikutnya
    gl.uniform4fv(uColor, [0.10, 0.75, 0.55, 1.0]);
    gl.drawArrays(gl.LINES, 22, 24);
}