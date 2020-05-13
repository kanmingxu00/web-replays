import React, { Component } from 'react';
import './DotaRender.scss';
import * as THREE from 'three';

export default class DotaRender extends Component {
    constructor(props) {
        super(props);
        this.windowWidth = this.props.windowWidth;
        this.windowHeight = this.props.windowHeight;

        this.scene = new THREE.Scene();
        this.aspectRatio = this.windowWidth / this.windowHeight;

        const NEARPLANE = 0.1;
        const FARPLANE = 160;
        const FOV = 75;

        this.camera = new THREE.PerspectiveCamera(FOV, this.aspectRatio, NEARPLANE, FARPLANE);
        this.renderer = new THREE.WebGLRenderer();

        //Mouse variables
        this.mouse = new THREE.Vector2();
        this.norm_mouse = new THREE.Vector2();
        this.prevMouse = new THREE.Vector2();
        this.edgePanUp = false;
        this.edgePanDown = false;
        this.edgePanLeft = false;
        this.edgePanRight = false;
        
        this.EDGE_PAN_INCREMENT = 0.05;
        this.EDGE_PAN_PADDING = 50;

        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.render3D = this.render3D.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.windowHeight = nextProps.windowHeight;
        this.windowWidth = nextProps.windowWidth;
    }

    onMouseLeave = (event) => {
        this.edgePanLeft = false;
        this.edgePanRight = false;
        this.edgePanDown = false;
        this.edgePanUp = false;
    }

    onMouseMove = (event) => {
        this.prevMouse.x = this.mouse.x;
        this.prevMouse.y = this.mouse.y;

        //Normalized coordinates
        this.norm_mouse.x = (event.clientX / this.windowWidth) * 2 - 1;
        this.norm_mouse.y = (event.clientY / this.windowHeight) * 2 - 1;

        //Screen coordinates
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;

        //console.log("x: " + mouse.x + " y: " + mouse.y);
        this.edgePanLeft = (this.mouse.x <= 1 + this.EDGE_PAN_PADDING);
        this.edgePanRight = (this.mouse.x >= this.windowWidth - this.EDGE_PAN_PADDING);
        this.edgePanUp = (this.mouse.y <= 1 + this.EDGE_PAN_PADDING);
        this.edgePanDown = (this.mouse.y >= this.windowHeight - this.EDGE_PAN_PADDING);

    }

    render3D = () => {

        this.aspectRatio = this.windowWidth / this.windowHeight;
        this.camera.aspect = this.aspectRatio;
        this.camera.updateProjectionMatrix();
        //console.log(camera.aspect);
        this.renderer.setSize(this.windowWidth, this.windowHeight);
        

        //camera.rotation.x = 0 * Math.PI / 180;

        requestAnimationFrame(this.render3D);
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        //console.log('mouse.x: ' + mouse.x + " mouse.y: " + mouse.y);
        if (this.edgePanLeft) {
            this.camera.position.x -= this.EDGE_PAN_INCREMENT;
        }
        if (this.edgePanRight) {
            this.camera.position.x += this.EDGE_PAN_INCREMENT;
        }
        if (this.edgePanUp) {
            this.camera.position.y += this.EDGE_PAN_INCREMENT;
        }
        if (this.edgePanDown) {
            this.camera.position.y -= this.EDGE_PAN_INCREMENT;
        }


        this.renderer.render(this.scene, this.camera);
    };


    componentDidMount() {

        this.renderer.setSize(this.windowWidth, this.windowHeight);
        //document.body.appendChild(renderer.domElement);
        this.mount.appendChild(this.renderer.domElement);


        let geometry = new THREE.BoxGeometry(15, 15, 15, 1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.z = -5;
        this.scene.add(cube);
        this.camera.position.z = 3;
        this.camera.rotation.x = 20 * Math.PI / 180;


        this.render3D();


        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('mouseout', this.onMouseLeave, false);

    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseout', this.onMouseLeave);
    }

    render() {
        return (
            <div ref = {ref => (this.mount = ref)}></div>
        )
    }
}