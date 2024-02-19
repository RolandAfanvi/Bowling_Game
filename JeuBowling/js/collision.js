function collision(object1,object2){

       let pos1=object1.position.clone();
       let pos2=object2.position.clone();
       let dist = pos1.distanceTo(pos2);

       let long1 = object1.geometry.parameters.height/2;
       let long2 = object2.geometry.parameters.height/2;

       let larg1 = object1.geometry.parameters.width/2;
       let larg2 = object2.geometry.parameters.width/2;  

       if(dist<=(long1+long2) && dist<=(larg1+larg2))
          return true;
       return false;


       

     }

function detectCollision(Object1,Object2)
{

let Bound1 = new THREE.Box3().setFromObject(Object1);

let Bound2= new THREE.Box3().setFromObject(Object2);

return Bound1.intersectsBox(Bound2);
}

     

    function checkTouching(a, d) {
      let b1 = a.position.y - a.geometry.parameters.height / 2;
      let t1 = a.position.y + a.geometry.parameters.height / 2;
      let r1 = a.position.x + a.geometry.parameters.width / 2;
      let l1 = a.position.x - a.geometry.parameters.width / 2;
      let f1 = a.position.z - a.geometry.parameters.depth / 2;
      let B1 = a.position.z + a.geometry.parameters.depth / 2;
      let b2 = d.position.y - d.geometry.parameters.height / 2;
      let t2 = d.position.y + d.geometry.parameters.height / 2;
      let r2 = d.position.x + d.geometry.parameters.width / 2;
      let l2 = d.position.x - d.geometry.parameters.width / 2;
      let f2 = d.position.z - d.geometry.parameters.depth / 2;
      let B2 = d.position.z + d.geometry.parameters.depth / 2;
      if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
        return false;
      }
      return true;
    }
    

    function rt(a,b) {
      let d = [b]; 
      let e = a.position.clone();
      let f = a.geometry.vertices.length;
      let g = a.position;
      let h = a.matrix;
      let i = a.geometry.vertices;
        for (var vertexIndex = f-1; vertexIndex >= 0; vertexIndex--) {      
            let localVertex = i[vertexIndex].clone();
            let globalVertex = localVertex.applyMatrix4(h);
            let directionVector = globalVertex.sub(g);
            
            let ray = new THREE.Raycaster(e,directionVector.clone().normalize());
            let collisionResults = ray.intersectObjects(d);
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) { 
                return true;
        }
        }
     return false;
    }

    function ft(a,b) {
      return rt(a,b)||rt(b,a)||(a.position.z==b.position.z&&a.position.x==b.position.x&&a.position.y==b.position.y)
    }



