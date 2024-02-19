

function latheBez3(nbePtCbe,nbePtRot,P0,P1,P2,P3,coul,opacite,bolTranspa){
     //let geometry = new THREE.Geometry();
     let p0= new THREE.Vector2(P0.x,P0.y);
     let p1= new THREE.Vector2(P1.x,P1.y);
     let p2= new THREE.Vector2(P2.x,P2.y);
     let p3= new THREE.Vector2(P3.x,P3.y);
     let Cbe3 = new THREE.CubicBezierCurve(p0,p1,p2,p3);
     let points = Cbe3.getPoints(nbePtCbe);
     let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI);
     let lathe = surfPhong(latheGeometry,coul,opacite,bolTranspa,"#00FF00");
     return lathe;
    }// fin latheBez3

function TraceBezierTab(TabPt,nbPts,coul,epaiCbe){
 let cbeBez = new THREE.CubicBezierCurve3(P0, P1, P2, P3);
 let cbe = new THREE.CurvePath();
 let cbeGeometry = new THREE.Geometry();
 cbeGeometry.vertices = cbeBez.getPoints(nbPts);
 let material = new THREE.LineBasicMaterial( 
   { color : coul , 
     linewidth: epaiCbe    
   } );
 let BezierTab = new THREE.Line( cbeGeometry, material );
 return (BezierTab);
}  // fin fonction THREE.CubicBezierCurve
 


function latheBezTab(MaScene,nbePtCbe,nbePtRot,tabP,coul,opacite,bolTranspa){
 let tabp= new Array(tabP.length);
 for (let j=0;j<tabp.length;j++)
   tabp[j]= new THREE.Vector2(tabP[j].x,tabP[j].y);
 // points de la courbe de Bezier
 let points = new Array(nbePtCbe+1);
 for(let k=0;k<=nbePtCbe;k++){
   let t2=k/nbePtCbe; 
   t2=t2.toPrecision(PrecisionArrondi);
   let v0= new THREE.Vector2(0,0);
   v0.addScaledVector(tabp[0],Ber(t2,0,tabp.length-1));
   for(let j=1;j<tabp.length;j++){
     let v1= new THREE.Vector2(0,0);
     v1.addScaledVector(tabp[j],Ber(t2,j,tabp.length-1));
     v0.add(v1);
   }
   points[k] = new THREE.Vector2(v0.x,v0.y);
 }
 let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI); 
 let lathe = surfPhong(latheGeometry,coul,opacite,bolTranspa,"#223322");
 return lathe;
}//fin latheBezTab




// iNITIALISATION DES ATTRIBUTS 


let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 let scene = new THREE.Scene();   
 let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 cameraLumiere(scene,camera);
 lumiere(scene);

let score1 = 0 ; 
let score2=0;
let round=1;
let nbRouge=1;
let nbBleu=1;

let dev = -25;
let gd = 2;

// CREATION DES POINTS DE CONTROLE AYANT SERVI POUR LA CONSTRUCTION DE L QUILLLE 
let P0 = new THREE.Vector3(0.5,0.02);
let P1 = new THREE.Vector3(1,1);
let P2 = new THREE.Vector3(0.71,1.57);
let P3 = new THREE.Vector3(0.5,1.984);

let M1 = new THREE.Vector3(0.29,2.29);
let M2 = new THREE.Vector3(0.33,2.65);
let M3 = new THREE.Vector3(0.374,2.88);

let N1 = new THREE.Vector3(0.43,3.13);
let N2 = new THREE.Vector3(0.5,3.344);
let N3 = new THREE.Vector3(0,3.5);

let nb=100;//nmbre de pts par courbe
let epai=5;//epaisseur de la courbe
let nbPtCB=50;//nombre de points sur la courbe de Bezier
let nbePtRot=150;// nbe de points sur les cercles
let dimPt=0.025;

const largPlan = 12;
const hautPlan = 100;
const nbSegmentLarg = 30;
const nbSegmentHaut = 30;
  

// Creation du tableau pour stocker les differentes parties des quilles  
let tabTete1 = new Array(10);
let tabMilieu1 = new Array(10);
let tabQueue1 = new Array(10);
let tabTete2 = new Array(10);
let tabMilieu2 = new Array(10);
let tabQueue2 = new Array(10);

