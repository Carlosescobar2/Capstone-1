import { useEffect, useRef } from "react";
import * as THREE from "three";
import '../pages/CreateWand.css'

const Wand1 = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight , 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
	const light = new THREE.DirectionalLight('white', 1)
	const ambientLight = new THREE.AmbientLight('white', .9)
	scene.add(light,ambientLight)
	

    renderer.setSize( window.innerWidth, window.innerHeight / 2 );
    mountRef.current.appendChild( renderer.domElement );
	

	const headWand =(length, bWidth,tWidth)=> { 
	var geometry = new THREE.CylinderGeometry( tWidth, bWidth, length);
	var sphere = new THREE.SphereGeometry()
	var geometry2 = new THREE.SphereGeometry()
	var geometry3 = new THREE.SphereGeometry()
	var sphere = new THREE.SphereGeometry(15,12,16)
	var sphereMaterial = new THREE.MeshBasicMaterial({color: 'red'})
    var material = new THREE.MeshPhongMaterial( { color: 'brown'} );
    var wand = new THREE.Mesh( geometry, material, sphere, geometry2, geometry3 );
	var wandBody = new THREE.Mesh(sphere, sphereMaterial)
	return wand
	}

	let wand = headWand(15, .2, .3 )
	let handle = headWand(1, .5, .7)
	let sphere= headWand(3,.2,.6)
	let geometry2 = headWand(3, .2, .6)
	let geometry3 = headWand(3, .2, .6)
	let wandBody= headWand(5,.1,.5)

	
	// handle.scale.multiplyScalar(1.2);
	handle.position.y= 7.6;
	sphere.position.y=4.5
	geometry2.position.y=2.5
	geometry3.position.y=.5


	
	let mergeWand= new THREE.Group()
	mergeWand.add(wand, handle, sphere, geometry2, geometry3, wandBody)
    scene.add( mergeWand );
    camera.position.z =20;

    var animate = function () {
      requestAnimationFrame( animate );
	  
      mergeWand.rotation.x += 0.03;
      mergeWand.rotation.y += 0.06;
      mergeWand.rotation.z += .03;
	//   mergeWand.translateZ( .1);
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