let shader = {
    name: 'ChangeShader',

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
    uniform sampler2D texture;
    uniform sampler2D texture_change;
    uniform vec4 color;
    uniform float cv;
    varying vec2 uv0;
    void main () {

        vec4 c = texture2D(texture, uv0);
        vec4 c1 =  texture2D(texture_change,uv0);
        c=color*(c*(1.-cv)+c1*cv);
        // if(cv<0.4)
        // {
        //     c*=min(1.-(cv*2.5),1.);
        // }
        // else if(cv>0.6)
        // {
        //     c=c1*min((cv-0.6)*2.5,1.);
        // }
        // else
        // {
        //     c*=0.;
        // }
        
        gl_FragColor = c; 
    }
`,

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;