// POUR GERER LES PARALLELOPIPEDE RECTANGLE
let tabParaRect1 = new Array(10);
let tabParaRect2 = new Array(10);
for(let k=0; k<10 ; k++)
{
    tabParaRect1[k]=null;
    tabParaRect2[k]=null;
}


QuilleInit(scene,1,tabTete1,tabMilieu1,tabQueue1);
QuilleInit(scene,-1,tabTete2,tabMilieu2,tabQueue2);

// Creation des balles sans les ajouter dans la scene 

let balleRouge = creerBalle(1,"#FF0000");
let courbeBleue = courbe_balle(1,50,2,"#0000FF");
let balleBleue = creerBalle(1,"#0000FF");
let courbeRouge = courbe_balle(1,50,2,"#FF0000"); 

balleRouge.translateX(-3);
 balleRouge.translateX(-5);
   courbeBleue.translateX(-3);
courbeBleue.translateX(-5);
   scene.add(balleRouge,courbeBleue);
balleBleue.translateX(3);
balleBleue.translateX(7);
   courbeRouge.translateX(3);
courbeRouge.translateX(7);
   scene.add(balleBleue,courbeRouge);



  // FONCTIUON POUR LE PLAN SOL

  function plansol(pos,coul,hautPlan,nbSegmentLarg,nbSegmentHaut){
        let  PlanSolGeometry1 = new THREE.PlaneGeometry(1,hautPlan,nbSegmentLarg,nbSegmentHaut);
      let  PlanSol1 = surfPhong(PlanSolGeometry1,coul,1,true,"#335533");
      PlanSol1.position.z = -4;
      PlanSol1.translateX(pos);
      PlanSol1.receiveShadow = true; 
      PlanSol1.castShadow = true;
      scene.add(PlanSol1);
  }

  // CREATION DES LATHES POUR LA PISTE 

  plansol(1.5,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-1.5,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);

  plansol(2,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-2,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);


  plansol(3,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-3,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);

  plansol(4,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-4,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);


  plansol(5,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-5,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);

  plansol(6,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-6,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);


  plansol(7,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-7,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);

  plansol(8,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-8,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);


  plansol(9,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-9,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);

  plansol(10,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-10,"#E1B371",hautPlan,nbSegmentLarg,nbSegmentHaut);


  plansol(11,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);
  plansol(-11,"#E1AB67",hautPlan,nbSegmentLarg,nbSegmentHaut);






  const PlanSolGeometry2 = new THREE.PlaneGeometry(2,hautPlan,nbSegmentLarg,nbSegmentHaut);
  const PlanSol2 = surfPhong(PlanSolGeometry2,"#0A0A0A",1,true,"#335533");
  PlanSol2.position.z = -4;
  PlanSol2.receiveShadow = true; 
  PlanSol2.castShadow = true;
  scene.add(PlanSol2);


        // Point de controle de la trajectoire de deplcement dela balle rouge 

        let C0 = new THREE.Vector3(-5,0,-3);
        let C1 = new THREE.Vector3(-8.24,-10.6,-3);
        let C2 = new THREE.Vector3(-8.85,-25.93,-3);
        let C3 = new THREE.Vector3(-4,-45,-3);

        // let K1 = new THREE.Vector3(-4,-30,-3);
        // let K2 = new THREE.Vector3(-3,-40,-3);
        // let K3 = new THREE.Vector3(-7,-50,-3);
        let K0 = new THREE.Vector3(5,0,-3);
        let K1 = new THREE.Vector3(8.24,-10.6,-3);
        let K2 = new THREE.Vector3(8.85,-25.93,-3);
        let K3 = new THREE.Vector3(4,-45,-3);

        let cbeBez1 = new THREE.CubicBezierCurve3(C0, C1, C2, C3);
        let cbeBez2 = new THREE.CubicBezierCurve3(K0, K1, K2, K3);
        let nb1=50;
        let nb2=50;
        //let tabPtCbe = new Array(nb1+nb2);
        // for (let i=0 ; i<tabPtCbe.length ; i++)
        //     tabPtCbe[i]= new THREE.Vector3(0,0,0);

        let cbeGeometry1 = new THREE.Geometry();
         cbeGeometry1.vertices = cbeBez1.getPoints(20);

         let cbeGeometry2 = new THREE.Geometry();
         cbeGeometry2.vertices = cbeBez2.getPoints(20);

         let material = new THREE.LineBasicMaterial( 
           { color : "#FF0000" , 
             linewidth: 2    
           } );
         let BezierTab1 = new THREE.Line( cbeGeometry1, material );
         //scene.add(BezierTab1);

         let BezierTab2 = new THREE.Line( cbeGeometry2, material );
         //scene.add(BezierTab2);

        


    

