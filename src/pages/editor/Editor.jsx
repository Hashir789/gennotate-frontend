import React from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import './editor.css';
import Image1 from '../../assets/oct.png'
import Image2 from '../../assets/mask.png'

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

// const imageId = "https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg";
const imageId = "https://source.unsplash.com/random/496x512/?medical"

const divStyle = {
  width: "496px",
  height: "512px"
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
  const FreehandRoi = () => {
    cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
    cornerstoneTools.setToolActive("FreehandRoi", { mouseButtonMask: 1 });
    cornerstoneTools.toolStyle.setToolWidth(6);
    cornerstoneTools.toolColors.setToolColor('#FFFF00');
    cornerstoneTools.updateImage(element);
  };
  const Wwwc = () => {
    const WwwcTool = cornerstoneTools.WwwcTool;
    cornerstoneTools.addTool(WwwcTool)
    cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
  };
  return (
    <div>
      <div className="container">
        <div className="container1">
          <p className="heading1">Showcase</p>
          <div className="showcase-container">
            <img src={Image1} alt='' width='100%'/>
            <p className="showcase-text">Original Image</p>
            <img src={Image2} alt='' width='100%'/>
            <p className="showcase-text">Segmented Layer 1</p>
            <img src={Image2} alt='' width='100%'/>
            <p className="showcase-text">Segmented Layer 2</p>
            <img src={Image2} alt='' width='100%'/>
            <p className="showcase-text">Segmented Layer 3</p>
          </div>
        </div>
        <div className="container2">
          <div className="cornerstonejs">
            <CornerstoneElement stack={{ ...stack }} />
          </div>
        </div>
        <div className="container3"></div>
      </div>
    </div>
  )
}

export default Cornerstone

{/* <CornerstoneElement stack={{ ...stack }} />
<button onClick={FreehandRoi} style={{backgroundColor: 'whitesmoke', color: '#000000'}}>
  Freehand ROI
</button>
<button onClick={Wwwc} style={{backgroundColor: 'whitesmoke', color: '#000000', marginLeft: '20px'}}>
  WWWC
</button> */}