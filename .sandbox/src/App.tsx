import './App.css';
import { Tree } from "react-arborist";

// import { NodeHandlers, NodeRendererProps } from "react-arborist";


const data = {
    id: "The Root",
    children: [{ id: "Node A" }, { id: "Node B" }]
}

function Node({ ref, styles, data }) {
    return (
        <div ref={ref}>
            <div>
                {data.name}
            </div>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <div className="workspace-leaf-content" data-type="collection-manager">
                <div className="view-content">
                    
                    <h4>React Arborist Tree Component Test</h4>
                    
                    <Tree data={data}>{Node}</Tree>

                </div>
            </div>
        </div>
    );
}

export default App;

