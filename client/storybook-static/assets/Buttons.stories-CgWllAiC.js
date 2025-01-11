import{j as i}from"./jsx-runtime-BjgbQsUx.js";import{c}from"./index-B0pXE9zJ.js";import"./index-D2MAbzvX.js";import"./_commonjsHelpers-CqkleIqs.js";const S="_Button_1g9df_1",C="_Primary_1g9df_16",P="_Secondary_1g9df_25",e={Button:S,Primary:C,Secondary:P},f=({onClick:B,children:a="button",variant:g="primary",href:n,target:v,type:_,className:o})=>{const s=g==="primary"?e.Primary:e.Secondary;return n?i.jsx("a",{href:n,target:v,className:c(e.Button,s,o),children:a}):i.jsx("button",{onClick:B,className:c(e.Button,s,o),type:_,children:a})};f.__docgenInfo={description:"",methods:[],displayName:"Button",props:{onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLButtonElement"}],raw:"MouseEventHandler<HTMLButtonElement>"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"'button'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},href:{required:!1,tsType:{name:"string"},description:""},target:{required:!1,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:'"submit" | "reset" | "button" | undefined',elements:[{name:"literal",value:'"submit"'},{name:"literal",value:'"reset"'},{name:"literal",value:'"button"'},{name:"undefined"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const x={title:"ui/Button",component:f},r={args:{onClick:()=>alert("Primary Button Clicked!"),variant:"primary",children:"Primary Button"}},t={args:{onClick:()=>alert("Secondary Button Clicked!"),variant:"secondary",children:"Secondary Button"}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    onClick: () => alert('Primary Button Clicked!'),
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,p,y;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    onClick: () => alert('Secondary Button Clicked!'),
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...(y=(p=t.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};const E=["Primary","Secondary"];export{r as Primary,t as Secondary,E as __namedExportsOrder,x as default};
