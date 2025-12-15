document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('concept-venn-container');
    if (!container) return;

    const width = 700;
    const height = 500;
    let selected = null;

    // Create SVG
    const svg = d3.select(container)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .style('max-width', '100%')
        .style('height', 'auto');

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .style('font-size', '24px')
        .style('font-weight', '700')
        .style('fill', '#1a202c')
        .text('CONCEPT AND PRECEDENTS');

    const g = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2 + 50})`);  // Moved down slightly to accommodate larger spacing

    const radius = 90;  // Slightly smaller radius to accommodate more spacing
    const offset = 120;  // Increased from 70 to 120 for more spacing

    const concepts = [
        {
            id: 'bio',
            name: 'FACADE\nFLUIDITY',
            color: '#10b981',
            cx: -offset * 0.9,  // Adjusted horizontal position
            cy: -offset * 0.7,   // Adjusted vertical position
            desc: 'Parametric fluid facade rationalizing repeated floor plates',
            image: 'images/8 spruce Frank Ghery.jpg',
            examples: [
                '• 8 Spruce Street by Frank Gehry',
                '• Parametric metal panel system',
                '• Wave-like undulations'
            ],
            atSite: [
                '• Fluid Broadway facade',
                '• Rationalized panelization',
                '• Repeating floor plates'
            ]
        },
        {
            id: 'gaudi',
            name: 'OPEN LOBBY\nCONCEPT',
            color: '#ef4444',
            cx: offset * 0.9,   // Adjusted horizontal position
            cy: -offset * 0.7,   // Adjusted vertical position
            desc: 'Inspired by Gaudí: Fluid public spaces attracting visitors',
            image: 'images/Antonio Gaudi Lobby Concept.jpg',
            examples: [
                '• Gaudí: Organic forms',
                '• Flowing spatial experience',
                '• Natural light integration'
            ],
            atSite: [
                '• Open public arcade',
                '• Triple-height atrium',
                '• Curved organic columns'
            ]
        },
        {
            id: 'modern',
            name: 'BALCONY\nALIGNMENT',
            color: '#3b82f6',
            cx: 0,
            cy: offset * 0.8,    // Slightly adjusted vertical position
            desc: 'Dynamic balcony alignment creating visual rhythm',
            image: 'images/Telus Sky Balcony Design.jpg',
            examples: [
                '• Telus Sky Tower by BIG',
                '• Rotating floor plates',
                '• Dynamic silhouette'
            ],
            atSite: [
                '• 6\' deep balconies',
                '• Parametric alignment',
                '• Visual movement'
            ]
        }
    ];

    // Gradients with Figma-style highlights
    const defs = svg.append('defs');
    
    // Add filter for bubble highlight
    const filter = defs.append('filter')
        .attr('id', 'bubble-glow')
        .attr('height', '160%')
        .attr('width', '160%')
        .attr('x', '-30%')
        .attr('y', '-30%');
    
    filter.append('feGaussianBlur')
        .attr('stdDeviation', '4')
        .attr('result', 'blur');
    
    filter.append('feComposite')
        .attr('in', 'SourceGraphic')
        .attr('in2', 'blur')
        .attr('operator', 'over');

    // Concept gradients with Figma-style highlights
    concepts.forEach(c => {
        // Main gradient
        const grad = defs.append('radialGradient')
            .attr('id', `g-${c.id}`)
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('cx', '0')
            .attr('cy', '0')
            .attr('r', radius * 1.5);
            
        grad.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', d3.color(c.color).brighter(0.8))
            .attr('stop-opacity', 0.9);
            
        grad.append('stop')
            .attr('offset', '70%')
            .attr('stop-color', c.color)
            .attr('stop-opacity', 0.7);
            
        grad.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', d3.color(c.color).darker(0.4))
            .attr('stop-opacity', 0.6);
            
        // Highlight gradient
        const highlightGrad = defs.append('radialGradient')
            .attr('id', `g-${c.id}-highlight`)
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('cx', '0')
            .attr('cy', '0')
            .attr('r', radius * 0.6);
            
        highlightGrad.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#ffffff')
            .attr('stop-opacity', '0.3');
            
        highlightGrad.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#ffffff')
            .attr('stop-opacity', '0');
    });

    // Center gradient with Figma-style highlights
    const centerGrad = defs.append('radialGradient')
        .attr('id', 'g-center')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('cx', '0')
        .attr('cy', '0')
        .attr('r', radius * 1.5);
        
    centerGrad.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#fcd34d')
        .attr('stop-opacity', '0.9');
        
    centerGrad.append('stop')
        .attr('offset', '70%')
        .attr('stop-color', '#f59e0b')
        .attr('stop-opacity', '0.8');
        
    centerGrad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#d97706')
        .attr('stop-opacity', '0.7');
        
    // Center highlight
    const centerHighlight = defs.append('radialGradient')
        .attr('id', 'g-center-highlight')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('cx', '0')
        .attr('cy', '0')
        .attr('r', radius * 0.5);
        
    centerHighlight.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', '0.4');
        
    centerHighlight.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', '0');

    // Draw concept circles with Figma-style effects
    concepts.forEach(c => {
        const circleGroup = g.append('g')
            .attr('class', `bubble ${c.id}`)
            .attr('transform', `translate(${c.cx}, ${c.cy})`)
            .style('cursor', 'pointer')
            .on('mouseover', function() {
                d3.select(this).select('.bubble-main')
                    .transition()
                    .duration(200)
                    .attr('r', radius * 1.05);
            })
            .on('mouseout', function() {
                d3.select(this).select('.bubble-main')
                    .transition()
                    .duration(200)
                    .attr('r', radius);
            })
            .on('click', () => showDetails(c));

        // Main bubble
        circleGroup.append('circle')
            .attr('class', 'bubble-main')
            .attr('r', radius)
            .attr('fill', `url(#g-${c.id})`)
            .attr('stroke', d3.color(c.color).darker(0.3))
            .attr('stroke-width', 1.5)
            .style('filter', 'url(#bubble-glow)')
            .style('transition', 'r 0.2s ease, fill-opacity 0.2s ease');
            
        // Highlight effect
        circleGroup.append('circle')
            .attr('class', 'bubble-highlight')
            .attr('r', radius * 0.7)
            .attr('fill', `url(#g-${c.id}-highlight)`)
            .attr('opacity', 0.7);
            
        // Inner glow
        circleGroup.append('circle')
            .attr('r', radius * 0.95)
            .attr('fill', 'none')
            .attr('stroke', 'rgba(255,255,255,0.3)')
            .attr('stroke-width', 1);

        // Labels
        const lines = c.name.split('\n');
        lines.forEach((line, i) => {
            circleGroup.append('text')
                .attr('y', (i - lines.length/2 + 0.5) * 16)
                .attr('text-anchor', 'middle')
                .style('font-size', '13px')
                .style('font-weight', '700')
                .style('fill', '#ffffff')
                .style('pointer-events', 'none')
                .style('text-shadow', '0 1px 2px rgba(0,0,0,0.3)')
                .style('paint-order', 'stroke')
                .style('stroke', 'rgba(0,0,0,0.2)')
                .style('stroke-width', '2px')
                .style('stroke-linecap', 'round')
                .style('stroke-linejoin', 'round')
                .text(line);
        });
    });

    // Center circle with Figma-style effects
    const centerGroup = g.append('g')
        .attr('class', 'center-bubble')
        .style('cursor', 'pointer')
        .on('mouseover', function() {
            d3.select(this).select('.center-bubble-main')
                .transition()
                .duration(200)
                .attr('r', 52);
        })
        .on('mouseout', function() {
            d3.select(this).select('.center-bubble-main')
                .transition()
                .duration(200)
                .attr('r', 50);
        })
        .on('click', () => showDetails({
            id: 'all',
            name: 'INTEGRATED\nDESIGN',
            desc: 'Complete synthesis of all three approaches',
            examples: [
                '• Parametric glass with biomimetic patterns',
                '• Organic columns in public arcade',
                '• Staggered balconies in fractal pattern'
            ]
        }));
        
    // Main center bubble
    centerGroup.append('circle')
        .attr('class', 'center-bubble-main')
        .attr('r', 50)
        .attr('fill', 'url(#g-center)')
        .attr('stroke', '#b45309')
        .attr('stroke-width', 2)
        .style('filter', 'url(#bubble-glow)')
        .style('transition', 'r 0.2s ease')
        .style('box-shadow', '0 4px 20px rgba(0,0,0,0.15)');
        
    // Center highlight
    centerGroup.append('circle')
        .attr('r', 35)
        .attr('fill', 'url(#g-center-highlight)')
        .attr('opacity', 0.8);
        
    // Inner glow
    centerGroup.append('circle')
        .attr('r', 48)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.4)')
        .attr('stroke-width', 1);

    ['INTEGRATED', 'DESIGN'].forEach((line, i) => {
        g.append('text')
            .attr('y', -8 + i * 16)
            .attr('text-anchor', 'middle')
            .style('font-size', '22px')
            .style('font-weight', '600')
            .style('fill', '#e8eaed')
            .style('letter-spacing', '0.5px')
            .style('pointer-events', 'none')
            .style('text-shadow', '0 1px 2px rgba(0,0,0,0.4)')
            .style('letter-spacing', '0.5px')
            .text(line);
    });

    // Create details container
    const detailsContainer = d3.select(container)
        .append('div')
            .style('background', 'rgba(26, 29, 39, 0.8)')
            .style('border-top', '1px solid rgba(255, 255, 255, 0.1)')
            .style('padding', '1.25rem')
            .style('backdrop-filter', 'blur(8px)')
            .style('border-radius', '0 0 12px 12px');

    // Show initial message
    detailsContainer
        .append('p')
        .attr('class', 'text-center text-gray-600 text-sm')
        .text('Click on any zone to see details');

    // Function to show details
    function showDetails(concept) {
        selected = concept;
        detailsContainer.html('');

        // Header
        const header = detailsContainer.append('div')
            .style('display', 'flex')
            .style('justify-content', 'space-between')
            .style('align-items', 'flex-start')
            .style('margin-bottom', '0.75rem');

        header.append('h3')
            .attr('class', 'text-xl font-bold text-gray-900')
            .text(concept.name.replace('\n', ' '));

        header.append('button')
            .text('×')
            .style('background', 'none')
            .style('border', 'none')
            .style('font-size', '1.5rem')
            .style('line-height', '1')
            .style('cursor', 'pointer')
            .style('color', '#6b7280')
            .on('click', () => {
                selected = null;
                detailsContainer.html('')
                    .append('p')
                    .attr('class', 'text-center text-gray-600 text-sm')
                    .text('Click on any zone to see details');
            });

        // Description
        detailsContainer.append('p')
            .attr('class', 'text-gray-700 mb-4')
            .text(concept.desc);

        // Content based on concept
        if (concept.id === 'all') {
            // Integrated design view
            const integrationGrid = detailsContainer.append('div')
                .style('display', 'grid')
                .style('grid-template-columns', 'repeat(3, 1fr)')
                .style('gap', '0.75rem');

            const integrationItems = [
                { 
                    title: 'Facade Fluidity', 
                    color: 'bg-green-50', 
                    border: 'border-green-600', 
                    text: 'text-green-900', 
                    content: 'Parametric fluid facade with rationalized components',
                    image: 'images/8 spruce Frank Ghery.jpg'
                },
                { 
                    title: 'Open Lobby', 
                    color: 'bg-red-50', 
                    border: 'border-red-600', 
                    text: 'text-red-900', 
                    content: 'Gaudí-inspired flowing public space',
                    image: 'images/Antonio Gaudi Lobby Concept.jpg'
                },
                { 
                    title: 'Balcony Design', 
                    color: 'bg-blue-50', 
                    border: 'border-blue-600', 
                    text: 'text-blue-900', 
                    content: 'Dynamic alignment inspired by Telus Sky',
                    image: 'images/Telus Sky Balcony Design.jpg'
                }
            ];

            integrationItems.forEach(item => {
                const itemDiv = integrationGrid.append('div')
                    .attr('class', `${item.color} p-3 rounded border-l-4 ${item.border} overflow-hidden`);
                
                itemDiv.append('img')
                    .attr('src', item.image)
                    .attr('alt', item.title)
                    .style('width', '100%')
                    .style('height', '150px')
                    .style('object-fit', 'cover')
                    .style('margin-bottom', '0.5rem')
                    .style('border-radius', '0.25rem');
                
                itemDiv.append('div')
                    .attr('class', `font-bold ${item.text} mb-1`)
                    .text(item.title);
                    
                itemDiv.append('div')
                    .attr('class', 'text-gray-700 text-sm')
                    .text(item.content);
            });
        } else {
            // Add concept image
            if (concept.image) {
                detailsContainer.append('img')
                    .attr('src', concept.image)
                    .attr('alt', concept.name)
                    .style('width', '100%')
                    .style('max-height', '300px')
                    .style('object-fit', 'cover')
                    .style('margin-bottom', '1rem')
                    .style('border-radius', '0.5rem')
                    .style('border', '1px solid rgba(0,0,0,0.1)');
            }

            // Description
            detailsContainer.append('p')
                .style('color', '#4b5563')
                .style('margin-bottom', '1.5rem')
                .style('line-height', '1.6')
                .text(concept.desc);

            // Two-column layout for examples and site application
            const grid = detailsContainer.append('div')
                .style('display', 'grid')
                .style('grid-template-columns', '1fr 1fr')
                .style('gap', '2rem')
                .style('font-size', '0.9375rem');

            // Examples column
            const examplesCol = grid.append('div');
            examplesCol.append('div')
                .style('font-weight', '600')
                .style('margin-bottom', '0.75rem')
                .style('color', concept.id === 'bio' ? '#065f46' : concept.id === 'gaudi' ? '#991b1b' : '#1e40af')
                .style('font-size', '1.05em')
                .style('border-bottom', '2px solid')
                .style('border-color', concept.id === 'bio' ? '#10b981' : concept.id === 'gaudi' ? '#ef4444' : '#3b82f6')
                .style('padding-bottom', '0.25rem')
                .text('PRECEDENT FEATURES');
            
            const examplesList = examplesCol.append('div')
                .style('color', '#4b5563');
            
            concept.examples.forEach(item => {
                examplesList.append('div')
                    .style('margin-bottom', '0.5rem')
                    .style('display', 'flex')
                    .style('align-items', 'flex-start')
                    .html(`
                        <span style="display:inline-block; width:6px; height:6px; background:${concept.id === 'bio' ? '#10b981' : concept.id === 'gaudi' ? '#ef4444' : '#3b82f6'}; border-radius:50%; margin:0.5em 0.5em 0 0;"></span>
                        <span>${item}</span>
                    `);
            });

            // At Site column
            const siteCol = grid.append('div');
            siteCol.append('div')
                .style('font-weight', '600')
                .style('margin-bottom', '0.75rem')
                .style('color', concept.id === 'bio' ? '#065f46' : concept.id === 'gaudi' ? '#991b1b' : '#1e40af')
                .style('font-size', '1.05em')
                .style('border-bottom', '2px solid')
                .style('border-color', concept.id === 'bio' ? '#10b981' : concept.id === 'gaudi' ? '#ef4444' : '#3b82f6')
                .style('padding-bottom', '0.25rem')
                .text('AT 1225 BROADWAY');
            
            const siteList = siteCol.append('div')
                .style('color', '#4b5563');
            
            concept.atSite.forEach(item => {
                siteList.append('div')
                    .style('margin-bottom', '0.5rem')
                    .style('display', 'flex')
                    .style('align-items', 'flex-start')
                    .html(`
                        <span style="display:inline-block; width:6px; height:6px; background:${concept.id === 'bio' ? '#10b981' : concept.id === 'gaudi' ? '#ef4444' : '#3b82f6'}; border-radius:50%; margin:0.5em 0.5em 0 0;"></span>
                        <span>${item}</span>
                    `);
            });
        }
    }

    // Add quick reference
    const reference = d3.select(container)
        .append('div')
        .style('margin-top', '1.5rem')
        .style('display', 'grid')
        .style('grid-template-columns', 'repeat(3, 1fr)')
        .style('gap', '1rem');

    const references = [
        { color: 'bg-green-500', title: 'Nature', desc: 'Organic forms + patterns' },
        { color: 'bg-red-500', title: 'Flow', desc: 'Public engagement' },
        { color: 'bg-blue-500', title: 'Efficiency', desc: 'Modern systems' }
    ];

    references.forEach(ref => {
        reference.append('div')
            .attr('class', `${ref.color} text-white p-4 rounded-lg text-center`)
            .html(`
                <div class="text-2xl font-bold mb-1">${ref.title}</div>
                <div class="text-xs opacity-90">${ref.desc}</div>
            `);
    });
});
