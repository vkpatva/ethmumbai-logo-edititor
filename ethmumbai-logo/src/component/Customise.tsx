import { useState, useRef } from "react";

const CustomizableSvgIcon = () => {
  const [mainBgColor, setMainBgColor] = useState("#F89D21");
  const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const svgRef = useRef(null);

  const updateSvgColors = () => {
    const svgElement: any = svgRef.current;
    if (!svgElement) return;

    svgElement.querySelector("rect").setAttribute("fill", mainBgColor);
    const paths = svgElement.querySelectorAll("path");
    paths.forEach((path: any, index: number) => {
      if (index === 0 || index === 3) {
        path.setAttribute("fill", primaryColor);
      } else {
        path.setAttribute("fill", secondaryColor);
      }
    });
  };

  const downloadSvgAsImage = () => {
    const svgElement: any = svgRef.current;
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    canvas.width = svgElement.viewBox.baseVal.width;
    canvas.height = svgElement.viewBox.baseVal.height;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url); // Clean up URL object
      const imgURL = canvas.toDataURL("image/png");
      triggerDownload(imgURL, "custom-icon.png");
    };
    img.src = url;
  };

  const downloadSvg = () => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "custom-icon.svg");
  };

  const triggerDownload = (imgURL: any, fileName: any) => {
    const dlLink = document.createElement("a");
    dlLink.download = fileName;
    dlLink.href = imgURL;
    document.body.appendChild(dlLink); // This line and
    dlLink.click(); // this line are not very React-like, but they work
    document.body.removeChild(dlLink);
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg p-8 m-4 w-full max-w-4xl">
      <svg
        ref={svgRef}
        viewBox="0 0 2400 2400"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-64 w-64"
      >
        <rect width="2400" height="2400" fill={mainBgColor} />
        <path
          d="M1185.6 294.398L1758 1216L1196.4 1548.4L642 1210L1185.6 294.398Z"
          fill={primaryColor}
        />
        <path
          d="M1196.41 2105.2L1755.61 1319.2L1198.81 1649.2L645.609 1327.6L1196.41 2105.2Z"
          fill={secondaryColor}
        />
        <path
          d="M1186.79 456.398L1607.99 1166.8L1191.59 1428.4L788.391 1166.8L1186.79 456.398Z"
          fill={secondaryColor}
        />
        <path
          d="M1198.8 1992.4L1486.8 1572.4L1205.75 1750L928.805 1603.6L1198.8 1992.4Z"
          fill={primaryColor}
        />
      </svg>

      <div className="flex justify-center space-x-4 mt-6">
        <label className="block">
          Main Background Color:
          <input
            type="color"
            value={mainBgColor}
            className="mt-1 bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setMainBgColor(e.target.value)}
          />
        </label>
        <label className="block">
          Primary Color:
          <input
            type="color"
            value={primaryColor}
            className="mt-1 bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </label>
        <label className="block">
          Secondary Color:
          <input
            type="color"
            value={secondaryColor}
            className="mt-1 bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </label>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={downloadSvgAsImage}
        >
          Download PNG
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={downloadSvg}
        >
          Download SVG
        </button>
      </div>
    </div>
  );
};

export default CustomizableSvgIcon;
