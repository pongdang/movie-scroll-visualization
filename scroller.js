export function scroller(visFuncList) {
  const sections = d3.selectAll(".step");
  const containerStart = 0;
  let currentIndex = -1;
  let sectionPositions = [];

  function execute() {
    // 3. 아래 내용 따라 구현하기 start
    d3.select(window).on("scroll.scroller", showCurrentVis).on("resize.scroller", setSectionPositions);
    // end

    setSectionPositions();

    const timer = d3.timer(function () {
      showCurrentVis();
      timer.stop();
    });
  }

  function setSectionPositions() {
    let startPos;
    sectionPositions = [];

    // 1. 아래 내용 따라 구현하기 start
    sections.each(function (d, i) {
      const top = this.getBoundingClientRect().top;

      if (i === 0) {
        startPos = top;
      }
      sectionPositions.push(top - startPos);
    });
    // end
  }

  function showCurrentVis() {
    const pos = window.pageYOffset - 300 - containerStart;

    // 2. 아래 내용 따라 구현하기 start
    let sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(sections.size() - 1, sectionIndex);
    // end

    if (currentIndex !== sectionIndex) {
      activate(sectionIndex);
      currentIndex = sectionIndex;
    }
  }

  function activate(index) {
    sections
      .transition()
      .duration(500)
      .style("opacity", function (d, i) {
        return i === index ? 1 : 0.1;
      });

    visFuncList[index]();
  }

  return execute;
}
