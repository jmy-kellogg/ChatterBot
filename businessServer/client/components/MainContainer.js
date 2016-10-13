import React from 'react';
import Product from './Product';
// import Layers from './Layers';
import Layer from './Layer';
import TopLayer from './topLayer';
import axios from 'axios';


const MainContainer = React.createClass({
  componentWillMount: function(){
    var _nodesIdArr = [];
    var _nodesArr = [];
    var allConnections;
    var _products = [];
    var sortNumbers = function(a,b){
      return a-b;
    }

    if(this.props.params.businessId){
      axios.get(`/api/connections/?businessId=${this.props.params.businessId}`)
      .then(res => res.data)
      .then(connections => {
        allConnections = connections;

        this.props.loadConnections(connections);

        connections.forEach(conn => {
          if(conn.fromId && !_nodesIdArr.includes(conn.fromId)){
            _nodesIdArr.push(conn.fromId);
          }
          if(conn.toId && !_nodesIdArr.includes(conn.toId)){
            _nodesIdArr.push(conn.toId);
          }
        })

      })
      .then(data => {
        // console.log(_nodesIdArr.sort(sortNumbers));
        // var headNodeId = Math.min(..._nodesIdArr);
        // this.setState({
        //   headNode: headNodeId
        // })

        allConnections.forEach(conn => {
          if(conn.id === conn.productId){
            _products.push(conn);
          }
        })
        console.log(_products);
        this.props.loadProducts(_products);

        axios.get(`/api/nodes/`)
          .then(res => res.data)
          .then(nodes => {
            _nodesIdArr.forEach(nodeId => {
              _nodesArr.push(getNodeById(nodeId, nodes))
            })
            // this.props.setHeadNode(headNodeId);

            this.props.loadNodes(_nodesArr);
          })



        var getNodeById = function(id, nodes){
          var _node;
          nodes.forEach(node => {
            if(node.id == id){
              _node = node;
            }
          })
          return _node;
        }

      })
    }

  },

  render: function(){
    var layersDiv = this.props.layers.map((layer, i) => {
      return (
        <div className="layerCol" key={i}>
        {/*layer {i+3}*/}
          <Layer {...this.props} key={i} layer={i+2} data={layer} />
        </div>
      )
    })
    return (
      <div className="chatbotPage">
        <Product {...this.props} layer={0}/>
        <TopLayer {...this.props} layer={1}/>
        {layersDiv}
      </div>

    )
  }
});

export default MainContainer