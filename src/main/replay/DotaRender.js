import React, { Component } from 'react';
import './DotaRender.scss';
import * as THREE from 'three';

export default class DotaRender extends Component {
    constructor(props) {
        super(props);
        this.windowWidth = this.props.windowWidth;
        this.windowHeight = this.props.windowHeight;
    }

    componentWillReceiveProps(nextProps) {
        this.windowHeight = nextProps.windowHeight;
        this.windowWidth = nextProps.windowWidth;
    }


    componentDidMount() {

        let scene = new THREE.Scene();
        let aspectRatio = this.windowWidth / this.windowHeight;
        
        let nearPlane = 0.1;
        let farPlane = 160;
        let fov = 75;

        let camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
        let renderer = new THREE.WebGLRenderer();

        //this.renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setSize(this.windowWidth, this.windowHeight);
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
            norm_mouse.x = (event.clientX / this.windowWidth) * 2 - 1;
            norm_mouse.y = (event.clientY / this.windowHeight) * 2 - 1;

            //Screen coordinates
            mouse.x = event.clientX;
            mouse.y = event.clientY;


            //console.log("x: " + mouse.x + " y: " + mouse.y);
            edgePanLeft = (mouse.x <= 1 + EDGE_PAN_PADDING);
            edgePanRight = (mouse.x >= this.windowWidth - EDGE_PAN_PADDING);
            edgePanUp = (mouse.y <= 1 + EDGE_PAN_PADDING);
            edgePanDown = (mouse.y >= this.windowHeight - EDGE_PAN_PADDING);

        }

        let geometry = new THREE.BoxGeometry(15, 15, 15, 1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.z = -5;
        scene.add(cube);
        camera.position.z = 3;
        camera.rotation.x = 20 * Math.PI / 180;


        

        

        //function render() {
        const render3D = () => {

            aspectRatio = this.windowWidth / this.windowHeight;
            camera.aspect = aspectRatio;
            camera.updateProjectionMatrix();
            //console.log(camera.aspect);
            renderer.setSize(this.windowWidth, this.windowHeight);
            

            //camera.rotation.x = 0 * Math.PI / 180;

            requestAnimationFrame(render3D);
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
        //???
        this.render3D = render3D;
        this.render3D = this.render3D.bind(this);

        this.render3D();



        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseout', onMouseLeave, false);

    }

    componentWillUnmount() {
        //window.removeEventListener('mousemove');
        //window.removeEventListener('mouseout');
    }

    render() {
        return (
            <div ref = {ref => (this.mount = ref)}></div>
        )
    }
}