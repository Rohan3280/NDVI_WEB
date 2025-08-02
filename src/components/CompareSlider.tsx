'use client';

import ReactCompareImage from 'react-compare-image';

export default function CompareSlider() {
  return (
    <div className="my-20 text-center">
      <h2 className="text-2xl font-semibold mb-4">QGIS NDVI vs APK Model Output</h2>
      <div className="max-w-4xl mx-auto">
        <ReactCompareImage
          leftImage="/step3_qgis_ndvi.png"
          rightImage="/step4_apk_output.png"
          sliderLineColor="lime"
        />
      </div>
    </div>
  );
}
