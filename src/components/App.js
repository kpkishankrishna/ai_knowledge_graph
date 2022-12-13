import React from 'react';
import { Route, Switch, Link, useHistory   } from 'react-router-dom';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
import { useState, useRef, useCallback, useEffect } from "react";
import useStyles from './styles';
import SpriteText from 'three-spritetext';
import * as d3 from "d3";
import { CatDogClassifier, StableDiffussion, NavBar } from './';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [{"id": "Machine Learning", "group":4},
            {"id": "AI", "group": 4},
            {"id":"Statistics","group":4},

            {"id": "Recommendation Systems", "group":6},
            {"id": "Deep Learning", "group": 6},
            {"id": "NLP", "group": 6},
            {"id": "Descriptive Statistics", "group": 6},
            {"id": "Inferential Statistics", "group": 6},

            {"id": "Collaborative Filtering", "group":7},
            {"id": "Image Recognition", "group": 7},
            {"id": "Text to Image Converion", "group": 7},
            {"id": "Speech Recognition", "group": 7},

            {"id": "Cat Dog Classifier", "group": 8}, 
            {"id": "Stable Diffussion", "group": 8},
            {"id": "RIT", "group":8},
            {"id": "Whisper openAI", "group":8},],

    links: [{"source": "AI", "target": "Machine Learning", "value": 1},
    {"source": "Statistics", "target": "Machine Learning", "value": 1},
    {"source": "Statistics", "target": "AI", "value": 1},

    {"source": "Statistics", "target": "Descriptive Statistics","value": 1},
    {"source":"Statistics", "target": "Inferential Statistics","value": 1},
    {"source": "Inferential Statistics","target": "RIT","value": 1},

    {"source": "Machine Learning", "target": "Recommendation Systems","value": 1},
    {"source":"Recommendation Systems", "target": "Collaborative Filtering","value": 1},
      
    {"source": "AI", "target": "Deep Learning", "value": 1},
    {"source": "AI", "target": "NLP", "value": 1},
    {"source": "Deep Learning", "target": "Image Recognition","value": 1},
    {"source": "Deep Learning", "target": "Text to Image Converion","value": 1},
    {"source": "Image Recognition","target": "Cat Dog Classifier","value": 1},
    {"source": "Text to Image Converion","target": "Stable Diffussion","value": 1},
    {"source": "NLP","target": "Speech Recognition","value": 1},
    {"source": "Speech Recognition","target": "Whisper openAI","value": 1},

    

            ]
  };
}

const App = () => {
  const classes = useStyles();
  const { useRef } = React;
  const data = genRandomTree();
  // const [clicked, setclicked] = useState()
  let history = useHistory();
  const clickHandler = () =>{
    console.log("clickehandler")
    history.push('/stable_diffussion')
    return;
  }
  const CameraOrbit = () => {
    const fgRef = useRef();
    const handleClick = useCallback((node) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
      console.log(123)
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );


      d3.selectAll("#node-info-container").remove();

      d3.select(".scene-container")
        .append("div")
        .attr("id", "node-info-container")
        .style("color", "white")
        .style("font-size", "24px")
        .style("position", "fixed")
        .style("top", "50%")
        .style("left", "50%")
        .style("transform", "translate(-50%, -50%)")
        .style("padding", "10px")
        .style("border-radius", "10px")
        .style("background-color", "rgba(0,0,0,0.4)");

      d3.select("#node-info-container")
        .append("h3")
        .attr("id", "node-info-title")
        .style("color", "white")
        .style("text-align", "center")
        .text(node.id);

      if (node.group === 8) {
        d3.select("#node-info-container")
          .append("Button")
          .attr("id", "node-info")
          .attr("component", {Link})
          .attr("to", "/cat_dog_classifier")
          .style("color", "inherit")
          .style("font-size", "20px")
          .style("text-align", "center")
          .style("position", "relative")
          .text(`${node.id}`)
          .on("click", clickHandler);
      }
    }, [fgRef]);



    return (
      <>
        <ForceGraph3D
          ref={fgRef}
          graphData={data}
          backgroundColor= "black"  //darkslategrey
          linkColor={() => "white"}
          linkWidth={1}
          inkDirectionalArrowColor={() => "black"}
          // linkMaterial={new THREE.MeshPhongMaterial({color:'black', specular: 0x1c233f, shininess:1, wireframe:false })}
          nodeLabel="id"
          nodeAutoColorBy="group"
          nodeThreeObjectExtend={false}
          nodeThreeObject={node => {
              const sprite = new SpriteText(node.id);
              sprite.color = node.color;
              sprite.textHeight = 8;
              return sprite;
            }}
          onNodeClick={handleClick}
          // onBackgroundClick={removed3}
          // nodeThreeObject={nodeObject1}
        />
        
           {/* {showSnippet && snippetData? 
                <PreviewCard isOpen={showSnippet} deck={{name: title}}
             onClose={closeSnippet} deck_data = {snippetData}>
              </PreviewCard>
      : null}
     </div> */}


      </>
      
    );
    }


  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.constent}>
      <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/">
            <CameraOrbit />
          </Route>
          <Route exact path="/cat_dog_classifier">
            <CatDogClassifier />
          </Route>
          <Route exact path="/stable_diffussion">
           <StableDiffussion />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default App