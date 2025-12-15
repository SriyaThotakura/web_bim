// Balcony Facade Diagram - Vanilla JS Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create container for the diagram
    const container = document.createElement('div');
    container.className = 'diagram-container';
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.minHeight = '800px';
    container.style.overflow = 'auto';
    container.style.padding = '2rem 0';
    container.style.backgroundColor = '#1e293b';
    container.style.borderRadius = '12px';
    container.style.margin = '60px auto';
    container.style.maxWidth = '1500px';
    container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Complex Balcony Facade Design';
    title.style.textAlign = 'center';
    title.style.color = '#f8fafc';
    title.style.marginBottom = '2rem';
    title.style.fontSize = '1.5rem';
    title.style.fontWeight = '600';
    container.appendChild(title);

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '800');
    svg.style.display = 'block';
    svg.style.margin = '0 auto';
    container.appendChild(svg);

    // Define arrow marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#94a3b8');
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Data for the diagram
    const strategies = [
        { id: 1, name: 'Mass-Customization', color: '#fef3c7', x: 150, y: 180 },
        { id: 2, name: 'Programmatic Transformation', color: '#fce7f3', x: 550, y: 180 },
        { id: 3, name: 'Environmental Optimization', color: '#dcfce7', x: 950, y: 180 },
        { id: 4, name: 'BIM', color: '#f3e8ff', x: 1300, y: 180 }
    ];

    const nodes = [
        // Strategy 1 nodes
        { id: 'n1', strategy: 1, text: 'Digital Sculpting\nNURBS Surface', x: 150, y: 310 },
        { id: 'n2', strategy: 1, text: 'Panelization Logic\nDivide into Components', x: 150, y: 440 },
        { id: 'n3', strategy: 1, text: 'Data Output\nCNC Files & BOM', x: 150, y: 560 },
        { id: 'n4', strategy: 1, text: 'Unique Fabrication Data\nPer Panel ID', x: 150, y: 680 },
        
        // Strategy 2 nodes
        { id: 'n5', strategy: 2, text: 'Define Attractors\nProgrammatic Parameters', x: 550, y: 310 },
        { id: 'n6', strategy: 2, text: 'Interpolation Algorithm\nZ-axis Control', x: 550, y: 440 },
        { id: 'n7', strategy: 2, text: 'Stepping Motion\nHorizontal Offset', x: 550, y: 560 },
        { id: 'n8', strategy: 2, text: 'Balcony Depth Check\nHabitability Validation', x: 550, y: 680 },
        
        // Strategy 3 nodes
        { id: 'n9', strategy: 3, text: 'Solar Analysis\nSun Path Studies', x: 950, y: 310 },
        { id: 'n10', strategy: 3, text: 'Balcony Shading\nOptimize Depth & Angle', x: 950, y: 440 },
        { id: 'n11', strategy: 3, text: 'View Corridor Mapping\nQuality Score', x: 950, y: 560 },
        
        // Strategy 4 nodes
        { id: 'n12', strategy: 4, text: 'Model Linking\nGeometric to BIM', x: 1300, y: 310 },
        { id: 'n13', strategy: 4, text: 'Logistics Simulation\nDelivery & Installation', x: 1300, y: 440 },
        { id: 'n14', strategy: 4, text: 'As-Built Capture\n3D Scanning & Comparison', x: 1300, y: 560 }
    ];

    const connections = [
        // Strategy 1 flow
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        
        // Strategy 2 flow
        { from: 'n5', to: 'n6' },
        { from: 'n6', to: 'n7' },
        { from: 'n7', to: 'n8' },
        
        // Strategy 3 flow
        { from: 'n9', to: 'n10' },
        { from: 'n10', to: 'n11' },
        
        // Strategy 4 flow
        { from: 'n12', to: 'n13' },
        { from: 'n13', to: 'n14' }
    ];

    // Draw connections first (so they appear behind nodes)
    connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
            // Create a path with right angles for better flow
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            // Calculate path data
            const midY = (fromNode.y + toNode.y) / 2;
            const pathData = `M${fromNode.x},${fromNode.y + 30} ` +  // Start at bottom of from node
                           `V${midY - 10} ` +                        // Vertical line up to just before midpoint
                           `H${toNode.x} ` +                         // Horizontal line to x position of to node
                           `V${toNode.y - 10}`;                      // Vertical line up to just below to node
            
            path.setAttribute('d', pathData);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', '#94a3b8');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('marker-end', 'url(#arrowhead)');
            svg.appendChild(path);
            
            // Add a small vertical line at the end to connect to the node
            const endLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            endLine.setAttribute('x1', toNode.x);
            endLine.setAttribute('y1', toNode.y - 10);
            endLine.setAttribute('x2', toNode.x);
            endLine.setAttribute('y2', toNode.y - 20);
            endLine.setAttribute('stroke', '#94a3b8');
            endLine.setAttribute('stroke-width', '2');
            endLine.setAttribute('stroke-linecap', 'round');
            svg.appendChild(endLine);
        }
    });

    // Draw strategy boxes
    strategies.forEach(strategy => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', strategy.x - 100);
        rect.setAttribute('y', strategy.y - 20);
        rect.setAttribute('width', '200');
        rect.setAttribute('height', '40');
        rect.setAttribute('rx', '8');
        rect.setAttribute('fill', strategy.color);
        rect.setAttribute('stroke', '#334155');
        rect.setAttribute('stroke-width', '2');
        svg.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', strategy.x);
        text.setAttribute('y', strategy.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', '600');
        text.setAttribute('fill', '#1e293b');
        text.textContent = `Strategy ${strategy.id}: ${strategy.name}`;
        svg.appendChild(text);
    });

    // Draw nodes
    nodes.forEach(node => {
        // Node background
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', node.x - 100);
        rect.setAttribute('y', node.y - 30);
        rect.setAttribute('width', '200');
        rect.setAttribute('height', '60');
        rect.setAttribute('rx', '6');
        rect.setAttribute('fill', '#334155');
        rect.setAttribute('stroke', '#475569');
        rect.setAttribute('stroke-width', '1');
        rect.setAttribute('class', 'node');
        rect.style.cursor = 'pointer';
        rect.style.transition = 'all 0.2s';
        
        // Add hover effect
        rect.addEventListener('mouseover', () => {
            rect.setAttribute('fill', '#3e4c5e');
            rect.setAttribute('stroke', '#60a5fa');
        });
        
        rect.addEventListener('mouseout', () => {
            rect.setAttribute('fill', '#334155');
            rect.setAttribute('stroke', '#475569');
        });
        
        svg.appendChild(rect);

        // Node text (split into lines)
        const lines = node.text.split('\n');
        lines.forEach((line, i) => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y - 10 + (i * 16));
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', '#e2e8f0');
            text.textContent = line;
            svg.appendChild(text);
        });
    });

    // Add highlight boxes
    const highlightBoxes = [
        { strategy: 1, text: 'Frank Ghery, 8 Spruce Facade', x: 150, y: 310 },
        { strategy: 2, text: 'Use Tekla Sky Tower, BIG', x: 550, y: 310 }
    ];

    highlightBoxes.forEach(box => {
        // Draw highlight box
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', box.x - 90);
        rect.setAttribute('y', box.y - 40);
        rect.setAttribute('width', '180');
        rect.setAttribute('height', '30');
        rect.setAttribute('rx', '4');
        rect.setAttribute('fill', '#f59e0b');
        rect.setAttribute('stroke', '#d97706');
        rect.setAttribute('stroke-width', '1');
        svg.appendChild(rect);

        // Add highlight text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', box.x);
        text.setAttribute('y', box.y - 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', '600');
        text.setAttribute('fill', '#1e293b');
        text.textContent = box.text;
        svg.appendChild(text);

        // Add "Precedent" label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', box.x - 80);
        label.setAttribute('y', box.y - 50);
        label.setAttribute('font-size', '10');
        label.setAttribute('fill', '#94a3b8');
        label.textContent = 'Precedent';
        svg.appendChild(label);

        // Add arrow
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        arrow.setAttribute('x1', box.x - 30);
        arrow.setAttribute('y1', box.y - 40);
        arrow.setAttribute('x2', box.x);
        arrow.setAttribute('y2', box.y - 10);
        arrow.setAttribute('stroke', '#94a3b8');
        arrow.setAttribute('stroke-width', '1.5');
        arrow.setAttribute('marker-end', 'url(#arrowhead)');
        svg.appendChild(arrow);
    });

    // Add the diagram to the page
    const targetSection = document.querySelector('.gallery-section:last-of-type');
    if (targetSection) {
        targetSection.parentNode.insertBefore(container, targetSection.nextSibling);
    } else {
        document.body.appendChild(container);
    }
});
