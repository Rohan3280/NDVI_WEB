'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// INSANE 3D Background with Three.js-like effects
const Epic3DBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 3D-style floating cubes and neural network nodes
    const nodes = Array(150).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      speedZ: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      hue: Math.random() * 120 + 120,
      connections: []
    }));
    
    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + 
            Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 150 && Math.random() > 0.95) {
            node.connections.push(j);
          }
        }
      });
    });
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw neural network connections
      nodes.forEach((node) => {
        node.connections.forEach(connectionIndex => {
          const target = nodes[connectionIndex];
          if (target) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `hsla(${node.hue}, 70%, 50%, 0.1)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      // Draw 3D nodes
      nodes.forEach(node => {
        const scale = 1000 / (1000 + node.z);
        const size = node.size * scale;
        
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, size * 2
        );
        gradient.addColorStop(0, `hsla(${node.hue}, 70%, 60%, ${node.opacity * scale})`);
        gradient.addColorStop(1, `hsla(${node.hue}, 70%, 30%, 0)`);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        node.x += node.speedX * scale;
        node.y += node.speedY * scale;
        node.z -= node.speedZ;
        
        if (node.z <= 0) {
          node.z = 1000;
          node.x = Math.random() * canvas.width;
          node.y = Math.random() * canvas.height;
        }
        
        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

// Enhanced Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <motion.section 
      style={{ y }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Remote Sensing & Machine Learning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-green-100 to-green-300 bg-clip-text text-transparent mb-6">
            NDVI APK Model
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Advanced clustering framework addressing spatial granularity challenges in smallholder farming using 
            <span className="text-green-400 font-semibold"> Autoencoders</span>, 
            <span className="text-blue-400 font-semibold"> PCA</span>, and 
            <span className="text-purple-400 font-semibold"> K-Means</span>
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <span className="text-2xl font-bold text-green-400">87.5%</span>
            <p className="text-sm text-gray-400">ARI Score</p>
          </div>
          <div className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <span className="text-2xl font-bold text-blue-400">Sentinel-2</span>
            <p className="text-sm text-gray-400">Satellite Data</p>
          </div>
          <div className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <span className="text-2xl font-bold text-purple-400">10-20m</span>
            <p className="text-sm text-gray-400">Resolution</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Interactive APK Model Transformer
const APKModelTransformer = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const layers = [
    {
      name: "Input Layer",
      description: "Raw NDVI satellite imagery (512x512 pixels)",
      color: "from-green-400 to-emerald-500",
      icon: "🛰️",
      neurons: 64,
      data: "NDVI Matrix"
    },
    {
      name: "Encoder Layer 1",
      description: "Convolutional feature extraction (256x256)",
      color: "from-blue-400 to-cyan-500",
      icon: "🧠",
      neurons: 32,
      data: "Compressed Features"
    },
    {
      name: "Encoder Layer 2", 
      description: "Deep feature compression (128x128)",
      color: "from-purple-400 to-pink-500",
      icon: "🔄",
      neurons: 16,
      data: "Latent Space"
    },
    {
      name: "PCA Transform",
      description: "Principal Component Analysis (64 components)",
      color: "from-orange-400 to-red-500",
      icon: "📊",
      neurons: 8,
      data: "Principal Components"
    },
    {
      name: "K-Means Clustering",
      description: "Final crop classification (3 clusters)",
      color: "from-teal-400 to-green-500",
      icon: "🎯", 
      neurons: 3,
      data: "Wheat | Gram | Non-NDVI"
    }
  ];
  
  const startAnimation = () => {
    setIsAnimating(true);
    let currentLayer = 0;
    
    const animateNext = () => {
      if (currentLayer < layers.length) {
        setActiveLayer(currentLayer);
        currentLayer++;
        setTimeout(animateNext, 1500);
      } else {
        setIsAnimating(false);
      }
    };
    
    animateNext();
  };
  
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            APK Model Transformer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Watch how satellite imagery flows through our neural architecture
          </p>
          
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-bold text-white transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {isAnimating ? "🔄 Processing..." : "🚀 Start Transformation"}
          </button>
        </motion.div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-12 overflow-x-auto pb-4">
            {layers.map((layer, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center min-w-[200px] mx-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: activeLayer >= index ? 1 : 0.3,
                  scale: activeLayer === index ? 1.1 : 1 
                }}
                transition={{ duration: 0.5 }}
              >
                <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center text-3xl mb-4 shadow-2xl`}>
                  {layer.icon}
                  
                  {activeLayer === index && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-4 border-white"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                </div>
                
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {Array(layer.neurons).fill(0).map((_, neuronIndex) => (
                    <motion.div
                      key={neuronIndex}
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${layer.color}`}
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: activeLayer >= index ? 1 : 0.3,
                        scale: activeLayer === index ? [1, 1.5, 1] : 1
                      }}
                      transition={{ 
                        duration: 0.5,
                        delay: neuronIndex * 0.05,
                        repeat: activeLayer === index ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  <h3 className="font-bold text-white mb-2">{layer.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{layer.description}</p>
                  <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${layer.color} bg-opacity-20 border border-white/20`}>
                    <span className="text-xs font-medium">{layer.data}</span>
                  </div>
                </div>
                
                {index < layers.length - 1 && (
                  <motion.div
                    className="absolute top-12 -right-8 text-gray-400"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: activeLayer > index ? 1 : 0.3,
                      scale: activeLayer === index ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: activeLayer === index ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    ➤
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Current Layer Details</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl mb-2">{layers[activeLayer]?.icon}</div>
                <div className="font-bold text-lg">{layers[activeLayer]?.name}</div>
              </div>
              
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-green-400 mb-2">{layers[activeLayer]?.neurons}</div>
                <div className="text-sm text-gray-400">Active Neurons</div>
              </div>
              
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-sm font-medium text-blue-400">{layers[activeLayer]?.data}</div>
                <div className="text-xs text-gray-400">Output Type</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-center mt-6">
              {layers[activeLayer]?.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Processing Pipeline
const ProcessingPipeline = () => {
  const steps = [
    {
      title: "Satellite Imagery",
      subtitle: "Raw Sentinel-2 Data",
      image: "/step1_satellite.png",
      description: "High-resolution satellite imagery from Sentinel-2A & 2B captured over Guna district, Madhya Pradesh, showing fragmented agricultural fields typical of Indian smallholder farming.",
      tech: ["Sentinel-2", "Google Earth Engine", "Multi-spectral bands"]
    },
    {
      title: "NDVI Extraction", 
      subtitle: "Vegetation Health Analysis",
      image: "/step2_ndvi_grey.png",
      description: "Normalized Difference Vegetation Index calculated using B4 (Red) and B8 (NIR) bands. NDVI values range from -1 to +1, indicating vegetation health and density.",
      tech: ["NDVI = (NIR-RED)/(NIR+RED)", "B4 & B8 bands", "Grayscale processing"]
    },
    {
      title: "QGIS Enhancement",
      subtitle: "Pseudo-color Visualization", 
      image: "/step3_qgis_ndvi.png",
      description: "Single-band pseudo-color processing in QGIS transforms grayscale NDVI into interpretable RGB visualization, revealing vegetation patterns and field boundaries.",
      tech: ["QGIS Software", "Pseudo-color mapping", "Spatial analysis"]
    },
    {
      title: "APK Clustering",
      subtitle: "AI-Powered Classification",
      image: "/step4_apk_output.png", 
      description: "Our APK model successfully clusters crop fields into wheat, gram, and non-vegetation categories with 87.5% ARI score, overcoming spatial granularity challenges.",
      tech: ["Autoencoder features", "PCA dimensionality", "K-Means clustering"]
    }
  ];
  
  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Processing Pipeline</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From raw satellite data to intelligent crop classification
          </p>
        </motion.div>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="relative rounded-2xl shadow-2xl w-full max-w-2xl mx-auto transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{step.title}</h3>
                      <p className="text-green-400 font-medium">{step.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm font-medium text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};




// Research Results with Interactive Charts
const ResearchResults = () => {
  const [selectedMetric, setSelectedMetric] = useState('ari');
  
  const results = {
    ari: {
      title: "ARI Score Comparison",
      data: [
        { method: "Random", score: 0.1, color: "bg-red-500" },
        { method: "SVM", score: 0.54, color: "bg-orange-500" },
        { method: "DBSCAN", score: 0.62, color: "bg-yellow-500" },
        { method: "APK Model", score: 0.875, color: "bg-green-500" }
      ]
    },
    performance: {
      title: "Model Performance Metrics",
      data: [
        { metric: "Precision", wheat: 0.89, gram: 0.86, nonNDVI: 0.91 },
        { metric: "Recall", wheat: 0.87, gram: 0.88, nonNDVI: 0.89 },
        { metric: "F1-Score", wheat: 0.88, gram: 0.87, nonNDVI: 0.90 }
      ]
    }
  };
  
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Research Results
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive performance analysis of the APK model
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
            {Object.keys(results).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedMetric === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {results[key].title}
              </button>
            ))}
          </div>
        </div>
        
        {selectedMetric === 'ari' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">{results.ari.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {results.ari.data.map((item, index) => (
                <motion.div
                  key={item.method}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 ${item.color}`}
                        initial={{ height: 0 }}
                        animate={{ height: `${item.score * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                      <span className="relative z-10 text-white font-bold text-lg">
                        {(item.score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.method}</h4>
                  <p className="text-gray-400 text-sm">ARI Score: {item.score.toFixed(3)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {selectedMetric === 'performance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">{results.performance.title}</h3>
            <div className="space-y-6">
              {results.performance.data.map((item, index) => (
                <div key={item.metric} className="space-y-4">
                  <h4 className="text-lg font-bold text-center">{item.metric}</h4>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {['wheat', 'gram', 'nonNDVI'].map((crop, cropIndex) => (
                      <div key={crop} className="text-center">
                        <div className="relative mb-2">
                          <div className="w-full h-6 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${item[crop] * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.3 + cropIndex * 0.1 }}
                            />
                          </div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                            {(item[crop] * 100).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-sm capitalize font-medium">
                          {crop === 'nonNDVI' ? 'Non-NDVI' : crop}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full">
            <span className="text-2xl mr-3">🎯</span>
            <span className="text-lg font-bold">
              APK Model achieves <span className="text-green-400">87.5% ARI Score</span> - 
              Best performance for smallholder farming applications
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main App Component
export default function APKModelShowcase() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Epic3DBackground />
      
      <HeroSection />
      <APKModelTransformer />
      <ProcessingPipeline />
      <ResearchResults />
      
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            NDVI APK Model Research
          </h3>
          <p className="text-gray-400 mb-6">
            Advanced clustering for precision agriculture in smallholder farming systems
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>Sentinel-2 Satellite Data</span>
            <span>•</span>
            <span>Machine Learning</span>
            <span>•</span>
            <span>Remote Sensing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}