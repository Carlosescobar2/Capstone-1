import { render } from "@testing-library/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import '../pages/CreateWand.css'

const Wand1 = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight , 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
	const light = new THREE.DirectionalLight('white', .2)
	const ambientLight = new THREE.AmbientLight('white', .4)
	scene.add(light,ambientLight)
	
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor('white')
    renderer.setSize( window.innerWidth, window.innerHeight / 2 );
    mountRef.current.appendChild( renderer.domElement );

    

    class CustomSinCurve extends THREE.Curve {

        constructor( scale = 1 ) {
    
            super();
    
            this.scale = scale;
    
        }
    
        getPoint( t, optionalTarget = new THREE.Vector3() ) {
    
            const tx = t * 4 - 1.5;
            const ty = Math.sin( 5 * Math.PI * t )/2;
            const tz = Math.cos( 5 * Math.PI * t )/2;
    
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    
        };
    
    }
    
    const createSnake =()=> { 
        const path = new CustomSinCurve( 3.5 );
        const geometry = new THREE.TubeGeometry( path, 22, 2, 4, false );
        const material = new THREE.MeshPhongMaterial({color: "#794008"});
        const mesh = new THREE.Mesh( geometry, material);
        mesh.position.y=1;
        mesh.position.x=15;

        return mesh;
    }

    const createWand =()=> { 
        const geometry = new THREE.CylinderGeometry( 0.8, 1.5, 25);
        const material = new THREE.MeshPhongMaterial( { color: 'brown', wireframe:false } );
        const mesh = new THREE.Mesh( geometry, material);
        mesh.rotation.z = 1.5708
        return mesh;
    }
    const createhandle = () => { 
        const geometry = new THREE.CylinderGeometry(0.8, 1.5, 30);
        const material = new THREE.MeshPhongMaterial({color: "gold" , wireframe: false});
        const mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.z = 1.5708
        mesh.position.x = 6
        return mesh;

    }


    let snake = createSnake();
    let wand = createWand();
    let handle = createhandle();
    let mergeSnake= new THREE.Group();

    mergeSnake.add(snake, wand, handle)
    scene.add( mergeSnake);


    camera.position.z =40;

    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );

    //     mergeSnake.rotation.x += 0.003;
    //     mergeSnake.rotation.y += 0.003;
    //     mergeSnake.rotation.z += .003;
	  // mergeSnake.translateZ(.5);
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