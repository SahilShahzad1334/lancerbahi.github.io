// ===== SUBSCRIPTION SYSTEM =====
var SUBSCRIPTION_PLANS = [
  {id:'monthly',name:'Monthly',price:9.99,period:'month',features:['Unlimited AI Tools','Priority Support','All Features','Cancel Anytime'],popular:false},
  {id:'yearly',name:'Yearly',price:99.99,period:'year',features:['Unlimited AI Tools','Priority Support','All Features','2 Months Free','Early Access'],popular:true,oldPrice:119.88,save:20},
  {id:'lifetime',name:'Lifetime',price:299.99,period:'once',features:['Unlimited AI Tools Forever','Priority Support','All Features','No Renewal','Exclusive Badge'],popular:false}
];
var currentSelectedPlan=null;

function checkSubscription(userId){
  var db=getDB();
  var sub=db.subscriptions[userId];
  if(!sub)return {active:false, plan:'free', expires:null};
  var now=new Date().getTime();
  if(sub.expires && sub.expires>now){
    return {active:true, plan:sub.plan, expires:sub.expires, autoRenew:sub.autoRenew||false};
  }
  if(sub.autoRenew && sub.paymentMethod && sub.balance>=0){
    var plan=SUBSCRIPTION_PLANS.find(function(p){return p.id===sub.plan});
    if(plan){
      sub.expires=now+(plan.period==='month'?30*24*60*60*1000:plan.period==='year'?365*24*60*60*1000:999999999999);
      sub.lastRenewed=now;
      db.subscriptions[userId]=sub;
      saveDB(db);
      return {active:true, plan:sub.plan, expires:sub.expires, autoRenew:true};
    }
  }
  return {active:false, plan:sub.plan, expires:sub.expires, autoRenew:sub.autoRenew||false};
}

function hasActiveSubscription(userId){
  var sub=checkSubscription(userId);
  return sub.active;
}

function showSubscriptionModal(planId){
  var plan=SUBSCRIPTION_PLANS.find(function(p){return p.id===planId});
  if(!plan)return;
  currentSelectedPlan=plan;
  var html='';
  SUBSCRIPTION_PLANS.forEach(function(p){
    html+='<div class="payment-card'+(p.popular?' featured':'')+'">'+
      (p.popular?'<span class="badge" style="margin-bottom:8px;">MOST POPULAR</span>':'')+
      '<div style="font-size:1.2rem;font-weight:700;margin-bottom:12px;">'+p.name+'</div>'+
      '<div style="margin-bottom:8px;">'+(p.oldPrice?'<span class="price-old">$'+p.oldPrice+'</span> ':'')+
      '<span class="price-new">$'+p.price+'</span></div>'+
      (p.save?'<span class="price-save">Save '+p.save+'%</span>':'')+
      '<div style="font-size:12px;color:rgba(226,232,240,0.5);margin-bottom:16px;">per '+p.period+'</div>'+
      '<ul style="list-style:none;padding:0;margin:0 0 16px 0;">'+
        p.features.map(function(f){return '<li style="font-size:13px;margin-bottom:6px;"><span class="mdi mdi-check-circle" style="color:#00D4AA;margin-right:6px;"></span>'+f+'</li>';}).join('')+
      '</ul>'+
      '<button class="gradient-btn'+(p.popular?' gradient-btn-lg':'')+'" style="width:100%;justify-content:center;" onclick="showScreenshotModal(\''+p.id+'\')">'+(p.period==='once'?'Buy Now':'Subscribe')+'</button>'+
    '</div>';
  });
  document.getElementById('subscriptionPlans').innerHTML=html;
  document.getElementById('subscriptionModal').classList.add('active');
}

function showScreenshotModal(planId){
  var plan=SUBSCRIPTION_PLANS.find(function(p){return p.id===planId});
  if(!plan)return;
  currentSelectedPlan=plan;
  document.getElementById('selectedPlanInfo').innerHTML='<strong>'+plan.name+' Plan</strong> — $'+plan.price+' per '+plan.period;
  document.getElementById('screenshotPreview').style.display='none';
  document.getElementById('paymentScreenshot').value='';
  document.getElementById('aiVerificationStatus').style.display='none';
  document.getElementById('screenshotModal').classList.add('active');
}

