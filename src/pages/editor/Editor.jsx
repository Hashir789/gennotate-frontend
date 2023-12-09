import React, { useState } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import './editor.css';
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

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

const imageId = "https://cdn.jsdelivr.net/gh/Hashir789/hashir@main/105new_010_Normal.jpg";

const divStyle = {
  width: "765px",
  height: "500px"
};

class CornerstoneElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: props.stack,
      viewport: cornerstone.getDefaultViewport(null, undefined),
      imageId: props.stack.imageIds[0]
    };

    this.onImageRendered = this.onImageRendered.bind(this);
    this.onNewImage = this.onNewImage.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  render() {
    return (
      <div>
        <div
          className="viewportElement"
          style={divStyle}
          ref={input => {
            this.element = input;
          }}
        >
          <canvas className="cornerstone-canvas" />
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
  imageIds: [imageId],
  currentImageIdIndex: 0
};

const Cornerstone = () => {
  const buttonStyle = {
    backgroundColor: '#10a36e',
    color: 'white',
  };
  const [move, setMove] = useState(0)
  const moveRight = () =>{
    const innerDiv = document.querySelector('.toolbar-container1');
    if (move > -200) {
      innerDiv.style.left = parseInt(move - 100) + '%'
      setMove(move - 100)
    }
    console.log(innerDiv.style.left)
  }
  const moveLeft = () =>{
    const innerDiv = document.querySelector('.toolbar-container1');
    if (move < 0) {
      innerDiv.style.left = parseInt(move + 100) + '%'
      setMove(move + 100)
    }
    console.log(innerDiv.style.left)
  }
  // const FreehandRoi = () => {
  //   cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
  //   cornerstoneTools.setToolActive("FreehandRoi", { mouseButtonMask: 1 });
  //   cornerstoneTools.toolStyle.setToolWidth(3);
  //   cornerstoneTools.toolColors.setToolColor('#FFFF00');
  //   cornerstoneTools.updateImage(element);
  // };
  const Wwwc = () => {
    const WwwcTool = cornerstoneTools.WwwcTool;
    cornerstoneTools.addTool(WwwcTool)
    cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
  };
  const zoom = () => {
    cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
      configuration: {
        invert: false,
        preventZoomOutsideImage: false,
        minScale: .1,
        maxScale: 20.0,
      }
    });
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 })
  };
  const pan = () => {
    const PanTool = cornerstoneTools.PanTool;
    cornerstoneTools.addTool(PanTool)
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 })
  };
  const magnify = () => {
    const MagnifyTool = cornerstoneTools.MagnifyTool;
    cornerstoneTools.addTool(MagnifyTool)
    cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 })
  };
  const rotate = () => {
    const RotateTool = cornerstoneTools.RotateTool;
    cornerstoneTools.addTool(RotateTool)
    cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 })
  };
  const arrowNotate = () => {
    const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
    cornerstoneTools.addTool(ArrowAnnotateTool)
    cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 })
  };
  const textMarker = () => {
    const TextMarkerTool = cornerstoneTools.TextMarkerTool
    const configuration = {
      markers: ['My', 'name', 'is', 'Muhammad', 'Hashir', 'Malik'],
      current: 'My',
      ascending: true,
      loop: true,
    }
    cornerstoneTools.addTool(TextMarkerTool, { configuration })
    cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 })
  };
  const freehandAnnotate = () => {
    const FreehandRoiTool = cornerstoneTools.FreehandRoiTool;
    cornerstoneTools.addTool(FreehandRoiTool)
    cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 })
  };
  const length = () => {
    const LengthTool = cornerstoneTools.LengthTool;
    cornerstoneTools.addTool(LengthTool)
    cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 })
  };
  const rectangle = () => {
    const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
    cornerstoneTools.addTool(RectangleRoiTool)
    cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 })
  };
  const ellipse = () => {
    const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
    cornerstoneTools.addTool(EllipticalRoiTool)
    cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 })
  };
  const circleScissors = () => {
    const CircleScissorsTool = cornerstoneTools.CircleScissorsTool;
    cornerstoneTools.addTool(CircleScissorsTool)
    cornerstoneTools.setToolActive('CircleScissors', { mouseButtonMask: 1 })
  };
  const freehandSegmentation = () => {
    const FreehandScissorsTool = cornerstoneTools.FreehandScissorsTool;
    cornerstoneTools.addTool(FreehandScissorsTool)
    cornerstoneTools.setToolActive('FreehandScissors', { mouseButtonMask: 1 })
  };
  const rectangularSegmentation = () => {
    const RectangleScissorsTool = cornerstoneTools.RectangleScissorsTool;
    cornerstoneTools.addTool(RectangleScissorsTool)
    cornerstoneTools.setToolActive('RectangleScissors', { mouseButtonMask: 1 })
  };
  return (
    <div>
      <div className="container">
        <div className="container1">
          <p className="heading1">Showcase</p>
          <div className="showcase-container">
            <img className='image' src={Image1} alt='' width='100%'/>
            <p className="showcase-text">Original Image</p>
            <img className='image' src={Image2} alt='' width='100%'/>
            <p className="showcase-text">Segmented Layer 1</p>
            <img className='image' src={Image2} alt='' width='100%'/>
            <p className="showcase-text">Segmented Layer 2</p>
            <img className='image' src={Image2} alt='' width='100%'/>
            <p className="showcase-text">Segmented Layer 3</p>
          </div>
        </div>
        <div className="container2">
          <div className="cornerstonejs">
            <CornerstoneElement stack={{ ...stack }} />
          </div>
          <div className="toolbar">
            <div className="toolbar-button" onClick={moveLeft} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: move===0?'not-allowed':'pointer', color: move===0?'#616161':'red'}}><img src={Image3} alt='' width='40%'/></div>
            <div className="toolbar-container">
              <div className="toolbar-container1">
                <div className="section section1">
                  <div className="section-name">General</div>
                  <div className="section-body">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='success'>
                      <Tooltip title="Wwwc" arrow>
                        <Button style={buttonStyle} onClick={Wwwc}><VscColorMode style={{fontSize: '24px'}}/></Button>
                      </Tooltip>
                      <Tooltip title="Zoom In" arrow>
                        <Button style={buttonStyle} onClick={zoom}><MdOutlineZoomIn style={{fontSize: '30px'}}/></Button>
                      </Tooltip>
                      <Tooltip title="Pan" arrow>
                        <Button style={buttonStyle} onClick={pan}><IoMdMove style={{fontSize: '26px'}}/></Button>
                      </Tooltip>
                      <Tooltip title="Magnify" arrow>
                        <Button style={buttonStyle} onClick={magnify}><PiMagnifyingGlassFill style={{fontSize: '26px'}}/></Button>
                      </Tooltip>
                      <Tooltip title="Rotate" arrow>
                        <Button style={buttonStyle} onClick={rotate}><FaArrowRotateLeft style={{fontSize: '20px'}}/></Button>
                      </Tooltip>                     
                    </ButtonGroup>
                  </div>
                </div>
                <div className="section section2">
                  <div className="section-name">Annotation</div>
                  <div className="section-body">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='success'>
                      <Tooltip title="Arrow Annotate" arrow>
                        <Button style={buttonStyle} onClick={arrowNotate}>
                          <BsArrowDownLeft style={{fontSize: '24px'}}/>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Text Marker" arrow>
                        <Button style={buttonStyle} onClick={textMarker}>
                          <PiTextT style={{fontSize: '26px'}}/>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Freehand Roi" arrow>
                        <Button style={buttonStyle} onClick={freehandAnnotate}>
                          <TfiPencil style={{fontSize: '22px'}}/>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Length" arrow>
                        <Button style={buttonStyle} onClick={length}>
                        <FaRuler style={{fontSize: '26px'}}/>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Rectangular Roi" arrow>
                        <Button style={buttonStyle} onClick={rectangle}>
                          <LuRectangleHorizontal style={{fontSize: '20px'}}/>
                        </Button>
                      </Tooltip>  
                      <Tooltip title="Elliptical Roi" arrow>
                        <Button style={buttonStyle} onClick={ellipse}>
                          <LuCircle style={{fontSize: '20px'}}/>
                        </Button>
                      </Tooltip>                     
                    </ButtonGroup>
                  </div>
                </div>
                <div className="section section3">
                  <div className="section-name">Segmentation</div>
                  <div className="section-body">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='success'>
                      <Tooltip title="Circle Scissors" arrow>
                        <Button style={buttonStyle} onClick={circleScissors}><LuCircle style={{fontSize: '20px'}}/></Button>
                      </Tooltip>
                      <Tooltip title="Freehand Scissors" arrow>
                        <Button style={buttonStyle} onClick={freehandSegmentation}><ImScissors style={{fontSize: '20px'}}/></Button>
                      </Tooltip>
                      <Tooltip title="Rectangular Scissors" arrow>
                        <Button style={buttonStyle} onClick={rectangularSegmentation}><TbRectangle style={{fontSize: '24px'}}/></Button>
                      </Tooltip>                     
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className="toolbar-button" onClick={moveRight} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: move===-200?'not-allowed':'pointer', color: move===-200?'#616161':'red'}}><img src={Image4} alt='' width='40%'/></div>
          </div>
        </div>
        <div className="container3"></div>
      </div>
    </div>
  )
}

export default Cornerstone