function clickRouge(){
    camera.position.x=-7;
    score=0;
    document.getElementById("texte").innerHTML="C'EST A L'EQUIPE ROUGE DE JOUER ";
   
   
        deplace_BalleRouge();

 

}

function clickBleu(){
    camera.position.x=7;
    score=0;
    document.getElementById("texte").innerHTML="C'EST A L'EQUIPE BLEUE DE JOUER ";
    deplace_BalleBleu();

   }
    



// DEROULEMENT DU JEU 

function RedGame(){
    camera.position.x=-7;
    let temp=0;
        if(round==1)
    {
        
        if((nbRouge==1 && nbBleu==1)||(nbRouge==1 && nbBleu==3))
        {
            nbRouge=2;
            
            document.getElementById("boutonBleu").disabled=true;
            deplace_BalleRouge();
            // temp = document.getElementById("Rouge").value;
            // score = temp+score;
            // document.getElementById("Rouge").value=score;
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE ROUGE DE JOUER ";
        }
        else if(nbRouge==2 && nbBleu==1)
        {
            nbRouge=3;
            
            document.getElementById("boutonBleu").disabled=false;
            document.getElementById("boutonRouge").disabled=true;
            deplace_BalleRouge();
            // temp = document.getElementById("Rouge").value;
            // score = temp+score;
            // document.getElementById("Rouge").value=score;
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE BLEUE DE JOUER ";

            setTimeout(function(){
                SupprimerQuille(scene,tabTete1,tabMilieu1,tabQueue1);
                removeParaRect(scene,tabParaRect1);
                QuilleInit(scene,1,tabTete1,tabMilieu1,tabQueue1);

            },2000);
        }
        else if(nbRouge==2 && nbBleu==3)
        {
            nbRouge=3;
            round=2;
            
            document.getElementById("boutonBleu").disabled=false;
            document.getElementById("boutonRouge").disabled=true;
            deplace_BalleRouge();
            // temp = document.getElementById("Rouge").value;
            // score = temp+score;
            // document.getElementById("Rouge").value=score;
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE BLEUE DE JOUER ";
            setTimeout(function(){
                SupprimerQuille(scene,tabTete1,tabMilieu1,tabQueue1);
                removeParaRect(scene,tabParaRect1);
                QuilleInit(scene,1,tabTete1,tabMilieu1,tabQueue1);

            },2000);
        }

    }
    else if(round==2)
    {

        if((nbRouge==3 && nbBleu==3)||(nbRouge==3 && nbBleu==4))
        {
            nbRouge=4;
            
            document.getElementById("boutonBleu").disabled=true;
            deplace_BalleRouge();
            // temp = document.getElementById("Rouge").value;
            // score = temp+score;
            // document.getElementById("Rouge").value=score;
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE ROUGE DE JOUER ";
        }
        else if(nbRouge==4 && nbBleu==3)
        {
                        document.getElementById("boutonBleu").disabled=false;
            document.getElementById("boutonRouge").disabled=true;
            deplace_BalleRouge();
            // temp = document.getElementById("Rouge").value;
            // score = temp+score;
            // document.getElementById("Rouge").value=score;
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE BLEUE DE JOUER ";

        }
        else if(nbRouge==4 && nbBleu==4)
        {
           
            document.getElementById("boutonBleu").disabled=true;
            document.getElementById("boutonRouge").disabled=true;
            deplace_BalleRouge();
            // temp = document.getElementById("Rouge").value;
            // score = temp+score;
            // document.getElementById("Rouge").value=score;

            let valRouge = document.getElementById("Rouge").value;
            let valBleu = document.getElementById("Bleu").value;

            if(valRouge > valBleu)
                document.getElementById("texte").innerHTML="!!!!!!FELICITATION A L'EQUIPE ROUGE!!!!!";
            else if(valRouge < valBleu)
                document.getElementById("texte").innerHTML="!!!!FELICITATION A L'EQUIPE BLEU!!!!";
            else
                document.getElementById("texte").innerHTML="!!!!!MATCH NUL!!!!!";


            


        }
    }
}




