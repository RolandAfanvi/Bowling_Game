function creerBalle(R,coul){

     let sphereGeom = new THREE.SphereGeometry(R, 160, 60);
     let MaterialPhong = new THREE.MeshPhongMaterial({
       color: coul,
       opacity: 0.5,
       transparent: false,
       wireframe: false,
       emissive:0x000000,
       specular:"#000000", 
       flatShading: false,
       shininess:0,//brillance
       side: THREE.DoubleSide,
     });
     // definition des primitives
     let spherePhong = new THREE.Mesh(sphereGeom, MaterialPhong);
     spherePhong.castShadow = false;
     spherePhong.receiveShadow = false;
      // ajout des primitives dans la scene
      spherePhong.translateZ(-3);
      return spherePhong;
     //scene.add(spherePhong);

   }



   // Fonction pour creer la courbe de la balle de tennis 

   function courbe_balle(R,nb,epaiCbe,coul){
     let points = new Array(nb+1);
     let a = 0.75 * R; 
     let b = R-a;
     for(var k=0;k<=nb;k++){
        let t2=k/nb*2*Math.PI; 
        //t2=t2.toPrecision(PrecisionArrondi);
        let x0,y0,z0;
        with(Math){
            x0=a*cos(t2)+b*cos(3.*t2);
            y0=a*sin(t2)-b*sin(3.*t2);
            z0=2.*sqrt(a*b)*sin(2.*t2);
            }
        points[k] = new THREE.Vector3(x0,y0,z0);
        }
    let PtsCbePara = new THREE.BufferGeometry().setFromPoints(points);
    let ProprieteCbe = new THREE.LineBasicMaterial( { 
      color:coul,
      linewidth:epaiCbe   
     } );
    let courbePara = new THREE.Line( PtsCbePara, ProprieteCbe );
     //scene.add(courbePara);
     courbePara.translateZ(-3);
     return courbePara;
   }



   function CreerParallelopipede(scene,object1){
            let largeur=1;
            let hauteur =0.5;
            let profondeur =2;
            let largSegments=10;
            let hautSegments=10;
            let profSegments=10;
            let BoiteGeom = new THREE.BoxGeometry(largeur,hauteur,profondeur,largSegments,hautSegments,profSegments);
            let Materiau = new THREE.MeshBasicMaterial({color: "#FFFFFF" });
            let ParaRect = new THREE.Mesh(BoiteGeom,Materiau);

            ParaRect.position.set(object1.position.x,object1.position.y,object1.position.z);
            scene.add(ParaRect);
            return ParaRect;
        }


