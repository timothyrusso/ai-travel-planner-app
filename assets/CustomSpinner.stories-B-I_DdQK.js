import{w as W}from"./welcome_1-Cz4HSmHo.js";import{j as e,V as n,r as K,s as Y,a}from"./iframe-CflvazV5.js";import{C as q}from"./Custom3DButtonLarge-CoCgw92u.js";import{C as J}from"./CustomBlurButtonLarge-DtTbjRnZ.js";import{C as Q}from"./CustomBlurIconButtonLarge-B6TSlBFx.js";import{C as X}from"./CustomButtonLarge-Ds35MooC.js";import{C as Z}from"./CustomIconButtonLarge-bfCXYjal.js";import{C as $}from"./CustomImage-BARgLTxw.js";import{S as t,C as o,s as ee}from"./CustomSpinner-HSTcYIzD.js";import{c as re}from"./colors-CDYZCRj7.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CBBqHCRT.js";import"./index-uPMBYBFQ.js";import"./CustomIcon-CbJ7sbFx.js";import"./index-kQIztB-E.js";import"./opacity-CK-XTKIa.js";import"./useTranslation-ZGwAgKme.js";import"./index-nxHO0xSK.js";import"./CustomText--z0mhzFv.js";import"./fontSize-CD1IvvMd.js";import"./components-C4s2WB79.js";import"./CustomBlurButton.logic-CbzfQvVK.js";import"./blur-C2gU1TXm.js";import"./CustomPressable-BDBwp9bY.js";import"./index-BlAKOzDr.js";import"./xml-DapCWbHp.js";const{fn:c}=__STORYBOOK_MODULE_TEST__,se=W,oe=[t.purple500,t.lime500,t.red500,t.cyan500,t.primaryBlack],te=[0,.25,.5,.75,1],Ie={title:"Design System/CustomSpinner",component:o,tags:["autodocs"],args:{size:"medium",color:t.purple500},argTypes:{size:{control:"select",options:Object.keys(ee)},color:{control:"select",options:Object.values(t)},progress:{control:{type:"number",min:0,max:1,step:.05}}}},p={},l={render:r=>e.jsxs(n,{style:s.row,children:[e.jsx(o,{...r,size:"small"}),e.jsx(o,{...r,size:"medium"}),e.jsx(o,{...r,size:"large"})]})},m={render:r=>e.jsxs(n,{style:s.row,children:[oe.map(i=>K.createElement(o,{...r,key:i,color:i})),e.jsx(n,{style:s.darkTile,children:e.jsx(o,{...r,color:t.primaryWhite})})]})},d={render:r=>e.jsx(n,{style:s.row,children:te.map(i=>K.createElement(o,{...r,key:i,progress:i}))})},u={render:r=>e.jsxs(n,{style:s.row,children:[e.jsx(o,{...r,progress:-.5}),e.jsx(o,{...r,progress:2})]})},g={render:()=>e.jsxs(n,{style:s.stack,children:[e.jsx(X,{title:"GLOBAL.BUTTON.CONFIRM",onPress:c(),isLoading:!0}),e.jsx(Z,{iconName:"airplane-outline",onPress:c(),isLoading:!0}),e.jsx(q,{title:"GLOBAL.BUTTON.CONFIRM",onPress:c(),isLoading:!0}),e.jsxs(n,{style:s.backdrop,children:[e.jsx($,{source:se,style:s.photo,useBlur:!1,contentFit:"cover"}),e.jsxs(n,{style:s.stack,children:[e.jsx(J,{title:"GLOBAL.BUTTON.CONFIRM",onPress:c(),isLoading:!0}),e.jsx(Q,{iconName:"airplane-outline",onPress:c(),isLoading:!0})]})]})]})},s=Y.create({row:{flexDirection:"row",alignItems:"center",gap:a.Triple},stack:{gap:a.Double},darkTile:{padding:a.Double,borderRadius:a.SingleAndHalf,backgroundColor:re.primaryBlack},backdrop:{padding:a.Triple,borderRadius:a.SingleAndHalf,overflow:"hidden"},photo:{position:"absolute",top:0,left:0,right:0,bottom:0}});var y,C,h,L,w;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:"{}",...(h=(C=p.parameters)==null?void 0:C.docs)==null?void 0:h.source},description:{story:"Leave `progress` empty for the spinning 270° arc; set it to switch to a static ring.",...(w=(L=p.parameters)==null?void 0:L.docs)==null?void 0:w.description}}};var B,S,O,f,x;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <View style={styles.row}>
      <CustomSpinner {...args} size="small" />
      <CustomSpinner {...args} size="medium" />
      <CustomSpinner {...args} size="large" />
    </View>
}`,...(O=(S=l.parameters)==null?void 0:S.docs)==null?void 0:O.source},description:{story:"20 / 36 / 48 px boxes, each with its own stroke width — the stroke never leaves the box.",...(x=(f=l.parameters)==null?void 0:f.docs)==null?void 0:x.description}}};var T,k,j,N,b;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <View style={styles.row}>
      {LIGHT_BACKGROUND_COLORS.map(color => <CustomSpinner {...args} key={color} color={color} />)}
      <View style={styles.darkTile}>
        <CustomSpinner {...args} color={SpinnerColor.primaryWhite} />
      </View>
    </View>
}`,...(j=(k=m.parameters)==null?void 0:k.docs)==null?void 0:j.source},description:{story:"The five arcs that pair with a grey track, then `primaryWhite` over the dark tile it is for.",...(b=(N=m.parameters)==null?void 0:N.docs)==null?void 0:b.description}}};var V,I,A,E,P;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <View style={styles.row}>
      {DETERMINATE_STEPS.map(progress => <CustomSpinner {...args} key={progress} progress={progress} />)}
    </View>
}`,...(A=(I=d.parameters)==null?void 0:I.docs)==null?void 0:A.source},description:{story:"Static, anchored at 12 o'clock: `0` is the bare track and `1` closes the ring.",...(P=(E=d.parameters)==null?void 0:E.docs)==null?void 0:P.description}}};var R,_,v,D,z;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <View style={styles.row}>
      <CustomSpinner {...args} progress={-0.5} />
      <CustomSpinner {...args} progress={2} />
    </View>
}`,...(v=(_=u.parameters)==null?void 0:_.docs)==null?void 0:v.source},description:{story:"Out-of-range values clamp instead of inverting the arc: these render as `0` and `1`.",...(z=(D=u.parameters)==null?void 0:D.docs)==null?void 0:z.description}}};var F,G,M,U,H;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <View style={styles.stack}>
      <CustomButtonLarge title="GLOBAL.BUTTON.CONFIRM" onPress={fn()} isLoading />
      <CustomIconButtonLarge iconName="airplane-outline" onPress={fn()} isLoading />
      <Custom3DButtonLarge title="GLOBAL.BUTTON.CONFIRM" onPress={fn()} isLoading />
      <View style={styles.backdrop}>
        <CustomImage source={photo} style={styles.photo} useBlur={false} contentFit="cover" />
        <View style={styles.stack}>
          <CustomBlurButtonLarge title="GLOBAL.BUTTON.CONFIRM" onPress={fn()} isLoading />
          <CustomBlurIconButtonLarge iconName="airplane-outline" onPress={fn()} isLoading />
        </View>
      </View>
    </View>
}`,...(M=(G=g.parameters)==null?void 0:G.docs)==null?void 0:M.source},description:{story:`Every button family in its loading state: the spinner colour resolves against the active button,
so a loading button keeps the contrast it has when idle, and now carries a track ring.`,...(H=(U=g.parameters)==null?void 0:U.docs)==null?void 0:H.description}}};const Ae=["Playground","AllSizes","AllColors","Determinate","ClampedProgress","ButtonFamilies"];export{m as AllColors,l as AllSizes,g as ButtonFamilies,u as ClampedProgress,d as Determinate,p as Playground,Ae as __namedExportsOrder,Ie as default};