function BlueGame(){
    camera.position.x=7;
    
    
    if(round==1)
    {
        
        if((nbBleu==1 && nbRouge==1)||(nbBleu==1 && nbRouge==3))
        {
            nbBleu=2;

            document.getElementById("boutonRouge").disabled=true;
            deplace_BalleBleu();
            
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE BLEUE DE JOUER ";
        }
        else if(nbBleu==2 && nbRouge==1)
        {
            nbBleu=3;
            document.getElementById("boutonRouge").disabled=false;
            document.getElementById("boutonBleu").disabled=true;
            deplace_BalleBleu();
            
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE ROUGE DE JOUER ";
            setTimeout(function(){
                SupprimerQuille(scene,tabTete2,tabMilieu2,tabQueue2);
                removeParaRect(scene,tabParaRect2);
                QuilleInit(scene,-1,tabTete2,tabMilieu2,tabQueue2);

            },2000);

        }
        else if(nbBleu==2 && nbRouge==3)
        {
            nbBleu=3;
            round=2;
            document.getElementById("boutonRouge").disabled=false;
            document.getElementById("boutonBleu").disabled=true;
            deplace_BalleBleu();
           
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE ROUGE DE JOUER ";
            setTimeout(function(){
                SupprimerQuille(scene,tabTete2,tabMilieu2,tabQueue2);
                removeParaRect(scene,tabParaRect2);
                QuilleInit(scene,-1,tabTete2,tabMilieu2,tabQueue2);

            },2000);
        }

    }
    else if(round==2)
    {
        
        if((nbBleu==3 && nbRouge==3)||(nbBleu==3 && nbRouge==4))
        {
            nbBleu=4;
            document.getElementById("boutonRouge").disabled=true;
            deplace_BalleBleu();
            
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE BLEUE DE JOUER ";
        }
        else if(nbBleu==4 && nbRouge==3)
        {
            
            document.getElementById("boutonRouge").disabled=false;
            document.getElementById("boutonBleu").disabled=true;
            deplace_BalleBleu();
           
            document.getElementById("texte").innerHTML="C'EST A L'EQUIPE ROUGE DE JOUER ";
        }
        else if(nbBleu==4 && nbRouge==4)
        {
           
            document.getElementById("boutonRouge").disabled=true;
            document.getElementById("boutonBleu").disabled=true;
            deplace_BalleBleu();
        

            let valRouge = document.getElementById("Rouge").value;
            let valBleu = document.getElementById("Bleu").value;

            if(valRouge > valBleu)
                document.getElementById("texte").innerHTML="!!!!!!FELICITATION A L'EQUIPE ROUGE!!!!!";
            else if(valRouge < valBleu)
                document.getElementById("texte").innerHTML="!!!!FELICITATION A L'EQUIPE BLEU!!!!";
            else
                document.getElementById("texte").innerHTML="!!!!!MATCH NUL!!!!!";


            


        }
    }
}





