import React from "react";
import { render } from "react-dom";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import './editor.css';
import Image0 from '../../assets/oct2.jpg'
import Image1 from '../../assets/oct.png'
import Image2 from '../../assets/mask.png'
import Image3 from '../../assets/left-arrow.png'
import Image4 from '../../assets/right-arrow.png'
import { VscColorMode } from "react-icons/vsc";
import { MdOutlineZoomIn } from "react-icons/md";
import { Tooltip, Button, ButtonGroup } from "@mui/material";
import { IoMdMove } from "react-icons/io";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BsArrowDownLeft } from "react-icons/bs";
import { PiTextT } from "react-icons/pi";
import { TfiPencil } from "react-icons/tfi";
import { FaRuler } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { LuCircle } from "react-icons/lu";
import { ImScissors } from "react-icons/im";
import { TbRectangle } from "react-icons/tb";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { GrPowerReset } from "react-icons/gr";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

const imageId1 = "https://cdn.jsdelivr.net/gh/Hashir789/hashir@main/105new_010_Normal.jpg";
const imageId2 = "https://cdn.jsdelivr.net/gh/Hashir789/hashir@main/oct.png";
const imageId3 = "https://cdn.jsdelivr.net/gh/Hashir789/hashir@main/mask.png";

const images = [imageId1, imageId2, imageId3]

const buttonStyle = {
  backgroundColor: '#10a36e',
  color: 'white',
};

const layers = [
    {imagee: Image0, caption: '1 Channel Image'},
    {imagee: Image1, caption: '3 Channel Image'},
    {imagee: Image2, caption: 'Segmented Image'}
]

