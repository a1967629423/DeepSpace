let shader = {
    name: 'OtherShader',

    defines: [
    ],
    vert:
        `
uniform mat4 viewProj;
uniform float uvoffset_y;
uniform float n;
attribute vec3 a_position;
attribute vec2 a_uv0;
varying vec2 uv0;
varying vec2 uv1;
varying float nv;
float remain(float a,float b)
{
    return a-floor(a/b);
}
void main () {
    vec4 pos = viewProj * vec4(a_position, 1);
    gl_Position = pos;
    vec2 a_uv1 = a_uv0;
    vec2 a_uv2 = a_uv0;
    a_uv1.y = a_uv1.y+abs(remain(uvoffset_y,1.0))*n;
    a_uv2.y = a_uv2.y-abs(1.0-remain(uvoffset_y,1.0))*n;
    uv0 = a_uv1;
    uv1 = a_uv2;
    nv = n;
}`,
    frag:
        `
        uniform sampler2D texture;
        uniform vec4 color;
        varying vec2 uv0;
        varying vec2 uv1;
        varying float nv;
        void main () {
            vec2 a_uv0 = uv0;
            vec2 a_uv1 = uv1;
            a_uv0.y/=nv;
            a_uv1.y/=nv;
            vec4 c = color * texture2D(texture, a_uv0);
            vec4 c1 = color * texture2D(texture, a_uv1);
            if(a_uv0.y>1.0)
            {
                c=c1;
            }
            
            //float gray = (c.r + c.g + c.b) * (1. / 3.);
            //float rgb = gray * 0.8;
            gl_FragColor = c; //vec4(rgb, rgb, rgb, c.a * (gray + 0.1));
        }
    `,

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;