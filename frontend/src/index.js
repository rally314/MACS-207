import Graph from "react-graph-vis";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { csvToObjs } from "./csv-parser";

const DATA_FILENAME = "./data.csv";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const CAST_MEMBER_COLOR = "#e04141";
const DIRECTOR_COLOR = "#7be041";

const getDistinctDirectors = (actorsData) => {
  const directors = [];

  for (let i = 0; i < actorsData.length; i++) {
    if (!directors.includes(actorsData[i].Director))
      directors.push(actorsData[i].Director)
  }

  return directors;
}

const App = () => {
  const createGraph = () => {
    const nodes = [];
    const edges = [];

    const actorsData = csvToObjs();
    const directors = getDistinctDirectors(actorsData)
    let i = 0;
    for (; i < directors.length; i++) {
      let node = {
        id: i,
        label: directors[i],
        color: DIRECTOR_COLOR,
      }

      nodes.push(node);
    }


    for (let j = 0; j < actorsData.length; j++) {
      let node = {
        id: i + j,
        label: actorsData[i].CastMember,
        color: CAST_MEMBER_COLOR,
      }

      nodes.push(node);
    }

    return {
      nodes: nodes,
      edges: edges
    }
  }

  const [state, setState] = useState({
    counter: 5,
    graph: createGraph(),
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        alert("Selected node: " + nodes);
      },
    }
  })

  const { graph, events } = state;
  return (
    <div>
      <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
    </div>
  );

}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
