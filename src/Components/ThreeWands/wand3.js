import { render } from "@testing-library/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Color, Group, LinearEncoding } from "three";
import '../pages/CreateWand.css'

import Scales from '../../Pictures/ScalesBump.jpeg'

import BumpHoles from '../../Pictures/HolesBump3.jpeg'
import HollyBump from '../../Pictures/hollyBump.jpeg'


const Wand1 = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight , 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
	const light = new THREE.DirectionalLight('white', .9)
	const ambientLight = new THREE.AmbientLight('white', .7)
	scene.add(light,ambientLight)

  const loader = new THREE.TextureLoader();

  const textureLoader = loader.load(Scales)
  const textureLoader2 = loader.load(BumpHoles)
  const textureLoader3 = loader.load(HollyBump)

	
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor('white')
    renderer.setSize( window.innerWidth, window.innerHeight / 2 );
    mountRef.current.appendChild( renderer.domElement );

    // const elderSpecial =()=> { 
    //   const geometry = new THREE.SphereGeometry()
    //   const geometry2 = new THREE.SphereGeometry()
    //   const geometry3 = new THREE.SphereGeometry()
    //   const elder = new THREE.MeshPhongMaterial({color: "red"});
    //   const mesh = new THREE.Mesh(geometry, geometry2, geometry3, elder)
    //   return mesh;
    // }
    const holly = new THREE.MeshPhongMaterial({color: "#272F24", bumpMap:textureLoader3, bumpScale:20});
    const elder = new THREE.MeshStandardMaterial({ color:"#5D492A"});
    const yew = new THREE.MeshPhongMaterial({color: "black"});


    class CustomDragonCurve extends THREE.Curve {
          constructor( scale = 1 ) {
            super();
            this.scale = scale;
           }
          getPoint( t, optionalTarget = new THREE.Vector3() ) {
            const tx = t * 5 + 1 ;
            const ty = Math.sin( 8 * Math.PI * t )/2;
            const tz = Math.cos( 8 * Math.PI * t )/2;
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    
        };
    
    }

    class CustomCurvePhoenix extends THREE.Curve { 
      constructor( scale = 1 ) {
        super();
        this.scale = scale;
       }
      getPoint( t, optionalTarget = new THREE.Vector3()) {
        const tx = t * 3 - -3;
        const ty = Math.sin( 6 * Math.PI * t )/2;
        const tz = Math.cos(5 * Math.PI * t )/2; 
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

      };
    }
    
    const dragonSnake =()=> { 
        const path = new CustomDragonCurve( 3.5 );
        const snakeMaterial = new THREE.MeshStandardMaterial({color: "green",bumpMap:textureLoader, bumpScale:.9, roughness:0, metalness:1, side:THREE.DoubleSide})
        const geometry = new THREE.TubeGeometry( path, 100, 1.5, 40, false );
        const mesh = new THREE.Mesh( geometry, snakeMaterial);

        return mesh;
    }

    const dragonShaft =(userMaterial)=> { 
        const geometry = new THREE.CylinderGeometry( .2, .8, 40, 30);
        const mesh = new THREE.Mesh( geometry, userMaterial);
        mesh.rotation.z = 1.5708
        return mesh;
    }
    // const dragonHandle = (userMaterial) => { 
    //     const geometry = new THREE.CylinderGeometry(0.8, 1.5, 30);
    //     const mesh = new THREE.Mesh(geometry, userMaterial)
    //     mesh.rotation.z = 1.5708
    //     mesh.position.x = 6
    //     return mesh;

    // }
    let wand = new THREE.Group()
    const dragonWand = (userMaterial)=> {
          // const handle = dragonHandle(userMaterial)
          const shaft = dragonShaft(userMaterial);
          const snake = dragonSnake(userMaterial)
          wand.add(shaft, snake)
          scene.add(wand)
    }

    const phoenixSpecialHandle = (userMaterial)=> { 
      const path = new CustomCurvePhoenix(5)
      const geometry = new THREE.TubeGeometry( path, 22, 2, 4, true );
      const mesh = new THREE.Mesh( geometry, userMaterial);
      // mesh.rotation.z = 1.5708
      return mesh;
    }

    const phoenixShaft =(userMaterial)=> { 
      const geometry = new THREE.CylinderGeometry( 0.8, 1.5, 20);
      const mesh = new THREE.Mesh( geometry, userMaterial);
      mesh.rotation.z = 1.5708
      return mesh;
    }




    const phoenixWand = (userMaterial) => { 
      const handle = phoenixSpecialHandle(userMaterial);
      const shaft = phoenixShaft(userMaterial);
      handle.position.x=15 
      handle.position.z = -2.7
      wand.add(handle, shaft)
      scene.add(wand)
    }


    const createSphere = (size) => { 
      const sphere = new THREE.SphereGeometry(.6 + size/7, 50, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({color:"#754804", bumpMap:textureLoader2, bumpScale:1})
      const mesh = new THREE.Mesh(sphere, sphereMaterial)
      // mesh.rotation.z = 1.5708
      // mesh.position.x = 6
      return mesh;
    }

    const unicornSpecial=()=>{ 
  const group = new THREE.Group()
      let xpose = -15;
      for(let i = 0; i < 6; i ++){
        const sphere = createSphere(i)
        sphere.position.x = xpose + (6 * i)
      group.add(sphere)

      }




      
     
      return group;

      
    }
    const unicornHandle =(userMaterial) => { 
      const geometry = new THREE.CylinderGeometry( 0.8, 1.5, 25);
      const mesh = new THREE.Mesh( geometry, userMaterial);
      mesh.rotation.z = 1.5708
      return mesh;
    }

    const unicornShaft =(userMaterial) => { 
      const geometry = new THREE.CylinderGeometry( .2, .8, 40, 30);
      const mesh = new THREE.Mesh( geometry, userMaterial);
      mesh.rotation.z = 1.5708
      return mesh;
    }

   const unicornWand = (userMaterial) => { 
      // const handle = unicornHandle(userMaterial);
      const shaft = unicornShaft(userMaterial);
      const special = unicornSpecial(userMaterial);
      wand.add( shaft, special)
      scene.add(wand)
    }


     unicornWand(holly)

    camera.position.z =40;

    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );

        wand.rotation.x += 0.003;
        wand.rotation.y += 0.003;
        wand.rotation.z += .003;
	  // wand.translateZ(.5);
    }
    animate();


    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener("resize", onWindowResize, false);

    // animate();

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div className="Wand1" ref={mountRef}>

    </div>
  );
}

export default Wand1;