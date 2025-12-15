import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const FloorProgramBubbles = () => {
  const svgRef = useRef(null);
  const [selectedFloor, setSelectedFloor] = useState("1");
  const [hoveredSpace, setHoveredSpace] = useState(null);

  // Complete building program data
  const buildingData = {
    "1": {
      name: "FLOOR 1 - RETAIL + LOBBIES",
      height: "0' - 18'",
      totalArea: 30550,
      color: "#ef4444",
      spaces: [
        { name: "Retail", area: 12000, color: "#f87171", type: "leasable" },
        { name: "Public Arcade", area: 10000, color: "#fbbf24", type: "public" },
        { name: "Residential Lobby", area: 1800, color: "#60a5fa", type: "circulation" },
        { name: "Office Lobby", area: 1500, color: "#34d399", type: "circulation" },
        { name: "Elevator Core", area: 2000, color: "#94a3b8", type: "core" },
        { name: "Service/Loading", area: 1500, color: "#cbd5e1", type: "core" },
        { name: "MEP/Electrical", area: 1000, color: "#e2e8f0", type: "core" },
        { name: "Stairs", area: 500, color: "#f1f5f9", type: "core" },
        { name: "Restrooms", area: 250, color: "#f8fafc", type: "support" }
      ]
    },
    "2": {
      name: "FLOOR 2 - RETAIL + TERRACE",
      height: "18' - 36'",
      totalArea: 30550,
      color: "#ef4444",
      spaces: [
        { name: "Retail", area: 12000, color: "#f87171", type: "leasable" },
        { name: "Outdoor Terrace", area: 10000, color: "#a7f3d0", type: "amenity" },
        { name: "Escalators", area: 600, color: "#fcd34d", type: "circulation" },
        { name: "Elevator Shafts", area: 2000, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP Shafts", area: 600, color: "#e2e8f0", type: "core" },
        { name: "Restrooms", area: 800, color: "#f1f5f9", type: "support" },
        { name: "Storage/Janitor", area: 250, color: "#f8fafc", type: "support" },
        { name: "Corridors", area: 3800, color: "#fef3c7", type: "circulation" }
      ]
    },
    "3-5": {
      name: "FLOORS 3-5 - RETAIL",
      height: "36' - 81'",
      totalArea: 30550,
      color: "#ef4444",
      spaces: [
        { name: "Retail Space", area: 22100, color: "#f87171", type: "leasable" },
        { name: "Escalators (Fl 3)", area: 600, color: "#fcd34d", type: "circulation" },
        { name: "Elevator Shafts", area: 2000, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP Shafts", area: 600, color: "#e2e8f0", type: "core" },
        { name: "Restrooms", area: 800, color: "#f1f5f9", type: "support" },
        { name: "Electrical/IDF", area: 400, color: "#f8fafc", type: "core" },
        { name: "Storage", area: 250, color: "#fef3c7", type: "support" },
        { name: "Corridors", area: 3300, color: "#fef3c7", type: "circulation" }
      ]
    },
    "6-10": {
      name: "FLOORS 6-10 - OFFICE BASE",
      height: "81' - 151'",
      totalArea: 30550,
      color: "#3b82f6",
      spaces: [
        { name: "Office Space", area: 25750, color: "#60a5fa", type: "leasable" },
        { name: "Elevator Shafts", area: 2000, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP Shafts", area: 700, color: "#e2e8f0", type: "core" },
        { name: "Restrooms", area: 1000, color: "#dbeafe", type: "support" },
        { name: "Electrical/IDF", area: 400, color: "#f1f5f9", type: "core" },
        { name: "Janitor", area: 200, color: "#f8fafc", type: "support" }
      ]
    },
    "11": {
      name: "FLOOR 11 - OFFICE TRANSITION",
      height: "151' - 165'",
      totalArea: 24541,
      color: "#3b82f6",
      spaces: [
        { name: "Office Space", area: 19741, color: "#60a5fa", type: "leasable" },
        { name: "Elevator Shafts", area: 2000, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP Shafts", area: 700, color: "#e2e8f0", type: "core" },
        { name: "Restrooms", area: 1000, color: "#dbeafe", type: "support" },
        { name: "Electrical/IDF", area: 400, color: "#f1f5f9", type: "core" },
        { name: "Janitor", area: 200, color: "#f8fafc", type: "support" }
      ]
    },
    "12-15": {
      name: "FLOORS 12-15 - OFFICE TOWER",
      height: "165' - 221'",
      totalArea: 21060,
      color: "#3b82f6",
      spaces: [
        { name: "Office Space", area: 16260, color: "#60a5fa", type: "leasable" },
        { name: "Elevator Shafts", area: 2000, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP Shafts", area: 700, color: "#e2e8f0", type: "core" },
        { name: "Restrooms", area: 1000, color: "#dbeafe", type: "support" },
        { name: "Electrical/IDF", area: 400, color: "#f1f5f9", type: "core" },
        { name: "Janitor", area: 200, color: "#f8fafc", type: "support" }
      ]
    },
    "16": {
      name: "FLOOR 16 - AMENITY DECK",
      height: "221' - 232'",
      totalArea: 17422,
      color: "#fbbf24",
      spaces: [
        { name: "Fitness Center", area: 3000, color: "#fcd34d", type: "amenity" },
        { name: "Residents Lounge", area: 2500, color: "#fde68a", type: "amenity" },
        { name: "Outdoor Terrace", area: 5000, color: "#a7f3d0", type: "amenity" },
        { name: "Co-working Space", area: 2000, color: "#fef3c7", type: "amenity" },
        { name: "Elevator Shafts", area: 800, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP/Storage", area: 2519, color: "#e2e8f0", type: "core" },
        { name: "Restrooms", area: 803, color: "#f1f5f9", type: "support" },
        { name: "Corridors", area: 300, color: "#fef3c7", type: "circulation" }
      ]
    },
    "17-29": {
      name: "FLOORS 17-29 - RESIDENTIAL",
      height: "232' - 362'",
      totalArea: 17422,
      color: "#10b981",
      spaces: [
        { name: "2 Studios (550 sf ea)", area: 1100, color: "#34d399", type: "units" },
        { name: "8 One-Bedrooms (850 sf ea)", area: 6800, color: "#6ee7b7", type: "units" },
        { name: "4 Two-Bedrooms (1200 sf ea)", area: 4800, color: "#a7f3d0", type: "units" },
        { name: "Balconies", area: 1060, color: "#d1fae5", type: "outdoor" },
        { name: "Corridors", area: 903, color: "#fef3c7", type: "circulation" },
        { name: "Elevator Shafts", area: 800, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP Shafts", area: 800, color: "#e2e8f0", type: "core" },
        { name: "Trash Room", area: 350, color: "#f1f5f9", type: "support" },
        { name: "Electrical", area: 300, color: "#f8fafc", type: "core" },
        { name: "Package Room", area: 9, color: "#fef3c7", type: "support" }
      ]
    },
    "30": {
      name: "FLOOR 30 - SKY AMENITY",
      height: "362' - 373'",
      totalArea: 14334,
      color: "#fbbf24",
      spaces: [
        { name: "Sky Lounge", area: 3500, color: "#fcd34d", type: "amenity" },
        { name: "Rooftop Terrace", area: 4500, color: "#a7f3d0", type: "amenity" },
        { name: "Private Dining", area: 1200, color: "#fde68a", type: "amenity" },
        { name: "Media Room", area: 800, color: "#fef3c7", type: "amenity" },
        { name: "Elevator Shafts", area: 800, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP/Storage", area: 2519, color: "#e2e8f0", type: "core" },
        { name: "Restrooms", area: 315, color: "#f1f5f9", type: "support" },
        { name: "Corridors", area: 200, color: "#fef3c7", type: "circulation" }
      ]
    },
    "31-43": {
      name: "FLOORS 31-43 - RESIDENTIAL TOWER",
      height: "373' - 503'",
      totalArea: 14334,
      color: "#10b981",
      spaces: [
        { name: "2 Studios (550 sf ea)", area: 1100, color: "#34d399", type: "units" },
        { name: "6 One-Bedrooms (850 sf ea)", area: 5100, color: "#6ee7b7", type: "units" },
        { name: "3 Two-Bedrooms (1200 sf ea)", area: 3600, color: "#a7f3d0", type: "units" },
        { name: "Balconies", area: 820, color: "#d1fae5", type: "outdoor" },
        { name: "Corridors", area: 715, color: "#fef3c7", type: "circulation" },
        { name: "Elevator Shafts", area: 800, color: "#94a3b8", type: "core" },
        { name: "Stairs", area: 500, color: "#cbd5e1", type: "core" },
        { name: "MEP Shafts", area: 800, color: "#e2e8f0", type: "core" },
        { name: "Trash Room", area: 350, color: "#f1f5f9", type: "support" },
        { name: "Electrical", area: 300, color: "#f8fafc", type: "core" },
        { name: "Package Room", area: 249, color: "#fef3c7", type: "support" }
      ]
    }
  };

  const floorOptions = [
    { id: "1", label: "Floor 1" },
    { id: "2", label: "Floor 2" },
    { id: "3-5", label: "Floors 3-5" },
    { id: "6-10", label: "Floors 6-10" },
    { id: "11", label: "Floor 11" },
    { id: "12-15", label: "Floors 12-15" },
    { id: "16", label: "Floor 16 (Amenity)" },
    { id: "17-29", label: "Floors 17-29" },
    { id: "30", label: "Floor 30 (Amenity)" },
    { id: "31-43", label: "Floors 31-43" }
  ];

  useEffect(() => {
    if (!svgRef.current || !buildingData[selectedFloor]) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const floorData = buildingData[selectedFloor];

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "700")
      .style("fill", "#1a202c")
      .text(floorData.name);

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .style("fill", "#64748b")
      .text(`${floorData.height} | Total: ${floorData.totalArea.toLocaleString()} SF`);

    // Create hierarchy
    const root = d3.hierarchy({
      name: floorData.name,
      children: floorData.spaces.map(s => ({ ...s, value: s.area }))
    })
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

    // Pack layout
    const pack = d3.pack()
      .size([width - 100, height - 120])
      .padding(5);

    const nodes = pack(root).descendants().slice(1); // Remove root

    const g = svg.append("g")
      .attr("transform", "translate(50, 80)");

    // Create gradients
    const defs = svg.append("defs");
    nodes.forEach((node, i) => {
      const gradient = defs.append("radialGradient")
        .attr("id", `bubble-gradient-${i}`);
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.rgb(node.data.color).brighter(0.3));
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", node.data.color);
    });

    // Draw bubbles
    const bubble = g.selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this).select("circle")
          .transition()
          .duration(200)
          .attr("r", d.r * 1.05);
        
        setHoveredSpace(d.data);
      })
      .on("mouseout", function(event, d) {
        d3.select(this).select("circle")
          .transition()
          .duration(200)
          .attr("r", d.r);
        
        setHoveredSpace(null);
      });

    bubble.append("circle")
      .attr("r", d => d.r)
      .attr("fill", (d, i) => `url(#bubble-gradient-${i})`)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Labels
    bubble.each(function(d) {
      const text = d3.select(this).append("text")
        .attr("text-anchor", "middle")
        .style("fill", "#1a202c")
        .style("font-size", `${Math.min(d.r / 4, 12)}px`)
        .style("font-weight", "600")
        .style("pointer-events", "none");

      const words = d.data.name.split(" ");
      const maxChars = Math.floor(d.r / 3);
      
      let lines = [];
      let currentLine = "";
      
      words.forEach(word => {
        if ((currentLine + " " + word).length <= maxChars) {
          currentLine += (currentLine ? " " : "") + word;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);

      lines = lines.slice(0, 3); // Max 3 lines

      lines.forEach((line, i) => {
        text.append("tspan")
          .attr("x", 0)
          .attr("dy", i === 0 ? `-${(lines.length - 1) * 0.5}em` : "1.1em")
          .text(line);
      });

      // Area label
      if (d.r > 25) {
        text.append("tspan")
          .attr("x", 0)
          .attr("dy", "1.3em")
          .style("font-size", `${Math.min(d.r / 5, 10)}px`)
          .style("fill", "#475569")
          .text(`${d.data.area.toLocaleString()} SF`);
      }
    });

    // Legend
    const legendData = [
      { type: "leasable", label: "Leasable Space", color: "#3b82f6" },
      { type: "units", label: "Residential Units", color: "#10b981" },
      { type: "amenity", label: "Amenity", color: "#fbbf24" },
      { type: "circulation", label: "Circulation", color: "#fcd34d" },
      { type: "core", label: "Core/MEP", color: "#94a3b8" },
      { type: "support", label: "Support", color: "#cbd5e1" },
      { type: "outdoor", label: "Outdoor", color: "#a7f3d0" },
      { type: "public", label: "Public Space", color: "#fbbf24" }
    ];

    const legend = svg.append("g")
      .attr("transform", `translate(20, ${height - 30})`);

    legendData.forEach((item, i) => {
      const x = (i % 4) * 150;
      const y = Math.floor(i / 4) * 20;
      
      legend.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 6)
        .attr("fill", item.color);
      
      legend.append("text")
        .attr("x", x + 12)
        .attr("y", y + 4)
        .style("font-size", "11px")
        .style("fill", "#475569")
        .text(item.label);
    });

  }, [selectedFloor]);

  const currentFloor = buildingData[selectedFloor];

  // Calculate statistics
  const stats = currentFloor ? {
    leasable: currentFloor.spaces.filter(s => s.type === "leasable" || s.type === "units").reduce((sum, s) => sum + s.area, 0),
    core: currentFloor.spaces.filter(s => s.type === "core").reduce((sum, s) => sum + s.area, 0),
    circulation: currentFloor.spaces.filter(s => s.type === "circulation").reduce((sum, s) => sum + s.area, 0),
    amenity: currentFloor.spaces.filter(s => s.type === "amenity" || s.type === "outdoor" || s.type === "public").reduce((sum, s) => sum + s.area, 0),
  } : null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Floor-by-Floor Program Analysis</h1>
          <p className="text-gray-600 mb-4">1225 Broadway - Detailed Space Breakdown</p>
          
          {/* Floor Selector */}
          <div className="flex flex-wrap gap-2">
            {floorOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedFloor(option.id)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  selectedFloor === option.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bubble Diagram */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="p-4 text-white font-semibold"
                style={{ backgroundColor: currentFloor?.color }}
              >
                <h2 className="text-lg">Space Allocation Bubble Diagram</h2>
              </div>
              <div ref={svgRef} style={{ width: "100%", height: "600px" }} className="bg-white" />
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            {/* Statistics */}
            {stats && (
              <div className="bg-white rounded-lg shadow-lg p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Floor Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Total Area</span>
                    <span className="font-bold text-gray-900">{currentFloor.totalArea.toLocaleString()} SF</span>
                  </div>
                  {stats.leasable > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-gray-600">Leasable/Units</span>
                      <span className="font-bold text-blue-700">{stats.leasable.toLocaleString()} SF</span>
                    </div>
                  )}
                  {stats.amenity > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-gray-600">Amenity/Public</span>
                      <span className="font-bold text-amber-600">{stats.amenity.toLocaleString()} SF</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Core/MEP</span>
                    <span className="font-bold text-gray-600">{stats.core.toLocaleString()} SF</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Circulation</span>
                    <span className="font-bold text-yellow-600">{stats.circulation.toLocaleString()} SF</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-semibold text-gray-900">Efficiency</span>
                    <span className="font-bold text-green-700">
                      {((stats.leasable / currentFloor.totalArea) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Hovered Space */}
            {hoveredSpace && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-5 border-2 border-blue-300">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{hoveredSpace.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Area:</span>
                    <span className="font-bold">{hoveredSpace.area.toLocaleString()} SF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Type:</span>
                    <span className="font-bold capitalize">{hoveredSpace.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">% of Floor:</span>
                    <span className="font-bold">
                      {((hoveredSpace.area / currentFloor.totalArea) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Space List */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Space Breakdown</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentFloor?.spaces.map((space, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition text-sm"
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded mr-2"
                        style={{ backgroundColor: space.color }}
                      />
                      <span className="text-gray-800">{space.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {space.area.toLocaleString()} SF
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow p-4">
              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Quick Jump</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => setSelectedFloor("1")}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                  Retail Floors
                </button>
                <button 
                  onClick={() => setSelectedFloor("6-10")}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                  Office Floors
                </button>
                <button 
                  onClick={() => setSelectedFloor("16")}
                  className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition"
                >
                  Amenity Deck
                </button>
                <button 
                  onClick={() => setSelectedFloor("17-29")}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                >
                  Residential
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-red-500 text-white rounded-lg shadow-lg p-5 text-center">
            <div className="text-3xl font-bold mb-1">122,700</div>
            <div className="text-sm opacity-90">SF Retail NLA</div>
            <div className="text-xs opacity-75 mt-1">Floors 1-5</div>
          </div>
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-5 text-center">
            <div className="text-3xl font-bold mb-1">213,531</div>
            <div className="text-sm opacity-90">SF Office NLA</div>
            <div className="text-xs opacity-75 mt-1">Floors 6-15</div>
          </div>
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-5 text-center">
            <div className="text-3xl font-bold mb-1">325</div>
            <div className="text-sm opacity-90">Residential Units</div>
            <div className="text-xs opacity-75 mt-1">Floors 16-43</div>
          </div>
          <div className="bg-amber-500 text-white rounded-lg shadow-lg p-5 text-center">
            <div className="text-3xl font-bold mb-1">33,940</div>
            <div className="text-sm opacity-90">SF Outdoor Space</div>
            <div className="text-xs opacity-75 mt-1">Terraces + Balconies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorProgramBubbles;
