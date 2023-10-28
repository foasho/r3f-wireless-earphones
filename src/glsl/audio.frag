varying vec2 vUv;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uDataLength;
uniform float uAvg;
uniform float uAmbientSound;
uniform sampler2D uTex;

vec3 getMergeColor(vec3 color1, vec3 color2, float avg) {
  return color2 * avg + color1 * (1.0 - avg);
}

// 2値化処理
vec3 convBinary(vec3 color, float threshold) {
  return vec3(
    step(threshold, color.r),
    step(threshold, color.g),
    step(threshold, color.b)
  );
}

void main() {
  vec2 uv = vUv;

  vec3 color2 = uColor2;
  if (uAmbientSound > 0.0) {
    vec4 tex = texture2D(uTex, uv);
    color2 = tex.rgb;
  }

  // uDataLength分だけStep関数で色を変える
  float n = uDataLength;
  uv *= n;
  float thr = 0.;
  uv = floor(uv) + smoothstep(thr, 2.0 - thr, fract(uv));
  uv /= n;
  // avgとcolor1とcolor2の間を取得する
  vec3 col = getMergeColor(uColor1, color2, uAvg);
  // // Step関数でuAvgより大きいyはcolor1にする
  uv.x *= 2.0;
  int index = int(uv.x);
  vec3[3] xcol3 = vec3[](
    uColor1,
    col * col,
    uColor1
  );
  col = mix(
    mix(
      xcol3[index],
      xcol3[index+1],
      fract(uv.x)
    ),
    uColor1,
    smoothstep(0.0, uAvg, uv.y)
  );
  
  gl_FragColor = vec4(col, 1.0);
}