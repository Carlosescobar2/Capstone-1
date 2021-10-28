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
    
            const tx = t * 3 - 1.5;
            const ty = Math.sin( 5 * Math.PI * t )/2;
            const tz = Math.cos( 5 * Math.PI * t )/2;
    
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    
        }
    
    }
    
    const path = new CustomSinCurve( 10 );
    const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
	var geometry2 = new THREE.CylinderGeometry(8)
    const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, wireframe:true } );
    const mesh = new THREE.Mesh( geometry, material, geometry2 );
    scene.add( mesh );
	

    // const wand2 = (length, bWidth,tWidth, color='brown') => { 
    //     var geometry = new THREE.CylinderGeometry( tWidth, bWidth, length,40);
    //     var geometry2 = new THREE.SphereGeometry();
    //     var material = new THREE.MeshPhongMaterial( { color: color} );
    //     var wand = new THREE.Mesh( geometry, material, geometry2 );

    //     return wand;
    // }
    // let wand = wand2(15, .1, .3);
    // let geometry = wand2(1, .1, 1 );
    // let geometry2 = wand2()



    // let mergeWand = new THREE.Group()
    // mergeWand.add(wand, geometry, geometry2)
    // scene.add(mergeWand)

    camera.position.z =60;

    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );



      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.003;
      mesh.rotation.z += .003;
	//   mesh.translateZ( 1);
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