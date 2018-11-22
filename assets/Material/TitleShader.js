let shader = {
    name: 'TitleShader',

    defines: [
    ],
    vert:
    `
uniform mat4 viewProj;
attribute vec3 a_position;
attribute vec2 a_uv0;
varying vec2 uv0;
float remain(float a,float b)
{
return a-floor(a/b);
}
void main () {
vec4 pos = viewProj * vec4(a_position, 1);
gl_Position = pos;
uv0 = a_uv0;
}`,
frag:
    `
    float remain(float a,float b)
    {
    return a-floor(a/b);
    }
    uniform sampler2D texture;
    uniform vec4 color;
    uniform float cout;
    varying vec2 uv0;
    void main () {
        vec2 a_uv0 = uv0;
        a_uv0.y = remain(a_uv0.y*cout,1.);
        //vec4 c = vec4(0.,0.,0.,1.);
        vec4 c = color * texture2D(texture, a_uv0);
        
        
        gl_FragColor = c; 
    }
`,

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;