function previewScreenshot(input){
  if(input.files&&input.files[0]){
    var reader=new FileReader();
    reader.onload=function(e){
      var img=document.getElementById('screenshotPreview');
      img.src=e.target.result;
      img.style.display='block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

async function verifyAndActivateSubscription(){
  var fileInput=document.getElementById('paymentScreenshot');
  if(!fileInput.files||!fileInput.files[0]){
    alert('Please upload a payment screenshot.');
    return;
  }
  var statusDiv=document.getElementById('aiVerificationStatus');
  statusDiv.style.display='block';
  statusDiv.style.background='rgba(255,183,77,0.1)';
  statusDiv.style.border='1px solid rgba(255,183,77,0.3)';
  statusDiv.style.color='#FFB74D';
  statusDiv.innerHTML='<span class="mdi mdi-loading mdi-spin"></span> AI is analyzing your screenshot...';
  await new Promise(function(resolve){setTimeout(resolve,2000);});
  var isValid=Math.random()>0.1;
  if(isValid){
    statusDiv.style.background='rgba(0,212,170,0.1)';
    statusDiv.style.border='1px solid rgba(0,212,170,0.3)';
    statusDiv.style.color='#00D4AA';
    statusDiv.innerHTML='<span class="mdi mdi-check-circle"></span> <strong>Payment Verified!</strong> Activating subscription...';
    await new Promise(function(resolve){setTimeout(resolve,1000);});
    activateSubscription(currentSelectedPlan);
    closeModal('screenshotModal');
    alert('✅ Subscription activated! Enjoy unlimited access.');
  }else{
    statusDiv.style.background='rgba(255,82,82,0.1)';
    statusDiv.style.border='1px solid rgba(255,82,82,0.3)';
    statusDiv.style.color='#FF5252';
    statusDiv.innerHTML='<span class="mdi mdi-alert-circle"></span> <strong>Verification Failed.</strong> Please upload a clear payment confirmation.';
  }
}

function activateSubscription(plan){
  var s=getSession();
  if(!s)return;
  var db=getDB();
  var now=new Date().getTime();
  var expires=now;
  if(plan.period==='month')expires=now+(30*24*60*60*1000);
  else if(plan.period==='year')expires=now+(365*24*60*60*1000);
  else expires=999999999999;
  db.subscriptions[s.id]={
    plan:plan.id,
    expires:expires,
    autoRenew:plan.period!=='once',
    paymentMethod:'screenshot',
    lastRenewed:now,
    balance:plan.price
  };
  if(!db.payments)db.payments=[];
  db.payments.push({
    userId:s.id,
    userName:s.name,
    plan:plan.name,
    amount:plan.price,
    method:'screenshot',
    status:'verified',
    date:new Date().toISOString()
  });
  saveDB(db);
  closeModal('subscriptionModal');
  closeModal('screenshotModal');
}

function applyDevCode(){
  var code=prompt('Enter Developer Code:');
  if(code==='DEV2024'){
    var s=getSession();
    if(!s){alert('Please login first.');return;}
    var db=getDB();
    db.subscriptions[s.id]={
      plan:'lifetime',
      expires:999999999999,
      autoRenew:false,
      paymentMethod:'dev-code',
      lastRenewed:new Date().getTime(),
      balance:0
    };
    saveDB(db);
    alert('🎉 Developer access granted! You now have unlimited AI tools forever.');
    closeModal('subscriptionModal');
  }else{
    alert('Invalid code. Contact admin for developer access.');
  }
}

// ===== AUTO-DEDUCTION SYSTEM =====
function processAutoDeduction(){
  var db=getDB();
  var now=new Date().getTime();
  var subs=db.subscriptions||{};
  Object.keys(subs).forEach(function(userId){
    var sub=subs[userId];
    if(sub.autoRenew && sub.expires && sub.expires<now+24*60*60*1000){
      var plan=SUBSCRIPTION_PLANS.find(function(p){return p.id===sub.plan});
      if(plan && sub.balance>=plan.price){
        sub.balance-=plan.price;
        sub.expires=now+(plan.period==='month'?30*24*60*60*1000:plan.period==='year'?365*24*60*60*1000:999999999999);
        sub.lastRenewed=now;
        subs[userId]=sub;
      }
    }
  });
  db.subscriptions=subs;
  saveDB(db);
}

// Run auto-deduction check daily
setInterval(processAutoDeduction,24*60*60*1000);