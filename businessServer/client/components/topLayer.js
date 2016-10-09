import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';


const TopLayer = React.createClass({

  handleSelected: function(node, e){

    // console.log(node);
    this.props.changeSelected(node.id, node.layer);
    var thisLayer = 2;
    // top layer has to be 2.
    // all other layers start at 3
  },
render: function(){
  // console.log(this.props);

  const nodesArr = this.props.node.filter(node => {
     return node.topLevel;
  })
  var newId = 0;
  this.props.node.forEach(node => {
    if(node.id > newId){
      newId = node.id + 1;
    }
  })
  // const newId = this.props.node.length + 1;
   const nodesDiv = nodesArr.map((node, i) => {
      var q;
      if(node.question){
        q = node.question;
      }
      else{
        q = "I'm a question? Fill me out.";
      }
     return (
      <div ref={`nodeContainer${i}`} onClick={this.handleSelected.bind(this, node)}>
        <SingleForm {...this.props} id={`node${node.id}`} question={q} layer={this.props.i} i={node.id}/>
      </div>
    )
  })
  return (
   <div>
     {nodesDiv}
   </div>
)
   }
 });

 export default TopLayer