class CornerstoneElement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stack: props.stack,
        section: 0,
        currentImage: 0,
        viewport: cornerstone.getDefaultViewport(null, undefined),
        imageId: props.stack.imageIds[0],
        rotate: 0,
        list: [0, 0, 0, 0, 0, 0],
        layers: []
      };
  
      this.onImageRendered = this.onImageRendered.bind(this);
      this.onNewImage = this.onNewImage.bind(this);
      this.onWindowResize = this.onWindowResize.bind(this);
      this.updateImage = this.updateImage.bind(this);
    }
  
    render() {
      const gallery = [
        {id: 3, text1: 'Ww/wc', text2: `${String(this.state.viewport.voi.windowWidth).substr(0, 6)}/${String(this.state.viewport.voi.windowCenter).substr(0, 6)}`, func1: (e)=>{ const inputValue = parseFloat(document.getElementById('myInput3').value); const inputValue2 = parseFloat(document.getElementById('myInput32').value); const element = this.element; const viewport = cornerstone.getViewport(element); viewport.voi.windowCenter = inputValue2; viewport.voi.windowWidth = inputValue; cornerstone.setViewport(element, viewport); e.preventDefault();}, func2: (e)=>{ const element = this.element; const viewport = cornerstone.getViewport(element); viewport.voi.windowWidth = 255; viewport.voi.windowCenter = 128; cornerstone.setViewport(element, viewport); e.preventDefault();}},
        {id: 1, text1: 'Zoom', text2: this.state.viewport.scale.toFixed(2), func1: (e)=>{ const inputValue = parseFloat(document.getElementById('myInput1').value); const element = this.element; const viewport = cornerstone.getViewport(element); viewport.scale = inputValue; cornerstone.setViewport(element, viewport); e.preventDefault();}, func2: (e)=>{ const element = this.element; const viewport = cornerstone.getViewport(element); viewport.scale = 1; cornerstone.setViewport(element, viewport); e.preventDefault();}},
        {id: 2, text1: 'Rotate', text2: this.state.viewport.rotation.toFixed(2), func1: (e)=>{ const inputValue = parseFloat(document.getElementById('myInput2').value); const element = this.element; const viewport = cornerstone.getViewport(element); viewport.rotation = inputValue; cornerstone.setViewport(element, viewport); e.preventDefault();}, func2: (e)=>{ const element = this.element; const viewport = cornerstone.getViewport(element); console.log(viewport); viewport.rotation = 0; cornerstone.setViewport(element, viewport); e.preventDefault();}},
        {id: 4, text1: 'Pan', text2: `(${this.state.viewport.translation.x.toFixed(2)}, ${this.state.viewport.translation.y.toFixed(2)})`, func1: (e)=>{ const inputValue = parseFloat(document.getElementById('myInput4').value); const inputValue2 = parseFloat(document.getElementById('myInput42').value); const element = this.element; const viewport = cornerstone.getViewport(element); viewport.translation.x = inputValue; viewport.translation.y = inputValue2; cornerstone.setViewport(element, viewport); e.preventDefault();}, func2: (e)=>{ const element = this.element; const viewport = cornerstone.getViewport(element); console.log(viewport); viewport.translation.x = 0; viewport.translation.y = 0; cornerstone.setViewport(element, viewport); e.preventDefault();}},
      ]
      return (
        <div className="container">
            <div className="subContainer1">
                <div className="subContainer1-title">Gallery</div>
                {layers.map((layer, index) => (
                    <div key={index} className="image" onClick={()=>{ 
                        this.setState({ currentImage: index });
                        this.updateImage(index);
                    }}>
                    <img src={layer.imagee} alt="" width="85%" style={{ borderRadius: '10px', border: this.state.currentImage===index?'4px solid #10a36e':'none' }} />
                    <div className="image-caption">{layer.caption}</div>
                    </div>
                ))}
            </div>
            <div className="subContainer2">
                <div className="subContainer2Div">
                    <div
                        className="subContainer21"
                        ref={input => {
                        this.element = input;
                        }}
                    >
                        <canvas className="cornerstone-canvas" id="cornerstone-canvas"/>
                    </div>
                </div>
                <div className="subContainer22">
                    <div className="subContainer221">
                        <div className="leftButton" style={{cursor: this.state.section!==0?'pointer':'not-allowed'}} onClick={()=>{
                            if (this.state.section <= -1) {
                                const subToolbarElement = document.getElementById('subToolbar');
                                subToolbarElement.style.left = `${(this.state.section + 1) * 100}%`;
                                this.setState({ section: this.state.section + 1 })
                            }
                        }}><img src={Image3} alt=''/></div>
                        <div className="toolbar" >
                            <div id="subToolbar" >
                              <div className="subToolbar1">
                                <div className="subToolbar1-heading">General</div>
                                <div className="subToolbar1-body">
                                  <ButtonGroup variant="contained" aria-label="outlined primary button group" color='success'>
                                    <Tooltip title="Wwwc" arrow>
                                        <Button style={buttonStyle} onClick={()=>{
                                            const WwwcTool = cornerstoneTools.WwwcTool;
                                            cornerstoneTools.addTool(WwwcTool);
                                            cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
                                        }}><VscColorMode style={{fontSize: '24px'}}/></Button>
                                    </Tooltip>
                                    <Tooltip title="Zoom In" arrow>
                                      <Button style={buttonStyle} onClick={()=>{
                                        cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
                                            configuration: {
                                                invert: false,
                                                preventZoomOutsideImage: false,
                                                minScale: .1,
                                                maxScale: 20.0,
                                            }
                                            });
                                            cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 })
                                        }}><MdOutlineZoomIn style={{fontSize: '30px'}}/></Button>
                                    </Tooltip>
                                    <Tooltip title="Pan" arrow>
                                      <Button style={buttonStyle} onClick={()=>{
                                        const PanTool = cornerstoneTools.PanTool;
                                        cornerstoneTools.addTool(PanTool)
                                        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 })
                                      }}><IoMdMove style={{fontSize: '26px'}}/></Button>
                                    </Tooltip>
                                    <Tooltip title="Magnify" arrow>
                                      <Button style={buttonStyle} onClick={()=>{
                                        const MagnifyTool = cornerstoneTools.MagnifyTool;
                                        cornerstoneTools.addTool(MagnifyTool)
                                        cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 })
                                      }}><PiMagnifyingGlassFill style={{fontSize: '26px'}}/></Button>
                                    </Tooltip>
                                    <Tooltip title="Rotate" arrow>
                                      <Button style={buttonStyle} 
                                      onClick={()=>{
                                        const RotateTool = cornerstoneTools.RotateTool;
                                        cornerstoneTools.addTool(RotateTool)
                                        cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 })
                                      }}><FaArrowRotateLeft style={{fontSize: '20px'}}/></Button>
                                    </Tooltip>                     
                                  </ButtonGroup>
                                </div>
                              </div>
                              <div className="subToolbar2">
                                <div className="subToolbar1-heading">Annotation</div>
                                <div className="subToolbar1-body">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='success'>
                                        <Tooltip title="Arrow Annotate" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
                                                cornerstoneTools.addTool(ArrowAnnotateTool)
                                                cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 })
                                            }}><BsArrowDownLeft style={{fontSize: '24px'}}/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Text Marker" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const TextMarkerTool = cornerstoneTools.TextMarkerTool
                                                const configuration = {
                                                markers: ['My', 'name', 'is', 'Muhammad', 'Hashir', 'Malik'],
                                                current: 'My',
                                                ascending: true,
                                                loop: true,
                                                }
                                                cornerstoneTools.addTool(TextMarkerTool, { configuration })
                                                cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 })
                                            }}><PiTextT style={{fontSize: '26px'}}/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Freehand Roi" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const FreehandRoiTool = cornerstoneTools.FreehandRoiTool;
                                                cornerstoneTools.addTool(FreehandRoiTool)
                                                cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 })
                                            }}><TfiPencil style={{fontSize: '22px'}}/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Length" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const LengthTool = cornerstoneTools.LengthTool;
                                                cornerstoneTools.addTool(LengthTool)
                                                cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 })
                                            }}><FaRuler style={{fontSize: '26px'}}/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Rectangular Roi" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
                                                cornerstoneTools.addTool(RectangleRoiTool)
                                                cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 })
                                            }}><LuRectangleHorizontal style={{fontSize: '20px'}}/>
                                            </Button>
                                        </Tooltip>  
                                        <Tooltip title="Elliptical Roi" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
                                                cornerstoneTools.addTool(EllipticalRoiTool)
                                                cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 })
                                            }}><LuCircle style={{fontSize: '20px'}}/>
                                            </Button>
                                        </Tooltip>                     
                                    </ButtonGroup>
                                </div>
                              </div>
                              <div className="subToolbar3">
                                <div className="subToolbar1-heading">Segmentation</div>
                                <div className="subToolbar1-body">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='success'>
                                        <Tooltip title="Circle Scissors" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const CircleScissorsTool = cornerstoneTools.CircleScissorsTool;
                                                cornerstoneTools.addTool(CircleScissorsTool)
                                                cornerstoneTools.setToolActive('CircleScissors', { mouseButtonMask: 1 })
                                            }}><LuCircle style={{fontSize: '20px'}}/></Button>
                                        </Tooltip>
                                        <Tooltip title="Freehand Scissors" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const FreehandScissorsTool = cornerstoneTools.FreehandScissorsTool;
                                                cornerstoneTools.addTool(FreehandScissorsTool)
                                                cornerstoneTools.setToolActive('FreehandScissors', { mouseButtonMask: 1 })
                                            }}><ImScissors style={{fontSize: '20px'}}/></Button>
                                        </Tooltip>
                                        <Tooltip title="Rectangular Scissors" arrow>
                                            <Button style={buttonStyle} onClick={()=>{
                                                const RectangleScissorsTool = cornerstoneTools.RectangleScissorsTool;
                                                cornerstoneTools.addTool(RectangleScissorsTool)
                                                cornerstoneTools.setToolActive('RectangleScissors', { mouseButtonMask: 1 })
                                            }}><TbRectangle style={{fontSize: '24px'}}/></Button>
                                        </Tooltip>                     
                                    </ButtonGroup>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="rightButton" style={{cursor: this.state.section!==-2?'pointer':'not-allowed'}} onClick={()=>{
                          if (this.state.section >= -1) {
                            const subToolbarElement = document.getElementById('subToolbar');
                            subToolbarElement.style.left = `${(this.state.section - 1) * 100}%`;
                            this.setState({ section: this.state.section - 1 });                          
                          }
                        }}><img src={Image4} alt=''/></div>
                    </div>
                </div>
            </div>
            <div className="subContainer3">
              <div className="subContainer3-heading">Layers</div>
                {gallery.map((item, index) => (<div key={index} className="box" style={{height: this.state.rotate===item.id?110:45 , transition: 'all 0.3s ease', marginTop: '10px'}}>
                <div className="box1">
                  <div className="box1-frontDisplay">
                    <div className="box1-name">{item.text1}: {item.text2}</div>
                    <div className="box1-icon"><MdOutlineArrowDropDown style={{fontSize: '24px', cursor: 'pointer', transform: `rotate(${this.state.rotate===item.id?180:0}deg)`, transition: 'all 0.3s ease'}} onClick={()=>{
                      this.setState({ rotate: this.state.rotate===item.id?0:item.id });
                    }}/></div>
                  </div>
                  <div style={{paddingRight: '10px', paddingLeft: '10px'}}><hr/></div>
                  <div className="inputt" style={{paddingRight: '10px', paddingDown: '10px', paddingLeft: '10px', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <input type="number" id={`myInput${item.id}`} name="myInput" style={{height: '35px', padding: '10px', width: !(item.id===1||item.id===2)?'30%':'60%'}}/>
                    {!(item.id===1||item.id===2) && <input type="number" id={`myInput${item.id}2`} name="myInput" style={{height: '35px', padding: '10px', width: !(item.id===1||item.id===2)?'30%':'60%'}}/>}
                    <ButtonGroup variant="contained" style={{height: '35px', width: '40%', backgroundColor: 'white'}} aria-label="outlined primary button group" color='success'>
                      <Tooltip title="Apply" arrow>
                          <Button style={{color: 'white', backgroundColor: '#10a36e', padding: 0, borderRadius: 0, width: '50%'}}><TiTick style={{fontSize: '20px'}} onClick={item.func1}/></Button>
                      </Tooltip>
                      <Tooltip title="Reset" arrow>
                          <Button style={{color: 'white', backgroundColor: '#10a36e', padding: 0, display: 'flex', width: '50%', alignItems: 'center', justifyContent: 'center'}} onClick={item.func2}><GrPowerReset style={{fontSize: '16px'}}/></Button>
                      </Tooltip>                     
                    </ButtonGroup>
                  </div>
                </div>
              </div>))}
              <div style={{padding: '10px'}}><hr/></div>
              {this.state.layers.map((item, index) => (item.name.substr(0,12)==='Freehand Roi'?<div className='box' style={{paddingBottom: '10px', height: this.state.rotate===5+index?`${45*(item.points.length)}px`:55 , transition: 'all 0.3s ease'}}><div className='box1'><div className="box1-frontDisplay"><div className="box1-name">{item.name}</div><div className="box1-icon"><MdOutlineArrowDropDown style={{fontSize: '24px', cursor: 'pointer', transform: `rotate(${this.state.rotate===5+index?180:0}deg)`, transition: 'all 0.3s ease'}} onClick={()=>{ this.setState({ rotate: this.state.rotate===5+index?0:5+index }); }}/></div></div>
              {item.points.map((itam, indexx) => (<div style={{margin: '10px', height: '20px'}}>{indexx+1}. {(String(itam[0])).substr(0, 6)}, {(String(itam[1])).substr(0, 6)}</div>))}
              </div></div>:
              <div className='box' style={{paddingBottom: '10px', height: this.state.rotate===5+index?115:55 , transition: 'all 0.3s ease'}}><div className='box1'><div className="box1-frontDisplay"><div className="box1-name">{item.name}</div><div className="box1-icon"><MdOutlineArrowDropDown style={{fontSize: '24px', cursor: 'pointer', transform: `rotate(${this.state.rotate===5+index?180:0}deg)`, transition: 'all 0.3s ease'}} onClick={()=>{ this.setState({ rotate: this.state.rotate===5+index?0:5+index }); }}/></div></div>
              <div style={{margin: '10px', height: '20px'}}>Start: {(String(item.points[0])).substr(0, 6)}, {(String(item.points[1])).substr(0, 6)}</div>
              {item.name.substr(0,11)!=='Text Marker'?<div style={{margin: '10px', height: '20px'}}>End: {(String(item.points[2])).substr(0, 6)}, {(String(item.points[3])).substr(0, 6)}</div>:''}
              </div></div>
              ))}
            </div>
        </div>
      );
    }
  
    onWindowResize() {
      cornerstone.resize(this.element);
    }
  
    onImageRendered() {
      const viewport = cornerstone.getViewport(this.element);
      this.setState({
        viewport
      });
    }

    onNewImage() {
      const enabledElement = cornerstone.getEnabledElement(this.element);
  
      this.setState({
        imageId: enabledElement.image.imageId
      });
    }
  
    componentDidMount() {
      const element = this.element;
  
      // Enable the DOM Element for use with Cornerstone
      cornerstoneTools.init();
      cornerstone.enable(element);
  
      // Load the first image in the stack
      cornerstone.loadImage(this.state.imageId).then(image => {
        // Display the first image
        cornerstone.displayImage(element, image);
        // Add the stack tool state to the enabled element
        const stack = this.props.stack;
        cornerstoneTools.addStackStateManager(element, ["stack"]);
        cornerstoneTools.addToolState(element, "stack", stack);
        element.addEventListener(
          "cornerstoneimagerendered",
          this.onImageRendered
        );
        element.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
        element.addEventListener(cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED, (event) => {
          const measurementData = event.detail.measurementData;
          if (measurementData) {
            if (event.detail.toolType.includes('FreehandRoi')) {
                let tempArray = []
                for (let i = 0; i < measurementData.handles.points.length; i++) {
                  tempArray.push([measurementData.handles.points[i].x, measurementData.handles.points[i].y])
                }
                this.setState({ layers: [...this.state.layers, {name: `Freehand Roi ${this.state.list[0] + 1}`, points: tempArray}] })
                this.setState({ list: [this.state.list[0] + 1, ...this.state.list.slice(1, 6)]})
            }
            else if (event.detail.toolType.includes('RectangleRoi')) {
              const tempArray = [measurementData.handles.start.x, measurementData.handles.start.y, measurementData.handles.end.x, measurementData.handles.end.y]
              this.setState({ layers: [...this.state.layers, {name: `Rectangle Roi ${this.state.list[1] + 1}`, points: tempArray}] })
              this.setState({ list: [...this.state.list.slice(0, 1), this.state.list[1] + 1, ...this.state.list.slice(2, 6)]})
            }
            else if (event.detail.toolType.includes('Length')) {
              const tempArray = [measurementData.handles.start.x, measurementData.handles.start.y, measurementData.handles.end.x, measurementData.handles.end.y]
              this.setState({ layers: [...this.state.layers, {name: `Length ${this.state.list[2] + 1}`, points: tempArray}] })
              this.setState({ list: [...this.state.list.slice(0, 2), this.state.list[2] + 1, ...this.state.list.slice(3, 6)]})
            }
            else if (event.detail.toolType.includes('ArrowAnnotate')) {
              const tempArray = [measurementData.handles.start.x, measurementData.handles.start.y, measurementData.handles.end.x, measurementData.handles.end.y]
              this.setState({ layers: [...this.state.layers, {name: `Arrow Annotate ${this.state.list[3] + 1}`, points: tempArray, text: measurementData.text}] })
              this.setState({ list: [...this.state.list.slice(0, 3), this.state.list[3] + 1, ...this.state.list.slice(4, 6)]})
            }
            else if (event.detail.toolType.includes('EllipticalRoi')) {
              const tempArray = [measurementData.handles.start.x, measurementData.handles.start.y, measurementData.handles.end.x, measurementData.handles.end.y]
              this.setState({ layers: [...this.state.layers, {name: `Elliptical Roi ${this.state.list[4] + 1}`, points: tempArray}] })
              this.setState({ list: [...this.state.list.slice(0, 4), this.state.list[4] + 1, ...this.state.list.slice(5, 6)]})
            }
            else if (event.detail.toolType.includes('TextMarker')) {
              const tempArray = [measurementData.handles.end.x, measurementData.handles.end.y]
              this.setState({ layers: [...this.state.layers, {name: `Text Marker ${this.state.list[5] + 1}`, points: tempArray}] })
              this.setState({ list: [...this.state.list.slice(0, 5), this.state.list[5] + 1, ...this.state.list.slice(6, 6)]})
              console.log(this.state.list, this.state.layers)
            }
          }
      });
      });
    }

    updateImage(index) {
        const element = this.element
        cornerstone.loadImage(images[index]).then(image => {
          cornerstone.displayImage(element, image);
        });
    }

    componentWillUnmount() {
      const element = this.element;
      element.removeEventListener(
        "cornerstoneimagerendered",
        this.onImageRendered
      );
  
      element.removeEventListener("cornerstonenewimage", this.onNewImage);
  
      window.removeEventListener("resize", this.onWindowResize);
      // cornerstoneTools.freehand.element.removeEventListener('cornerstonetoolsmouseup', this.onMeasurementCompleted);
      cornerstone.disable(element);
    }
  
    componentDidUpdate(prevProps, prevState) {
      const stackData = cornerstoneTools.getToolState(this.element, "stack");
      const stack = stackData.data[0];
      stack.currentImageIdIndex = this.state.stack.currentImageIdIndex;
      stack.imageIds = this.state.stack.imageIds;
      cornerstoneTools.addToolState(this.element, "stack", stack);
  
    }
  }

const stack = {
  imageIds: [imageId1, imageId2, imageId1],
  currentImageIdIndex: 0
};
const Editor = () => {
  return(
    <div>
      <CornerstoneElement stack={{ ...stack }} />
    </div>
    )
};

export default Editor