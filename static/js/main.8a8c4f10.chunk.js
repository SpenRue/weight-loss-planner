(this["webpackJsonpweight-loss-planner"]=this["webpackJsonpweight-loss-planner"]||[]).push([[0],{108:function(e,t,a){},109:function(e,t,a){},118:function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),l=a(15),n=a.n(l),c=(a(108),a(109),a(6)),s=a(8),o=a(160),d=a(164),u=a(180),j=a(175),b=a(177),h=a(167),g=a(183),x=a(168),f=(a(85),a(24));function O(e,t){var a=10*e.weight*.453592+6.25*e.height*2.54-5*e.age+("Male"===e.gender?5:161),r=a*e.activityScale,i=r*t;return{updatedWeight:e.weight+i/3500,bmr:a,tdee:r,calorieIntake:r+i,calorieLoss:i,exercise:r-a}}var v=Object(f.b)({key:"WeightLossPlanState",default:{gender:"Male",weight:160,age:20,bfp:30,bfpGoal:15,height:60,exerciseVolume:0,activityScale:1.2,deficit:-10,deficitMode:"calories",targetMode:"weight",days:30,weightGoal:150}}),m=Object(f.c)({key:"tdeeState",get:function(e){var t=(0,e.get)(v);return O(t,t.deficit/100)}}),p=Object(f.c)({key:"goalDateState",get:function(e){var t=(0,e.get)(v);return function(e,t){if(!e.weightGoal||!e.weight||e.weight<=e.weightGoal)return{days:0,average:0};for(var a=Object(c.a)({},e),r=[],i=0;i<730;i++){var l=O(a,t);if(a=Object(c.a)(Object(c.a)({},a),{},{weight:l.updatedWeight}),r.push(l.calorieLoss),e.weightGoal>l.updatedWeight)return{days:i,average:r.reduce((function(e,t){return e+t}),0)/i}}return{days:-1,average:-1}}(t,t.deficit/100)}}),y=Object(f.c)({key:"weightGoalState",get:function(e){var t=(0,e.get)(v);return"bfp"==t.targetMode?function(e){var t=e.weight-e.weightGoal,a=(e.weight-e.weight*(e.bfp/100)-.25*t)/(1-e.bfpGoal/100);return Number.parseInt(a.toFixed(0))}(t):t.weightGoal}}),w={state:v,selectors:{TDEEState:m,GoalDateState:p,WeightGoalState:y}},G=a(182),M=a(66),B=a.n(M),P=a(2);var C=function(){var e=Object(f.d)(w.state),t=Object(s.a)(e,2),a=t[0],r=t[1],i=Object(f.e)(w.selectors.TDEEState),l=B.a.throttle((function(e){console.log("actually setting the new state"),r(e)}),100,{trailing:!1});return Object(P.jsxs)(o.a,{className:"card-container",children:[Object(P.jsx)("h2",{children:"Find your Total Daily Energy Expenditure"}),Object(P.jsxs)("form",{children:[Object(P.jsxs)(d.a,{style:{flexGrow:1,flexBasis:0,width:"100%"},variant:"filled",children:[Object(P.jsx)(u.a,{shrink:!0,children:"Gender"}),Object(P.jsx)(j.a,{label:"Gender",value:a.gender,defaultValue:"",onChange:function(e,t){return r(Object(c.a)(Object(c.a)({},a),{},{gender:e.target.value}))},style:{width:"100%"},children:["Male","Female"].map((function(e){return Object(P.jsx)(b.a,{value:e,children:e},e)}))})]}),Object(P.jsxs)("div",{style:{display:"flex",gap:"1rem"},children:[Object(P.jsx)(G.a,{label:"Weight",type:"number",inputProps:{inputMode:"numeric",min:0},variant:"filled",style:{flexGrow:1},value:a.weight,onChange:function(e){return r(Object(c.a)(Object(c.a)({},a),{},{weight:Number.parseInt(e.target.value)}))}}),Object(P.jsx)(G.a,{label:"Age",type:"number",inputProps:{inputMode:"numeric",min:0},variant:"filled",style:{flexGrow:1},value:a.age,onChange:function(e){return r(Object(c.a)(Object(c.a)({},a),{},{age:Number.parseInt(e.target.value)}))}})]}),Object(P.jsxs)("div",{className:"height-controls",children:[Object(P.jsxs)(d.a,{variant:"filled",children:[Object(P.jsx)(u.a,{shrink:!0,children:"Height (ft)"}),Object(P.jsx)(j.a,{label:"ft",value:Math.floor(a.height/12)<4?4:Math.floor(a.height/12),defaultValue:4,onChange:function(e,t){return r(Object(c.a)(Object(c.a)({},a),{},{height:12*e.target.value+a.height%12}))},children:[4,5,6,7,8].map((function(e){return Object(P.jsxs)(b.a,{value:e,children:[e,"'"]},e)}))})]}),Object(P.jsxs)(d.a,{variant:"filled",children:[Object(P.jsx)(u.a,{shrink:!0,children:"Height (in)"}),Object(P.jsx)(j.a,{label:"in",value:a.height%12,defaultValue:0,onChange:function(e,t){r(Object(c.a)(Object(c.a)({},a),{},{height:a.height-a.height%12+e.target.value}))},children:[0,1,2,3,4,5,6,7,8,9,10,11].map((function(e){return Object(P.jsxs)(b.a,{value:e,children:[e,'"']},e)}))})]})]}),Object(P.jsxs)("div",{className:"weight-control",style:{flexGrow:1,flexBasis:0},children:[Object(P.jsx)(h.a,{gutterBottom:!0,children:"How active are you? (Calories burned through daily routine and exercise)"}),Object(P.jsx)("div",{className:"slider-control",children:Object(P.jsx)(g.a,{defaultValue:1.2,"aria-labelledby":"discrete-slider-custom",step:.01,valueLabelDisplay:"auto",min:1.1,max:2.4,marks:[{value:1.2,label:"Sedentary"},{value:1.55,label:"Moderately"},{value:1.9,label:"Extremely"},{value:2.3,label:"Athlete"}],valueLabelFormat:function(e){return"".concat(Math.floor(i.exercise))},onChange:function(e,t){l(Object(c.a)(Object(c.a)({},a),{},{activityScale:t}))}})})]}),Object(P.jsxs)(x.a,{variant:"outlined",style:{padding:"1rem"},children:[Object(P.jsx)("div",{className:"weight-control",style:{flexGrow:1,flexBasis:0},children:Object(P.jsxs)(h.a,{gutterBottom:!0,children:["Your Basal Metabolic Rate (BMR) is ",Object(P.jsxs)("strong",{children:[Math.floor(i.bmr)," cal"]}),"."]})}),Object(P.jsx)("div",{className:"weight-control",style:{flexGrow:1,flexBasis:0},children:Object(P.jsxs)(h.a,{gutterBottom:!0,children:["You burn ",Object(P.jsxs)("strong",{children:[Math.floor(i.exercise)," cal"]})," from exercise and daily activities."]})}),Object(P.jsx)("div",{className:"weight-control",style:{flexGrow:1,flexBasis:0},children:Object(P.jsxs)(h.a,{gutterBottom:!0,children:["Your total daily energy expenditure (with exercise) is ",Object(P.jsxs)("strong",{children:[Math.floor(i.tdee)," cal"]}),"."]})})]})]})]})},D=a(172),S=a(173),N=a(174),F=a(92),k=a.n(F),E=a(179),W=a(176),I=a(184),T=a(185);function L(e,t){var a=new Date(e);return a.setDate(a.getDate()+t),a}var V=function(){var e=Object(f.d)(w.state),t=Object(s.a)(e,2),a=t[0],r=t[1],i=Object(f.e)(w.selectors.TDEEState),l=Object(f.e)(w.selectors.GoalDateState),n=Object(f.e)(w.selectors.WeightGoalState);function d(){switch(a.deficitMode){case"calories":return l.average.toFixed(0);case"caloriesConsumed":return Math.floor(i.calorieIntake);case"caloriePercentage":return a.deficit;case"bodyWeightPercentage":return(7*l.average/3500*1/a.weight*100).toFixed(2);default:return a.deficit}}var u=B.a.throttle((function(e){r(e)}),300,{trailing:!1});return Object(P.jsxs)(o.a,{className:"card-container",children:[Object(P.jsx)("h2",{children:"Set your weight loss goals"}),Object(P.jsxs)("form",{children:[Object(P.jsx)(h.a,{children:"Do you want to target a body fat percentage or a weight?"}),Object(P.jsxs)(E.a,{style:{width:"100%"},"aria-label":"outlined primary button group",value:a.targetMode,exclusive:!0,onChange:function(e,t){r(Object(c.a)(Object(c.a)({},a),{},{targetMode:t||""}))},children:[Object(P.jsx)(W.a,{value:"weight",children:"Weight"}),Object(P.jsx)(W.a,{value:"bfp",children:"Body Fat %"})]}),"bfp"==a.targetMode&&Object(P.jsxs)("div",{children:[Object(P.jsx)(I.a,{elevation:0,sx:{padding:"0.75rem",marginBottom:"1rem",color:"#bf360c",bgcolor:"#fbe9e7"},children:Object(P.jsx)(h.a,{children:"The target weight is being calculated assuming you will lose 75% fat and 25% lean mass."})}),Object(P.jsxs)("div",{style:{display:"flex",gap:"1rem"},children:[Object(P.jsx)(G.a,{label:"Current Body Fat Percentage",type:"number",InputProps:{inputProps:{min:5}},variant:"filled",style:{flexGrow:1},value:a.bfp||"",onChange:function(e){e.target.value||(e.target.value=""),console.log("Setting cBFP to: ",e.target.value),r(Object(c.a)(Object(c.a)({},a),{},{bfp:Number.parseInt(e.target.value)}))}}),Object(P.jsx)(G.a,{label:"Target Body Fat Percentage",type:"number",InputProps:{inputProps:{min:5}},variant:"filled",style:{flexGrow:1},value:a.bfpGoal||"",onChange:function(e){console.log("Setting tBFP to: ",e.target.value),r(Object(c.a)(Object(c.a)({},a),{},{bfpGoal:Number.parseInt(e.target.value)}))}})]})]}),Object(P.jsx)(G.a,{label:"Target Weight",type:"number",InputProps:{inputProps:{min:0}},variant:"filled",disabled:"bfp"==a.targetMode,style:{flexGrow:1,width:"100%"},value:n||"",onChange:function(e){console.log("Setting THE weightGoal to: ",e.target.value),r(Object(c.a)(Object(c.a)({},a),{},{weightGoal:Number.parseInt(e.target.value)}))}}),Object(P.jsx)(h.a,{gutterBottom:!0,children:"How do you want to measure your daily change?"}),Object(P.jsxs)(E.a,{style:{width:"100%"},"aria-label":"outlined primary button group",value:a.deficitMode,exclusive:!0,onChange:function(e,t){r(Object(c.a)(Object(c.a)({},a),{},{deficitMode:t||""}))},children:[Object(P.jsxs)(W.a,{value:"calories",children:["Calories Burned",Object(P.jsx)("br",{}),"(Per Day)"]}),Object(P.jsxs)(W.a,{value:"caloriesConsumed",children:["Calories Consumed",Object(P.jsx)("br",{}),"(Per Day)"]}),Object(P.jsxs)(W.a,{value:"caloriePercentage",children:["TDEE %",Object(P.jsx)("br",{}),"(Per Day)"]}),Object(P.jsxs)(W.a,{value:"bodyWeightPercentage",children:["Body Weight %",Object(P.jsx)("br",{}),"(Per Week)"]})]}),Object(P.jsxs)(h.a,{gutterBottom:!0,children:["Target Change: ",d()+function(){switch(a.deficitMode){case"calories":return" calories burned per day";case"caloriesConsumed":return" calories consumed per day";case"caloriePercentage":return" % of TDEE per day";case"bodyWeightPercentage":default:return"% of body weight per week"}}()]}),Object(P.jsx)("div",{className:"slider-control",children:Object(P.jsx)(g.a,{defaultValue:-1,"aria-labelledby":"discrete-slider-custom",step:.01,valueLabelDisplay:"auto",value:a.deficit,onChange:function(e,t){return u(Object(c.a)(Object(c.a)({},a),{},{deficit:t}))},min:-75,max:0,marks:[{value:0,label:"Maintenance"},{value:-19,label:"Slow"},{value:-30,label:"Fast"},{value:-60,label:"Crash Diet"}],valueLabelFormat:function(e){return d()}})}),Object(P.jsxs)(T.a,{variant:"outlined",style:{padding:"1rem"},children:[Object(P.jsx)("div",{className:"weight-control",style:{flexGrow:1,flexBasis:0},children:Object(P.jsxs)(h.a,{gutterBottom:!0,children:["Your initial target calorie intake should be ",Object(P.jsxs)("strong",{children:[Math.floor(i.calorieIntake)," cal"]}),"."]})}),Object(P.jsx)("div",{className:"weight-control",style:{flexGrow:1,flexBasis:0},children:Object(P.jsxs)(h.a,{gutterBottom:!0,children:["You will reach ",Object(P.jsxs)("strong",{children:[a.weightGoal," lbs "]})," in ",Object(P.jsxs)("strong",{children:[l.days," days"]})," on ",Object(P.jsx)("strong",{children:k()(L(new Date,l.days)).format("MMM Do YY")})," with an average weight loss of ",Object(P.jsxs)("strong",{children:[(7*l.average/3500).toFixed(2)," lbs"]})," per week and ",Object(P.jsxs)("strong",{children:[(-1*l.average).toFixed(0)," cal"]})," burned per day."]})})]})]})]})};var Y=function(){return Object(P.jsxs)("div",{className:"App",style:{display:"flex",flexDirection:"column",height:"100%"},children:[Object(P.jsx)(D.a,{position:"static",children:Object(P.jsx)(S.a,{variant:"dense",children:Object(P.jsx)(h.a,{variant:"h6",color:"inherit",children:"Weight Loss Planner and Visualizer"})})}),Object(P.jsx)(o.a,{className:"main-container",children:Object(P.jsxs)(N.a,{container:!0,xs:12,spacing:4,children:[Object(P.jsx)(N.a,{item:!0,xs:12,lg:6,className:"top-grid",children:Object(P.jsx)(C,{})}),Object(P.jsx)(N.a,{item:!0,xs:12,lg:6,className:"bottom-grid",children:Object(P.jsx)(V,{})})]})})]})},H=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,186)).then((function(t){var a=t.getCLS,r=t.getFID,i=t.getFCP,l=t.getLCP,n=t.getTTFB;a(e),r(e),i(e),l(e),n(e)}))},A=a(93);n.a.render(Object(P.jsx)(i.a.StrictMode,{children:Object(P.jsx)(f.a,{children:Object(P.jsx)(A.a,{children:Object(P.jsx)(Y,{})})})}),document.getElementById("root")),H()},85:function(e,t,a){}},[[118,1,2]]]);
//# sourceMappingURL=main.8a8c4f10.chunk.js.map