'use client';

import StepBlock from '@/components/StepBlock';
import CompareSlider from '@/components/CompareSlider';
import BackgroundFX from '@/components/BackgroundFX';


export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-10">
      <BackgroundFX />
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">🌾 NDVI APK Model — 3D Interactive Story</h1>
        <p className="text-gray-300 mt-2 text-lg">
          From Satellite Image to AI-powered Clustering
        </p>
      </header>

      <StepBlock
        title="Step 1: Satellite Image"
        image="/step1_satellite.png"
        description="Raw satellite view from Google Earth showing natural field layout."
      />

      <StepBlock
        title="Step 2: NDVI (GEE Greyscale)"
        image="/step2_ndvi_grey.png"
        description="NDVI extracted using Google Earth Engine using B4 (Red) and B8 (NIR) bands."
      />

      <StepBlock
        title="Step 3: NDVI Colored in QGIS"
        image="/step3_qgis_ndvi.png"
        description="Pseudo-colored NDVI processed in QGIS for better vegetation health interpretation."
      />

      <StepBlock
        title="Step 4: Clustered Output from APK Model"
        image="/step4_apk_output.png"
        description="Autoencoder + PCA + KMeans generated clusters representing crops with accuracy."
      />

      <CompareSlider />
    

      <footer className="text-center text-sm text-gray-500 mt-20">
        Made with 💚 by Sigma Boi | Deployed via Vercel
      </footer>
    </main>
  );
}
