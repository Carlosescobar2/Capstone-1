import { render } from "@testing-library/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Color, Group, LinearEncoding } from "three";
import '../pages/CreateWand.css'

import Scales from '../../Pictures/ScalesBump.jpeg'

import BumpHoles from '../../Pictures/HolesBump3.jpeg'
import HollyBump from '../../Pictures/hollyBump.jpeg'
import PhoenixTech from '../../Pictures/chromashaderchange.jpeg'
import Bricked from '../../Pictures/brickTech.jpeg'



export const Wand1 = ({wandType, setwandType, wandMaterial, setwandMaterial}) => {



  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight , 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    // const controls = new OrbitControls(camera, renderer.domElement)

    const light = new THREE.DirectionalLight('white', .9)
    const ambientLight = new THREE.AmbientLight('white', .7)
    scene.add(light,ambientLight)
    
    // camera.position.set( 0, 20, 100 );
    // controls.update();
  
    
    const loader = new THREE.TextureLoader();
    
    const textureLoader = loader.load(Scales)
    const textureLoader2 = loader.load(BumpHoles)
    const textureLoader3 = loader.load(HollyBump)
    const textureLoader4 = loader.load(PhoenixTech)
    const textureLoader5 = loader.load(Bricked)
    
    
    
    
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor('white')
    renderer.setSize( window.innerWidth, window.innerHeight / 2 );
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild( renderer.domElement );
    
    // const elderSpecial =()=> { 
      //   const geometry = new THREE.SphereGeometry()
      //   const geometry2 = new THREE.SphereGeometry()
      //   const geometry3 = new THREE.SphereGeometry()
    //   const elder = new THREE.MeshPhongMaterial({color: "red"});
    //   const mesh = new THREE.Mesh(geometry, geometry2, geometry3, elder)
    //   return mesh;
    // }
    const holly = new THREE.MeshPhongMaterial({color: "#7C7C7C", bumpMap:textureLoader3, bumpScale:20, side:THREE.DoubleSide});
    const elder = new THREE.MeshStandardMaterial({ color:"#5D492A", bumpMap:textureLoader5, side:THREE.DoubleSide});
    const yew = new THREE.MeshPhongMaterial({color: "#815931", bumpMap:textureLoader4, bumpScale:1, side:THREE.DoubleSide});


    class CustomDragonCurve extends THREE.Curve {
          constructor( scale = 1 ) {
            super();
            this.scale = scale;
           }
          getPoint( t, optionalTarget = new THREE.Vector3() ) {
            const tx = t * 5 + 1   ;
            const ty = Math.sin( 8  * Math.PI * t )/2;
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
        const tx = t * 4 - -3;
        const ty = Math.sin( 2 * Math.PI * t )/2;
        const tz = Math.sin(1 * Math.PI * t )/2; 
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
      const geometry = new THREE.TubeGeometry( path, 22, 2, 40, false );
      const mesh = new THREE.Mesh( geometry, userMaterial);
      // mesh.rotation.z = 1.5708
      return mesh;
    }

    const phoenixShaft =(userMaterial)=> { 
      const geometry = new THREE.CylinderGeometry( .8, 1.2, 30,);
      const mesh = new THREE.Mesh( geometry, userMaterial);
      mesh.rotation.z = 1.5708
      return mesh;
    }




    const phoenixWand = (userMaterial) => { 
      const handle = phoenixSpecialHandle(userMaterial);
      const shaft = phoenixShaft(userMaterial);
      handle.position.x=-10
      handle.position.z = -2.7
      shaft.position.x=-7.6;
      shaft.position.z = -2.7
      shaft.position.y = 1

      

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

    if (wandType === 'dragon') {
      dragonWand(eval(wandMaterial))
    } else if (wandType === 'phoenix'){ 
      phoenixWand(eval(wandMaterial))
    } else if(wandType === 'unicorn'){ 
      unicornWand(eval(wandMaterial))
    }

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
  }, [wandMaterial, wandType]);

  return (
    <div className="Wand1" ref={mountRef}>

    </div>
  );
}

export default Wand1;
