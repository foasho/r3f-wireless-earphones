varying vec2 vUv;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uDataLength;
uniform float uDataArray[32];
uniform float uAvg;
uniform float uAmbientSound;
uniform sampler2D uTex;

vec3 rgb2hsl(vec3 c){
  float h = 0.0;
	float s = 0.0;
	float l = 0.0;
	float r = c.r;
	float g = c.g;
	float b = c.b;
	float cMin = min( r, min( g, b ) );
	float cMax = max( r, max( g, b ) );

	l = ( cMax + cMin ) / 2.0;
	if ( cMax > cMin ) {
		float cDelta = cMax - cMin;
        
        //s = l < .05 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) ); Original
		s = l < .0 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) );
        
		if ( r == cMax ) {
			h = ( g - b ) / cDelta;
		} else if ( g == cMax ) {
			h = 2.0 + ( b - r ) / cDelta;
		} else {
			h = 4.0 + ( r - g ) / cDelta;
		}

		if ( h < 0.0) {
			h += 6.0;
		}
		h = h / 6.0;
	}
	return vec3( h, s, l );
}

vec3 hsl2rgb(vec3 c){
  vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
  return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}

vec3 rgb2hsv(vec3 c){
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 shiftHue (vec3 color, float shift){
  vec3 P = vec3(0.55735)*dot(vec3(0.55735), color);
  vec3 U = color - P;
  
  vec3 V = cross(vec3(0.55735), U);    

  color = U*cos(shift*6.2832) + V*sin(shift*6.2832) + P;
  
  return vec3(color);
}

/**
* 色相を変更
*/
vec3 getChangeHueColor(vec3 color, float v, float maxHueShift) {
  vec3 hsl = rgb2hsl(color);
  // float hueShiftVal = v * maxHueShift;
  float hueShiftVal = mix(0.0, maxHueShift, v);
  // vec3 shiftColor = shiftHue(hsl, hueShiftVal);
  // return hsl2rgb(shiftColor);
  hsl.x += hueShiftVal; // 色相を変化させます。
  hsl.x = mod(hsl.x, 1.0); // 色相が[0, 1]の範囲に収まるように調整します。
  return hsl2rgb(hsl);
}

/**
* 彩度を変更
*/
vec3 getChangeSatColor(vec3 color, float v, float maxSatShift) {
  vec3 hsl = rgb2hsl(color);
  // saturationShiftが0.0からmaxSaturationShiftの範囲になるように調整します。
  float saturationShift = mix(0.0, maxSatShift, v);

  hsl.y += saturationShift; // 彩度を変化させます。
  hsl.y = clamp(hsl.y, 0.0, 1.0); // 彩度が[0, 1]の範囲に収まるように調整します。
  return hsl2rgb(hsl);
}

/**
* 明度を変更
*/
vec3 getChangeLumColor(vec3 color, float v, float maxLumShift) {
  vec3 hsl = rgb2hsl(color);
  // luminanceShiftが0.0からmaxLuminanceShiftの範囲になるように調整します。
  float luminanceShift = mix(0.0, maxLumShift, v);

  hsl.z -= luminanceShift; // 明度を変化させます。
  hsl.z = clamp(hsl.z, 0.0, 1.0); // 明度が[0, 1]の範囲に収まるように調整します。
  return hsl2rgb(hsl);
}

vec3 getMergeColor(vec3 color1, vec3 color2, float v) {
  return color2 * v + color1 * (1.0 - v);
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
  // この値を大きくすると、色の違いがより顕著になります。
  float power = 2.0; // あるいは必要に応じてさらに高い値

  vec3 color1 = uColor1;
  vec3 color2 = uColor2;
  if (uAmbientSound == 1.0) {
    vec4 tex = texture2D(uTex, uv);
    color2 = tex.rgb;
  }

  // uDataLength分だけStep関数で色を変える
  float n = uDataLength;
  uv *= n;

  // SmoothStep関数で段階化
  uv = floor(uv) + step(0.5, fract(uv));
  uv /= n;

  vec3 col = color1;
  // n分だけForeachさせてY範囲内のものはgetMergeColorで色を決定、それ以外はcolor1にする
  for (float i = 0.; i < n; i++) {
    int index = int(i);
    float v = uDataArray[index];

    // 新しい'power'値を使用して色の混合
    float mergedVal = 0.35;
    vec3 mergedColor = vec3(1.0);
    if (uAmbientSound == 0.5) {
      mergedColor = getChangeHueColor(color2, pow(v, power), mergedVal);
    }
    else if (uAmbientSound == 1.0){
      mergedColor = getMergeColor(color1, color2, pow(v, mergedVal));
    }
    else {
      // 見た目よくするために、固定でmergedValを指定
      mergedColor = getChangeLumColor(color2, pow(v, power), 1.0);
    }

    col = mix(
      col,
      mergedColor,
      smoothstep(i/n, (i+1.)/n, uv.y)
    );
    // col = mergedColor;
    // col = color2;
  }
  gl_FragColor = vec4(col, 1.0);
}