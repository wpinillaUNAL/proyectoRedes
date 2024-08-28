let map;
const hosSVG= document.createElement("img");
hosSVG.src="./hosSVG.svg"

async function initMap() {
  //Importe librerias
  const {Map} = await google.maps.importLibrary("maps");
  const {DirectionsService, DirectionsRenderer} = await google.maps.importLibrary("routes");
  const {HeatmapLayer} = await google.maps.importLibrary("visualization")
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
  
  map = new Map(document.getElementById("map"), {
    center: { lat: 4.6364, lng: -74.0833 },
    zoom: 15,
    mapId: 'caf277663d39e69c'
  });

  const wp1={location:{lat:4.623597997840538, lng:-74.08269773766328},stopover:true}
  const wp2={location:{lat:4.618671485485863, lng:-74.07842874534818},stopover:true}
  const wp3={location:{lat:4.600833675914158, lng:-74.07136917121366},stopover:true}
  let wp=[]

  let dS = new DirectionsService();
  let dR = new DirectionsRenderer();
  let hM= new HeatmapLayer();
  const pin1= new PinElement({
    scale: 0.5,
  });
  const pin2= new PinElement({
    scale: 0.5,
  });
  const pin3= new PinElement({
    scale: 0.5,
  });
  const marker1= new AdvancedMarkerElement({
    map,
    position:{lat:4.623597997840538, lng:-74.08269773766328},
    content: pin1.element,
    title:"Hospital Mederi",
  }); 
  const marker2= new AdvancedMarkerElement({
    map,
    position:{lat:4.618671485485863, lng:-74.07842874534818},
    content: pin2.element,
    title:"Cai Samper Mendoza",
  }); 
  const marker3= new AdvancedMarkerElement({
    map,
    position:{lat:4.600833675914158, lng:-74.07136917121366},
    content: pin3.element,
    title:"Cai Rosario",
  }); 
  

  let mapOpt={disableDefaultUI:true}
  map.setOptions(mapOpt);
  const onChangeHandler = function(){
    calcRoute(dS, dR, wp);
  };
  const onClickHandler1=function(){
    const valor= document.getElementById("but1").value
    if(valor==="act"){
      wp=[];
      wp.push(wp1);
      calcRoute(dS,dR,wp);
    }
    else{
      wp=[];
      calcRoute(dS,dR,wp);
    }
  };
  const onClickHandler2=function(){
    const valor= document.getElementById("but2").value
    if(valor==="act"){
      wp=[];
      wp.push(wp2);
      calcRoute(dS,dR,wp);
    }
    else{
      wp=[];
      calcRoute(dS,dR,wp);
    }
  };
  const onClickHandler3=function(){
    const valor= document.getElementById("but3").value
    if(valor==="act"){
      wp=[];
      wp.push(wp3);
      calcRoute(dS,dR,wp);
    }
    else{
      wp=[];
      calcRoute(dS,dR,wp);
    }
  };
  document.getElementById("start").onchange= onChangeHandler;
  document.getElementById("end").onchange= onChangeHandler;
  document.getElementById("but1").onchange= onClickHandler1;
  document.getElementById("but2").onchange= onClickHandler2;
  document.getElementById("but3").onchange= onClickHandler3;

  let opt={radius:20}
  var hMData=[
    {location:new google.maps.LatLng(4.608601015274304, -74.06844776462152), weight: 10},
    {location:new google.maps.LatLng(4.6063929357767694, -74.06991953255951), weight: 10},
    {location:new google.maps.LatLng(4.602626456134195, -74.07098586969566), weight: 10},
    {location:new google.maps.LatLng(4.600826705507106, -74.07197210594275), weight: 10},
    {location:new google.maps.LatLng(4.60264158006977, -74.06922581731624), weight: 10},
    {location:new google.maps.LatLng(4.602667573398774, -74.07103647811539), weight: 10},
    {location:new google.maps.LatLng(4.6034388936584385, -74.07061163788588), weight: 10},
    {location:new google.maps.LatLng(4.604331204288281, -74.07026266198307), weight: 10},
    {location:new google.maps.LatLng(4.601669392998359, -74.07147649121025), weight: 10},
    {location:new google.maps.LatLng(4.605238637679338, -74.06977713029218), weight: 10},
    {location:new google.maps.LatLng(4.606085574466567, -74.06950401871606), weight: 10},
    
  ]
  dR.setMap(map);
  hM.setMap(map);
  hM.setData(hMData);
  hM.setOptions(opt);
}

async function calcRoute(ds,dr, wp){
  const medriLN={lat:4.602032367851377, lng:-74.07218961588123};
  var start= JSON.parse(document.getElementById('start').value);
  var end= JSON.parse(document.getElementById('end').value);
  const elemento= document.getElementById("zonaPeligrosa");
  if((start.lat===medriLN.lat) || end.lat===medriLN.lat){
    elemento.style.display= "flex";
  }
  else{
    elemento.style.display="none"
  }


  var request={
    origin:start,
    destination:end,
    travelMode:'DRIVING',
    waypoints:wp
  };
  ds.route(request, function(result, status){
    if (status=='OK'){
      dr.setDirections(result)
    }
  });
}
initMap();


