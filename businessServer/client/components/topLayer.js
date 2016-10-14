import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';
import { Carousel } from 'react-bootstrap';

const TopLayer = React.createClass({
    addTopLayerNode: function(e){
    var currentConn;

    e.preventDefault();
    axios.post('/api/nodes', {
      question: "default question",
      productId: this.props.prodSelected,
      topLevel: true,
      layer: 1
    })
    .then(node => node.data)
    .then(node => {
    // console.log(this.props);
      this.props.addNewNode(node.productId, node.id, 1, true, node.productId);
      return node;
    })
    .then(node => {
      axios.put(`/api/connections/${this.props.prodSelected}`,{
        toId: node.id
      })
    })
    .catch(e => {
      if(e) throw e;
    })

  },

  handleSelected: function(node, e){

    this.props.changeSelected(node.id, node.layer);

  },
render: function(){
  var nodesArr = [];
  for(var key in this.props.node){

    if(this.props.node[key].topLevel && this.props.node[key].productId == this.props.prodSelected){
      nodesArr.push(this.props.node[key]);
    }
  }

  const nodesDiv = nodesArr.map((node, i) => {
      var q;
      if(node.question){
        q = node.question;
      }
      else{
        q = "I'm a question? Fill me out.";
      }
     return (
      <div key={i} id={`nodeContainer${i}`} >
        <SingleForm {...this.props} id={node.id} question={q} data={node} layer={this.props.layer} />
      </div>

    )
  })
  return (
   <div className='toplayer-container'>
   <div className='addtoplayernode' onClick=''></div>
      {nodesDiv}
   </div>
)
   }
 });

 export default TopLayer
