import { render } from "@testing-library/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import '../pages/CreateWand.css'

const Wand1 = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight , 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
	const light = new THREE.DirectionalLight('white', .2)
	const ambientLight = new THREE.AmbientLight('white', .9)
	scene.add(light,ambientLight)
	
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor('white')
    renderer.setSize( window.innerWidth, window.innerHeight / 2);
    mountRef.current.appendChild( renderer.domElement );
	

	const headWand =(length, bWidth,tWidth, color='brown')=> { 
	var geometry = new THREE.CylinderGeometry( tWidth, bWidth, length,40);
	var sphere = new THREE.SphereGeometry()
	var geometry2 = new THREE.SphereGeometry()
	var geometry3 = new THREE.SphereGeometry()
    var material = new THREE.MeshPhongMaterial( { color: color} );
    var wand = new THREE.Mesh( geometry, material, sphere, geometry2, geometry3 );
	// var wandBody = new THREE.Mesh(sphere, sphereMaterial)
	return wand
	}
//rgb(133, 94, 66)
	let wand = headWand(15, .1, .3, "#663300") 
	let handle = headWand(1, .5, .5, "black")
	let sphere= headWand(3,.2,.5, "rgb(133, 94, 66)")
	let geometry2 = headWand(3, .1, .5, "black")
	let geometry3 = headWand(2, .1, .5, "rgb(133, 94, 66)")
	let wandBody= headWand(5,.1,.5, "#663300")

	
	// handle.scale.multiplyScalar(1.2);
	handle.position.y= 7.6;
	sphere.position.y=4.5
	geometry2.position.y=2.5
	geometry3.position.y=.1


	
	let mergeWand= new THREE.Group()
	mergeWand.add(wand, handle, sphere, geometry2, geometry3, wandBody)
    scene.add( mergeWand );
    camera.position.z =20;

    var animate = function () {
      requestAnimationFrame( animate );
	  
      mergeWand.rotation.x += 0.003;
      mergeWand.rotation.y += 0.003;
      mergeWand.rotation.z += .003;
	  // mergeWand.translateZ( 1.5);
      renderer.render( scene, camera );
    }

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div className="Wand1" ref={mountRef}>

    </div>
  );
}

export default Wand1;