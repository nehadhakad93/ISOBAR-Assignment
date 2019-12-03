import React from 'react';
import './App.css';

class ShowDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
    }
  }

  showAddButton = () => {
    this.setState({ showButton: true })
  }
  hideButton = () => {
    this.setState({ showButton: false })
  }

  add = (data) => {
    this.props.openModal(data);
  }
  render() {
    const item = this.props.item;
    return (
      <>
        <div id={item.id} className="showData-container" onMouseEnter={this.showAddButton} onMouseLeave={this.hideButton}>
          <div className="show-image">
            <img src={item && item.image} alt={item && item.image} />
          </div>
          <span>Name - {item && item.name}</span>
          <span>Description - {item && item.description}</span>
          <span>PublishDate - {this.props.sortedDate == true ?
            item.publishDate.getDate() + "-" + (item.publishDate.getMonth() + 1) + "-" + item.publishDate.getFullYear()
            :
            item.publishDate
          }</span>
          <span>Author - {item && item.author}</span>
          <span>Duration - {item && item.duration}</span>
          <button id="myBtn" onClick={() => this.add(this.props.item)} className={this.state.showButton == true ? "showButton" : "button"}>Add</button>
        </div>
      </>
    )
  }
}
export default ShowDetails;
