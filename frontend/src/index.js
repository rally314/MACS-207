import Graph from "react-graph-vis";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { csvToObjs } from "./csv-parser";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

// Set the colors for director and cast member nodes
const CAST_MEMBER_COLOR = "#e04141";
const DIRECTOR_COLOR = "#7be041";

/**
 * Returns a list of directors, duplicates removed
 * @param {Array} actorsData Array of objects. Each object should be a CSV row.
 */
const getDistinctDirectors = (actorsData) => {
  const directors = [];

  for (let i = 0; i < actorsData.length; i++) {
    if (!directors.includes(actorsData[i].Director))
      directors.push(actorsData[i].Director)
  }

  return directors;
}

/**
 * Entry point to the applicaiton. Renders the screen
 */
const App = () => {
  /**
   * This does all the main work in the application. It constructs the graph's nodes and edges
   */
  const createGraph = () => {
    const nodes = [];
    const edges = [];

    const actorsData = csvToObjs();
    const directors = getDistinctDirectors(actorsData)

    // Add all directors to graph
    let i = 0;
    for (; i < directors.length; i++) {
      let node = {
        id: i,
        label: directors[i],
        color: DIRECTOR_COLOR,
      }

      nodes.push(node);
    }

    // For each actor, create a node and edge
    for (let j = 0; j < actorsData.length; j++) {
      let node = {
        id: i + j,
        label: actorsData[j].CastMember,
        color: CAST_MEMBER_COLOR,
      }

      let edge = null;

      // If the actor already exists, don't create a new node, reuse the existing one
      let existingNode = nodes.find((n) => n.label === actorsData[j].CastMember)
      if (existingNode) {
        edge = {
          to: existingNode.id,
          from: directors.indexOf(actorsData[j].Director)
        }
      } else {
        nodes.push(node);
        edge = {
          to: i + j,
          from: directors.indexOf(actorsData[j].Director)
        }
      }

      edges.push(edge)
    }

    return {
      nodes: nodes,
      edges: edges
    }
  }

  // Sets the state of the graph
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

  // Displays the graph
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
