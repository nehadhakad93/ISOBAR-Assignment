import React from 'react';
import '../styles/App.css'

class ShowDetails extends React.Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.userPassword = "";
    this.state = {
      showButton: false,
      removeButton: false
    }
  }

  showAddButton = (item) => {
    this.props.cartItems.map((id) => {
      if (id == item) {
        this.setState({
          removeButton: true
        })
      }
    })
    this.setState({ showButton: true })
  }
  hideButton = () => {
    this.setState({
      showButton: false,
      removeButton: false
    })
  }

  add = (item, id) => {
    if (this.props.isLogin == true) {
      this.props.onSelectLanguage(id);
    } else {
      this.props.openModal(item, id);
    }
  }

  removeItem = (removeID) => {
    this.props.cartItems.map((id) => {
      if (id == removeID) {
        this.props.cartItems.pop(removeID);
        this.props.updateCart(removeID);
        this.setState({
          showButton: true,
          removeButton: false
        })
      }
    })
  }

  render() {
    const item = this.props.item;
    return (
      <>
        <div id={item.id} className="showData-container" onMouseEnter={() => this.showAddButton(item.id)} onMouseLeave={this.hideButton}>
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
          <button id="myBtn" onClick={() => this.add(item, item.id)} className={this.state.showButton == true ? "showAddButton" : "hideAddButton"}>Add</button>
          <button id="myBtnRmv" onClick={() => this.removeItem(item.id)} className={this.state.removeButton == true ? "showRemoveButton" : "hideRemoveButton"}>Remove</button>

        </div>
      </>
    )
  }
}
export default ShowDetails;