function init(){
 var stats = initStats();
    // creation de rendu et de la taille
 
 //repere(scene);
 
    //var axes = new THREE.AxesHelper(1);    
    //scene.add(axes);
    //repere(scene)




 //********************************************************
 //
 //  P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************
    

         

        
       



   



   


        




 
 //********************************************************
 //
 // F I N      P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************
 
 

   

 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************

 let gui = new dat.GUI();//interface graphique utilisateur
 let menuGUI = new function () {
 // propriete de la camera
 this.cameraxPos = camera.position.x;
 this.camerayPos = camera.position.y;
 this.camerazPos = camera.position.z;
 this.cameraZoom = 1.3;
 this.cameraxDir = -1;
 this.camerayDir = -8;
 this.camerazDir = 4.6;
 this.ChoixCbe=1;
 this.DeplacementRouge = C3.x;
 this.DeplacementBleu = C3.x;
 this.Rectiligne="Non";

 

   

    //pour actualiser dans la scene   
   this.actualisation = function () {
    posCamera();
    reAffichage();
   };



 }
   // CAMERA

 let guiCamera = gui.addFolder("Camera");

 guiCamera.add(menuGUI,"cameraxPos",-20,20).onChange(function () {
 camera.position.set(menuGUI.cameraxPos, menuGUI.camerayPos,menuGUI.camerazPos);
 //document.getElementById("PosX").value=menuGUI.cameraxPos;
  camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
 });

 guiCamera.add(menuGUI,"camerayPos",-20,20).onChange(function () {
 camera.position.set(menuGUI.cameraxPos,menuGUI.camerayPos,menuGUI.camerazPos);
 //document.getElementById("PosY").value=menuGUI.camerayPos;
  camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
 });

 guiCamera.add(menuGUI,"camerazPos",-20,20).onChange(function () {
 camera.position.set(menuGUI.cameraxPos,menuGUI.camerayPos,menuGUI.camerazPos );
  camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
 //document.getElementById("PosZ").value=menuGUI.camerazPos;
 });

 guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function () {
    camera.position.set(menuGUI.cameraxPos* menuGUI.cameraZoom, menuGUI.camerayPos*menuGUI.cameraZoom, menuGUI.camerazPos*menuGUI.cameraZoom);
     camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    //document.getElementById("result").innerHTML+=menuGUI.cameraZoom+"<br/>";
  });
 
   // abscisse de la direction de la camera dans le menu
   guiCamera.add(menuGUI,"cameraxDir",-8,8).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*menuGUI.cameraZoom, menuGUI.camerayPos*menuGUI.cameraZoom, menuGUI.camerazPos*menuGUI.cameraZoom);
    // ecriture des proprietes de la camera dans html
   // actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
     camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    /*affichage de la direction en fonction de l'abscisse dans le tableau */
    //document.getElementById("DirX").value=menuGUI.camerazPos;
   });
   // ordonnée de la direction de la camera dans le menu
   guiCamera.add(menuGUI,"camerayDir",-8,8).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*menuGUI.cameraZoom, menuGUI.camerayPos*menuGUI.cameraZoom, menuGUI.camerazPos*menuGUI.cameraZoom);
    // ecriture des proprietes de la camera dans html
   // actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
     camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    /*affichage de la direction en fonction de l'ordonnée dans le tableau */
    //document.getElementById("DirY").value=menuGUI.camerazPos;
   });
   // cote de la direction de la camera dans le menu
   guiCamera.add(menuGUI,"camerazDir",-8,8).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*menuGUI.cameraZoom, menuGUI.camerayPos*menuGUI.cameraZoom, menuGUI.camerazPos*menuGUI.cameraZoom);
    // ecriture des proprietes de la camera dans html
    //actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
     camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    /*affichage de la direction en fonction de la cote dans le tableau */
    //document.getElementById("DirZ").value=menuGUI.camerazPos;
    });



  
    let guiRouge = gui.addFolder("Trajectoire BalleRouge");


    guiRouge.add(menuGUI,"DeplacementRouge",-8,-3).onChange(function(){
       
        // C1.set(-6,-16,-3);
        // C2.set(-7,-24,-3);
        // C3.set(-8,-40,-3);
        // if(BezierTab1)
        //scene.remove(BezierTab1);
        C3.x=menuGUI.DeplacementRouge;
       
        
         cbeBez1 = new THREE.CubicBezierCurve3(C0, C1, C2, C3);

        cbeGeometry1.vertices = cbeBez1.getPoints(20);
        BezierTab1 = new THREE.Line( cbeGeometry1, material );
        //scene.add(BezierTab1);


         
    });

   

    gui.add(menuGUI,'Rectiligne',['Oui','Non']).onChange(function (e) {
      if (e=='Oui') 
        {
                C1.set(-6,-16,-3);
                C2.set(-7,-24,-3);
                C3.set(-8,-40,-3);
                K1.set(6,-16,-3);
                K2.set(7,-24,-3);
                K3.set(8,-40,-3);
                if(BezierTab1)
                  //scene.remove(BezierTab1);
                if (BezierTab2)
                    //scene.remove(BezierTab2);

                cbeBez1 = new THREE.CubicBezierCurve3(C0, C1, C2, C3);
                cbeGeometry1.vertices = cbeBez1.getPoints(20);
                BezierTab1 = new THREE.Line( cbeGeometry1, material );
                //scene.add(BezierTab1);

               cbeBez2 = new THREE.CubicBezierCurve3(K0, K1, K2, K3);
               cbeGeometry2.vertices = cbeBez2.getPoints(20);
               BezierTab2 = new THREE.Line( cbeGeometry2, material );
               //scene.add(BezierTab2);

        }
       else 
         {
               C1.set(-8.24,-10.6,-3);
               C2.set(-8.85,-25.93,-3);
               C3.set(-4,-45,-3);  

               K1.set(8.24,-10.6,-3);
               K2.set(8.85,-25.93,-3);
               K3.set(4,-45,-3);

               if(BezierTab1)
                  //scene.remove(BezierTab1);
               if (BezierTab2)
                    //scene.remove(BezierTab2);

               cbeBez1 = new THREE.CubicBezierCurve3(C0, C1, C2, C3);
               cbeGeometry1.vertices = cbeBez1.getPoints(20);
               BezierTab1 = new THREE.Line( cbeGeometry1, material );
               //scene.add(BezierTab1);

               cbeBez2 = new THREE.CubicBezierCurve3(K0, K1, K2, K3);
               cbeGeometry2.vertices = cbeBez2.getPoints(20);
               BezierTab2 = new THREE.Line( cbeGeometry2, material );
               //scene.add(BezierTab2);
         }
       
        });
        

    let guiBleu = gui.addFolder("Trajectoire BalleBleu");


    guiBleu.add(menuGUI,"DeplacementBleu",3,12).onChange(function(){
       
        // C1.set(-6,-16,-3);
        // C2.set(-7,-24,-3);
        // C3.set(-8,-40,-3);
        // if(BezierTab1)
    
        scene.remove(BezierTab2);

        //K1.x+=menuGUI.DeplacementBleu;
        //K2.x+=menuGUI.DeplacementBleu;
        K3.x=menuGUI.DeplacementBleu;

        

        cbeBez2 = new THREE.CubicBezierCurve3(K0, K1, K2, K3);
        cbeGeometry2.vertices = cbeBez2.getPoints(20);
        BezierTab2 = new THREE.Line( cbeGeometry2, material );
        //scene.add(BezierTab2);


         
    });





 

    gui.add(menuGUI, "actualisation");
    //menuGUI.actualisation();



    









 //********************************************************
 //
 //  F I N     M E N U     G U I
 //
 //********************************************************
 renduAnim();
 
  // definition des fonctions idoines
 function posCamera(){
  camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
  camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
  //actuaPosCameraHTML();
 }

 const PrecisionArrondi=50;
