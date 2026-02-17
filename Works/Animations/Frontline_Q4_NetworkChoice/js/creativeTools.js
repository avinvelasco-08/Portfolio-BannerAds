const scrollContainer   = document.querySelector('.tooltip-container');
const scrollContent     = document.querySelector('.disclaimer');
const customScrollbar   = document.querySelector('.scrollbar');
const scrollThumb       = document.querySelector('.scroll-thumb');

Creative.populateData = function (data)
{
    for (const key in data) {
        // If element exists with matching id, update its content or attributes
        const element = getById(key);
        if (element) {
            if (element.tagName === "IMG") {
                // For img tag, set the 'src' attribute
                element.src = data[key];
            } else if (element.tagName === "SOURCE" && element.parentElement.tagName === "VIDEO") {
                // For video source tag inside video, set the 'src' attribute
                element.src = data[key];
                element.load(); // Reload the video with the new source
            } else {
                // For other elements like text content
                element.innerHTML = data[key];
            }
        }
    }
}

Creative.splitChars = function( copyId )
{
    copyId.forEach((ids, index) => {
        const targetCopy = getById(ids);
        if (targetCopy && targetCopy.innerHTML.length > 0) {
            var splitText = new SplitText(targetCopy, {type:"chars", linesClass:"splitted-container"});
            splittedChars[index] = splitText.chars;
        }
    })
}

Creative.splitLines = function( copyId )
{
    copyId.forEach((ids, index) => {
        const targetCopy = getById(ids);
        if (targetCopy && targetCopy.innerHTML.length > 0) {
            var splitText = new SplitText(targetCopy, {type:"lines", linesClass:"splitted-container"});
            splittedLines[index] = splitText.lines;
        }
    })
}

Creative.createHotspot = function()
{
//    console.log("HOTSPOTING");
    const targetTag = getById("main")
    const uTag = getById('underlinedText');
    
    // Get the position, width, and height of the <u> tag using getBoundingClientRect
    const rect = uTag.getBoundingClientRect();
    
    // Create the hotspot div
    const hotspot = document.createElement('div');
    hotspot.classList.add('hotspot');
    hotspot.id = "hotspot";
    
    // Set the size and position of the hotspot based on the <u> tag
    hotspot.style.width = `${rect.width}px`;
    hotspot.style.height = `${rect.height}px`;
    hotspot.style.left = `${rect.left + window.scrollX}px`;  // Include scroll offsets
    hotspot.style.top = `${rect.top + window.scrollY}px`;    // Include scroll offsets
    
    // Append the hotspot to the body
    targetTag.appendChild(hotspot);
//    console.log("Target Tag = "+targetTag);
}

