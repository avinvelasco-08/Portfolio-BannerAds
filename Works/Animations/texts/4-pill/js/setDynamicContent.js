// JS to set banners content to dynamic content loaded from DoubleClick

// create var to provide easy access to dynamic data
var _dynamicData = {};
var selectedFrameSequence;
//console.log("Hoxton ready!");
hoxton.timeline = Creative.tl;

// Define the function that should fire when the Ad Server is ready and assets are preloaded
hoxton.isInitialized = setDynamicContent;


/*
* Function sets any dynamic content
*/
function setDynamicContent() {
  console.log("setDynamicContent()");

  // for shorthand references to state object
  _dynamicData = hoxton.getState();

  tooltipEdgeGap = _dynamicData.tooltipEdgeGap

  Creative.setExitURL(_dynamicData.exitURL);

  selectedFrameSequence = hoxton.data["frameSequence"].value.find(item => item.selected)?.value;

  checkFontsLoaded(['VerizonNHGeDSBold', 'VerizonNHGeDSRegular'], Creative.startAd);
  adjustNonTargetedContent();
}

function adjustNonTargetedContent() {

  const textGroups = ["Heading", "SubHead", "Eyebrow", "SubLegal"];

  showNonEmptyDivs(["Eyebrow", "Heading", "SubHead", "SubLegal"]);

  Creative.applyHeadlineFontsizeScaling(["f1Heading", "f4Heading", "f3Heading", "f5Heading"]);

  Creative.splitLines(["f1Heading", "f3Heading", "f4Heading", "f5Heading"]);

  //Creative.splitChars(["f3Heading"]);

  // Auto-stop loop when frame data not found
  for (let i = 1; i < 10; i++) {
    const frame = `f${i}`;

    // Check if *any* weight field exists for this frame
    const frameExists = textGroups.some(
      section => hoxton.data[`${frame}${section}Weight`]
    );

    if (!frameExists) break; // stop loop when none of the fields exist

    // Apply font weights for existing sections
    textGroups.forEach(section => {
      const selectedFont = getSelectedThickness(frame, section);
      updateFontWeight([`#${frame}${section}`], selectedFont);
    });
  }
}

function showNonEmptyDivs(baseNames) {
  let frameIndex = 1;

  while (true) {
    const prefix = `f${frameIndex}`;
    let found = false;

    baseNames.forEach(name => {
      const el = document.getElementById(`${prefix}${name}`);
      if (el) {
        found = true;
        if (el.textContent.trim() !== "") {
          el.style.display = "block";
        } else {
          el.style.display = "none";
        }
      }
    });

    // if no elements found for this frame, stop looping
    if (!found) break;

    frameIndex++;
  }
}

function getSelectedThickness(frame, section) {
  const key = `${frame}${section}Weight`;
  const data = hoxton.data[key];
  return data ? data.value.find(item => item.selected) : null;
}

function updateFontWeight(selectors, selectedFont) {
  if (!selectedFont || !selectedFont.value) return;

  selectors.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.remove("verizon-bold", "verizon-regular");
      el.classList.add(selectedFont.value);
    }
  });
}
