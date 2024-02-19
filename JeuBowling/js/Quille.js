
function creerTete(scene,nbPtCB,nbePtRot,M3,N1,N2,N3,devant,gauche_droite){

        let tabP3= new Array(4);
        for (let k=0;k<tabP3.length;k++){
           tabP3[k]= new THREE.Vector3(0,0,0);
         }
         tabP3[0]=M3;
         tabP3[1]=N1;
         tabP3[2]=N2;
         tabP3[3]=N3;

        let lathe3 = latheBezTab(scene,nbPtCB,nbePtRot,tabP3,"#FFFFFF",0.95,false);
        lathe3.rotateX(Math.PI/2);
        lathe3.translateZ(devant);
         lathe3.translateX(gauche_droite);
         lathe3.translateY(-4);
        
        return lathe3;

    }


    function creerTronc(scene,nbPtCB,nbePtRot,P3,M1,M2,M3,devant,gauche_droite){

        let tabP2= new Array(4);
        for (let k=0;k<tabP2.length;k++){
           tabP2[k]= new THREE.Vector3(0,0,0);
         }

         tabP2[0]=P3;
         tabP2[1]=M1;
         tabP2[2]=M2;
         tabP2[3]=M3;

        let lathe2 = latheBezTab(scene,nbPtCB,nbePtRot,tabP2,"#FF0000",0.95,false);
        lathe2.rotateX(Math.PI/2);
        lathe2.translateZ(devant);
         lathe2.translateX(gauche_droite);
         lathe2.translateY(-4);
        return lathe2;
        
    }


    function creerQueue(scene,nbPtCB,nbePtRot,P0,P1,P2,P3,devant,gauche_droite){

        let tabP= new Array(4);
        for (let k=0;k<tabP.length;k++){
           tabP[k]= new THREE.Vector3(0,0,0);
         }
         tabP[0]=P0;
         tabP[1]=P1;
         tabP[2]=P2;
         tabP[3]=P3;

         let lathe1 = latheBezTab(scene,nbPtCB,nbePtRot,tabP,"#FFFFFF",0.95,false);
        //let lathe1 = latheBez3(nbPtCB,nbePtRot,P0,P1,P2,P3,"#884400",1,false);
        lathe1.rotateX(Math.PI/2);
        lathe1.translateZ(devant);
         lathe1.translateX(gauche_droite);
         lathe1.translateY(-4);
        return lathe1;
    }


    function creerQuille(scene,devant,gauche_droite) {

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
        let tete=creerTete(scene,nbPtCB,nbePtRot,M3,N1,N2,N3,devant,gauche_droite);
        let tronc=creerTronc(scene,nbPtCB,nbePtRot,P3,M1,M2,M3,devant,gauche_droite);
        let queue=creerQueue(scene,nbPtCB,nbePtRot,P0,P1,P2,P3,devant,gauche_droite);
        
        let quille = new THREE.Group();
        quille.add(tete,tronc,queue);

        //quille.position.set(px,py,pz);
        //scene.add(quille);

       
        return quille;

    }


//FONCTION POUR SUPPRIMER

    function SupprimerQuille(scene,tabTete,tabMilieu,tabQueue){

    	for(let j = 0 ; j<tabQueue.length ; j++)
    	{
    		scene.remove(tabTete[j],tabMilieu[j],tabQueue[j]);
    		
    	}

    }


