// test si un nombre est nul
 const epsilon = 0.00000001;
 function testZero(x){
  var val=parseFloat(Number(x).toPrecision(PrecisionArrondi));
  if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi))<epsilon) val=0;
  return val;
}

 
 document.getElementById("webgl").appendChild(rendu.domElement);



 
   
  // affichage de la scene
 rendu.render(scene, camera);
  
 
 function reAffichage() {
  setTimeout(function () { 

    posCamera();

  }, 200);// fin setTimeout(function ()
    // render avec requestAnimationFrame
  rendu.render(scene, camera);
 }// fin fonction reAffichage()
 
 
  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }
 
} // fin fonction init()





//********************************************************
 //
 // BIBLIOTHEQUE DES FONCTIONS UTILIES 
 //
 //********************************************************





function change(){
    //if(document.getElementById("boutonRouge").click())
        document.getElementById("boutonRouge").disabled=true;}


function QuilleInit(scene,coef,tabTete,tabMilieu,tabQueue)
{
  for (var j=0 ; j<10 ; j++)
  { 
    
    var  tete = creerTete(scene,nbPtCB,nbePtRot,M3,N1,N2,N3,31,-7*coef)
    if (j==1 || j==2)
        tete = creerTete(scene,nbPtCB,nbePtRot,M3,N1,N2,N3,34,(-2*(j+1)-2)*coef);
    if (j>2 && j<=5)
        tete = creerTete(scene,nbPtCB,nbePtRot,M3,N1,N2,N3,37,((-2*j)+1)*coef);
    if (j>5 && j<=9)
        tete = creerTete(scene,nbPtCB,nbePtRot,M3,N1,N2,N3,40,(-4-(2*(j-6)))*coef);
    scene.add(tete);
    
    tabTete[j]=tete;
  }

  //console.log(tabTete[0].position);

  for (var j=0 ; j<10 ; j++)
  { 
    
    var tronc = creerTronc(scene,nbPtCB,nbePtRot,P3,M1,M2,M3,31,-7*coef)
    if (j==1 || j==2)
        tronc = creerTronc(scene,nbPtCB,nbePtRot,P3,M1,M2,M3,34,(-2*(j+1)-2)*coef);
    if (j>2 && j<=5)
        tronc = creerTronc(scene,nbPtCB,nbePtRot,P3,M1,M2,M3,37,((-2*j)+1)*coef);
    if (j>5 && j<=9)
        tronc = creerTronc(scene,nbPtCB,nbePtRot,P3,M1,M2,M3,40,(-4-(2*(j-6)))*coef);
    scene.add(tronc);
    
    tabMilieu[j]=tronc;
  }

  for (var j=0 ; j<10 ; j++)
  { 
    
    var Queue = creerQueue(scene,nbPtCB,nbePtRot,P0,P1,P2,P3,31,-7*coef)
    if (j==1 || j==2)
        Queue = creerQueue(scene,nbPtCB,nbePtRot,P0,P1,P2,P3,34,(-2*(j+1)-2)*coef);
    if (j>2 && j<=5)
        Queue = creerQueue(scene,nbPtCB,nbePtRot,P0,P1,P2,P3,37,((-2*j)+1)*coef);
    if (j>5 && j<=9)
        Queue = creerQueue(scene,nbPtCB,nbePtRot,P0,P1,P2,P3,40,(-4-(2*(j-6)))*coef);
    scene.add(Queue);
    
    tabQueue[j]=Queue;
  }

}





   // fonction pour creer une balle 

   


   



   // Fonction appelée apres le clic sur bouton  jouer 
   function deplace_BalleRouge(){
        
        let i=0;
        let anim =setInterval(function(){
        
    
            balleRouge.position.set(cbeGeometry1.vertices[i].x,cbeGeometry1.vertices[i].y,cbeGeometry1.vertices[i].z);
            courbeBleue.position.set(cbeGeometry1.vertices[i].x,cbeGeometry1.vertices[i].y,cbeGeometry1.vertices[i].z);
            balleRouge.rotateX(i*2*Math.PI/500);
            courbeBleue.rotateX(i*2*Math.PI/500);
            scene.add(balleRouge,courbeBleue);
            for (let j = 0 ; j<tabQueue1.length ; j++)
            {
                if(detectCollision(balleRouge,tabQueue1[j]))
                {
                    score1+=1;
                    scene.remove(tabQueue1[j],tabMilieu1[j],tabTete1[j]);
                    tabParaRect1[j]= CreerParallelopipede(scene,tabQueue1[j]);
                    tabTete1.splice(j,j);
                    tabMilieu1.splice(j,j);
                    tabQueue1.splice(j,j);


                    
                    

                }
            }
            document.getElementById("Rouge").value=score1;
            
            
             
            if(balleRouge.position.y< -43)
                {
                    clearInterval(anim);
                    scene.remove(balleRouge,courbeBleue);
                    score=0;

                }
            
            i++;

        },50);

    } 



    // Fonction de deplacement de la balle Bleu

       function deplace_BalleBleu(){
        
        let i=0;
        let anim =setInterval(function(){
        
    
            balleBleue.position.set(cbeGeometry2.vertices[i].x,cbeGeometry2.vertices[i].y,cbeGeometry2.vertices[i].z);
            courbeRouge.position.set(cbeGeometry2.vertices[i].x,cbeGeometry2.vertices[i].y,cbeGeometry2.vertices[i].z);
            balleBleue.rotateX(i*2*Math.PI/500);
            courbeRouge.rotateX(i*2*Math.PI/500);
            scene.add(balleBleue,courbeRouge);
            for (let j = 0 ; j<tabQueue2.length ; j++)
            {
                if(detectCollision(balleBleue,tabQueue2[j]))
                {
                    score2+=1;
                    scene.remove(tabQueue2[j],tabMilieu2[j],tabTete2[j]);
                    tabParaRect2[j]  = CreerParallelopipede(scene,tabQueue2[j]);
                    tabTete2.splice(j,j);
                    tabMilieu2.splice(j,j);
                    tabQueue2.splice(j,j);
                   

                }
            }
            
            document.getElementById("Bleu").value=score2;
             
            if(balleBleue.position.y< -43)
                {
                    clearInterval(anim);
                    scene.remove(balleBleue,courbeRouge);
                    
                    
                }
            
            i++;

        },50);

    } 

    function removeParaRect(scene,tabParaRect)
    {
        for(let k=0;k<10;k++)
        {
            if(tabParaRect[k]!=null)
                {
                    scene.remove(tabParaRect[k]);
                    tabParaRect[k]=null;
                }
        }
    }

    





  