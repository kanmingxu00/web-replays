import React, { Component } from 'react';
import './DotaRender.scss';
import * as THREE from 'three';

export default class DotaRender extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let scene = new THREE.Scene();
        let aspectRatio = window.innerWidth / window.innerHeight;
        let nearPlane = 0.1;
        let farPlane = 160;
        let fov = 75;

        let camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
        let renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        //document.body.appendChild(renderer.domElement);
        this.mount.appendChild(renderer.domElement);

        //Mouse variables
        let mouse = new THREE.Vector2();
        let norm_mouse = new THREE.Vector2();
        let prevMouse = new THREE.Vector2();
        let edgePanUp = false;
        let edgePanDown = false;
        let edgePanLeft = false;
        let edgePanRight = false;

        const EDGE_PAN_INCREMENT = 0.05;
        const EDGE_PAN_PADDING = 50;

        function onMouseLeave(event) {
            edgePanLeft = false;
            edgePanRight = false;
            edgePanDown = false;
            edgePanUp = false;
        }

        function onMouseMove(event) {
            prevMouse.x = mouse.x;
            prevMouse.y = mouse.y;

            //Normalized coordinates
            norm_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            norm_mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

            //Screen coordinates
            mouse.x = event.clientX;
            mouse.y = event.clientY;


            //console.log("x: " + mouse.x + " y: " + mouse.y);
            edgePanLeft = (mouse.x <= 1 + EDGE_PAN_PADDING);
            edgePanRight = (mouse.x >= window.innerWidth - EDGE_PAN_PADDING);
            edgePanUp = (mouse.y <= 1 + EDGE_PAN_PADDING);
            edgePanDown = (mouse.y >= window.innerHeight - EDGE_PAN_PADDING);

        }

        let geometry = new THREE.BoxGeometry(15, 15, 15, 1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.z = -5;
        scene.add(cube);
        camera.position.z = 3;
        camera.rotation.x = 20 * Math.PI / 180;

        function render() {
            //camera.rotation.x = 0 * Math.PI / 180;

            requestAnimationFrame(render);
            //cube.rotation.x += 0.01;
            //cube.rotation.y += 0.01;
            //console.log('mouse.x: ' + mouse.x + " mouse.y: " + mouse.y);
            if (edgePanLeft) {
                camera.position.x -= EDGE_PAN_INCREMENT;
            }
            if (edgePanRight) {
                camera.position.x += EDGE_PAN_INCREMENT;
            }
            if (edgePanUp) {
                camera.position.y += EDGE_PAN_INCREMENT;
            }
            if (edgePanDown) {
                camera.position.y -= EDGE_PAN_INCREMENT;
            }



            renderer.render(scene, camera);
        };
        render();



        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseout', onMouseLeave, false);

    }

    render() {
        return (
            <div ref = {ref => (this.mount = ref)}></div>
        )
    }
}