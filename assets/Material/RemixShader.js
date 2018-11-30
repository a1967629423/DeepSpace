let shader = {
    name: 'RemixShader',

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
    uniform sampler2D rt1;
    uniform float cv;
    uniform float cout;
    uniform vec2 control_point;
    uniform vec4 color;
    varying vec2 uv0;
    void main () {
        vec2 a_uv0 = uv0;
        a_uv0.y = remain(a_uv0.y*cout,1.);
        float ccv = 0.;
        vec4 c =  texture2D(texture, a_uv0);
        vec4 c1 =  texture2D(rt1, a_uv0);
        float down = control_point.x;//0.4;//下锚点的位置
        float up = control_point.y; //0.4; //上锚点的位置
        float d_1 = 1.-down;
        float u_1 = 1.+up;
        ccv = max(min((d_1-uv0.y)*(u_1/d_1),1.),0.);
        c=color*(c*(1.-ccv)+c1*ccv); //加法模式
        gl_FragColor = c;
    }
`,

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;