Creative.positionArrow = function()
{
    const uTag = getById('underlinedText');
    const arrow = getById('arrowTipContainer');
    const mainContainer = getById('main');
    
    // Get the bounding rectangle of the <u> tag and the main container
    const uRect = uTag.getBoundingClientRect();
    const containerRect = mainContainer.getBoundingClientRect();
    
    // Calculate the top center position of the <u> tag
    const uCenterX = uRect.left + (uRect.width / 2);
    const uTop = uRect.top;

    // Set the initial position for the arrow (centered above the <u> tag)
    const arrowHeight = arrow.offsetHeight;
    const arrowWidth = arrow.offsetWidth;

    // Calculate the left position for the arrow to center it
    let arrowLeft = uCenterX - (arrowWidth / 2)-7;
    let arrowTop = uTop - arrowHeight - 2; // 10px margin above the <u> tag

    // Check if the arrow goes outside the main container's boundaries
    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;

    // Ensure the arrow stays within the container
    if (arrowLeft < containerLeft) {
      arrowLeft = containerLeft; // Align to the left edge of the container
    } else if (arrowLeft + arrowWidth > containerRight) {
      arrowLeft = containerRight - arrowWidth; // Align to the right edge of the container
    }

    // Apply the calculated positions to the arrow
    arrow.style.left = `${arrowLeft + window.scrollX}px`;
    arrow.style.top = `${arrowTop + window.scrollY}px`;
  }

  Creative.positionTextBox = function( edgeGap )
  {
    const arrow = getById('arrowTipContainer');
    const tooltipContainer = getById('tooltipContainer');
    const mainContainer = getById('main');
    
    // Get the bounding rectangle of the arrow and the main container
    const arrowRect = arrow.getBoundingClientRect();
    const containerRect = mainContainer.getBoundingClientRect();
    
    // Calculate the top center position of the arrow
    const arrowCenterX = arrowRect.left + (arrowRect.width / 2);
    const arrowTop = arrowRect.top;

    // Set the initial position for the tooltipContainer (centered above the arrow)
    const tooltipContainerHeight = tooltipContainer.offsetHeight;
    const tooltipContainerWidth = tooltipContainer.offsetWidth;
    const gap = edgeGap;

    // Calculate the left position for the tooltipContainer to center it
    let tooltipContainerLeft = arrowCenterX - (tooltipContainerWidth / 2);
    let tooltipContainerTop = arrowTop - tooltipContainerHeight + 1;

    // Check if the tooltipContainer goes outside the main container's boundaries
    const containerLeft = containerRect.left + Number(gap);
    const containerRight = containerRect.right - Number(gap);

    // Ensure the tooltipContainer stays within the container
    if (tooltipContainerLeft < containerLeft) {
      tooltipContainerLeft = containerLeft; // Align to the left edge of the container
    } else if (tooltipContainerLeft + tooltipContainerWidth > containerRight) {
      tooltipContainerLeft = containerRight - tooltipContainerWidth; // Align to the right edge of the container
    }

    // Apply the calculated positions to the tooltipContainer
    tooltipContainer.style.left = `${tooltipContainerLeft + window.scrollX}px`;
    tooltipContainer.style.top = `${tooltipContainerTop + window.scrollY}px`;
  }

  // Adjust the thumb size dynamically based on the content height
  Creative.adjustThumbSize = function()
  {
    const contentHeight = scrollContent.scrollHeight;
    const containerHeight = scrollContainer.clientHeight;
    const maxHeight = customScrollbar.offsetHeight *  0.9;
    const thumbHeight = Math.max(containerHeight * (containerHeight / contentHeight), 10);
    scrollThumb.style.maxHeight = maxHeight + 'px';
    scrollThumb.style.height = `${thumbHeight}px`;
  }

  Creative.updateThumbPosition = function()
  {
    const contentHeight = scrollContent.scrollHeight - scrollContent.clientHeight;
    const scrollRatio = scrollContent.scrollTop / contentHeight;
    const thumbMaxTop = customScrollbar.clientHeight - scrollThumb.clientHeight;
    scrollThumb.style.top = `${scrollRatio * thumbMaxTop}px`;
  }

  // Sync the content scroll when dragging the thumb
 Creative.onThumbDrag = function(event) {
    const initialY = event.clientY;
    const initialThumbTop = scrollThumb.offsetTop;
  
    const onDragMove = (e) => {
      const deltaY = e.clientY - initialY;
      const newThumbTop = Math.min(Math.max(initialThumbTop + deltaY, 0), customScrollbar.clientHeight - scrollThumb.clientHeight);
      const scrollRatio = newThumbTop / (customScrollbar.clientHeight - scrollThumb.clientHeight);
      scrollContent.scrollTop = scrollRatio * (scrollContent.scrollHeight - scrollContent.clientHeight);
    };
  
    const onDragEnd = () => {
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', onDragEnd);
    };
  
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }

  Creative.addTooltip = function() 
  {
      const scrollContent   = getById("disclaimer");  
      const scrollThumb     = getById("scrollThumb");
      const closeBtn        = getById("closeBtn");
      if(!hotspotCreated)
      {
        hotspotCreated = true;
        Creative.createHotspot();
        Creative.positionArrow();
        Creative.positionTextBox(tooltipEdgeGap);
      
//        console.log(tooltipEdgeGap);

        const hotspot = getById("hotspot");

        hotspot.addEventListener( "click" , Creative.tooltipShowHide , false );
        closeBtn.addEventListener( "click" , Creative.tooltipShowHide , false );

        scrollContent.addEventListener('scroll', Creative.updateThumbPosition);

        scrollThumb.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent text selection while dragging
            Creative.onThumbDrag(e);
        });

        Creative.adjustThumbSize();
      }else{
        gsap.set("#hotspot", { autoAlpha:1 }) // Show the Tooltip
      }
        
  }

  Creative.tooltipShowHide = function()
  {
      if (isVisible) {
          gsap.set("#arrowTipContainer,#tooltipContainer", { autoAlpha:0 }) // Hide the Tooltip
      } else {
          gsap.set("#arrowTipContainer,#tooltipContainer", { autoAlpha:1 }) // Show the Tooltip
      }
      isVisible = !isVisible; // Toggle the state
  }