import React from 'react';
import '../styles/App.css'
import ShowDetails from './showDetails';
import 'font-awesome/css/font-awesome.min.css';
import { throwStatement, thisExpression } from '@babel/types';

const data = [
  {
    "lessons": [
      {
        "id": 1,
        "name": "React - basics",
        "description": "This course is going to take you through basics of React.",
        "author": "James White",
        "publishDate": "12/03/2019",
        "duration": "00:03:56",
        "image": "https://cdn.auth0.com/blog/react-js/react.png"
      },
      {
        "id": 2,
        "name": "Vue - learn vue in an hour",
        "description": "This course teaches you how to build a vue application in an hour.",
        "author": "Michael Brown",
        "publishDate": "10/03/2019",
        "duration": "00:00:59",
        "image": "https://vuejs.org/images/logo.png"
      },
      {
        "id": 3,
        "name": "CSS Animations",
        "description": "Learn how to animate anything in CSS",
        "author": "Alan Smith",
        "publishDate": "04/12/2018",
        "duration": "00:02:11",
        "image": "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_960_720.png"
      },
      {
        "id": 4,
        "name": "JS - Zero to hero",
        "description": "Everything you need to know in JS",
        "author": "Sarah Parker",
        "publishDate": "12/03/2019",
        "duration": "01:01:35",
        "image": "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png"
      }
    ]
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: data[0].lessons,
      sortedDate: false,
      showButton: false,
      showRemoveButton: false,
      showError: false,
      cardTotal: 0,
      isLogin: false,
      itemError: false
    }
    this.query = "";
    this.userName = "";
    this.userPassword = "";
    this.cartItems = []
    this.tempCartItems = []
    this.miniCartItems = []

  }

  // handleInputChange = event => {
  //   let tempQuery = event.target.value;
  //   this.searchData();
  //   console.log("tempQuery", tempQuery);
  //   this.query = tempQuery;
  //   if (!this.query) {
  //     this.setState({
  //       showData: data[0].lessons,
  //       sortedDate: false
  //     })
  //   }
  // };

  handleInputChange = event => {
    let tempQuery = event.target.value;
    if (this.state.showData && this.state.showData.length && tempQuery.length >= 2) {
      this.state.showData && this.state.showData.map((item) => {
        if (item.name.toLowerCase().includes(tempQuery.toLowerCase())) {
          this.setState({
            showData: item
          })
        }
      })
    }

    this.query = tempQuery;
    if (!this.query) {
      this.setState({
        showData: data[0].lessons,
        sortedDate: false
      })
    }
  };

  // searchData = () => {
  //   console.log("searchData is called");
  //   if (this.state.showData && this.state.showData.length) {
  //     this.state.showData && this.state.showData.map((item) => {
  //       if (item.name == this.query) {
  //         this.setState({
  //           showData: item,

  //         })
  //       }
  //     })
  //   } else if (!this.query) {
  //     this.setState({
  //       showData: data[0].lessons
  //     })
  //   }
  //   else {
  //     this.setState({
  //       showData: this.state.showData
  //     })
  //   }
  // }

  sortFunctionality = (event) => {
    let selectedValue = event.target.value;

    if (selectedValue == "Date" && this.state.showData && this.state.showData.length) {
      var yy = [];
      this.state.showData.map((item) => {
        let filteredArr = {};
        filteredArr.id = item.id;
        filteredArr.name = item.name;
        filteredArr.description = item.description;
        filteredArr.author = item.author;
        filteredArr.publishDate = new Date(item.publishDate);
        filteredArr.duration = item.duration;
        filteredArr.image = item.image;

        yy.push(filteredArr);
        this.state.showData = yy;
      });
      var sortedActivities = this.state.showData.sort((a, b) => a.publishDate - b.publishDate)
      this.setState({
        sortedDate: true,
        showData: sortedActivities
      })
    }
    if(selectedValue == "Duration" && this.state.showData && this.state.showData.length){
    var temp = this.state.showData.sort((a,b) => a.duration.localeCompare(b.duration))
    this.setState({
      showData: temp
    })
    }
  }

  openModal = (item, id) => {
    var modal = document.getElementById("myModal");

    modal.style.display = "block";
    this.inputUserName.value = "";
    this.inputPassword.value = "";
    this.userName = "";
    this.userPassword = "";
    this.saveUserName = "";
    this.saveUserPassword = ""

    this.setState({
      showError: false,
      itemError: false
    })
  }

  closeModal = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  openMiniCartModal = (item, id) => {
    this.miniCartItems.push(item)
    var modal = document.getElementById("cartModal");
    modal.style.display = "block";

  }

  getUserName = (e) => {
    this.userName = e.target.value;
  }

  getPassword = (e) => {
    this.userPassword = e.target.value;
  }

  loginSubmit = () => {
    var modal = document.getElementById("myModal");

    if (this.state.isLogin === false && this.userName && this.userPassword) {
      this.setState({
        isLogin: true,
      })
      alert("login successfull")
      modal.style.display = "none";
    }

    if (this.cartItems.length == 0 && this.userName && this.userPassword) {
      this.saveUserName = this.userName;
      this.saveUserPassword = this.userPassword;
      this.tempCartItems.map((id) => {
        this.cartItems.push(id);
        this.setState({
          isLogin: true,
        })
        alert("login successfull")
        modal.style.display = "none";
      })
    }
    if (this.userName == "" && this.userPassword == "") {
      this.setState({
        showError: true
      })
    }
  }

  updateCart = (id) => {
    this.setState({
      cardTotal: this.state.cardTotal - 1
    })
    if(this.state.cardTotal === 1){
    document.getElementById("cartModal").style.display ="none";
    }
  }

  handleLanguage = (id) => {
    this.tempCartItems = []
    this.tempCartItems.push(id);

    var modal = document.getElementById("myModal");

    if (this.cartItems.length == 0 && this.state.isLogin === true) {
      this.tempCartItems.map((id) => {
        this.cartItems.push(id);
        this.setState({
          cardTotal: this.state.cardTotal + 1
        })
        alert("Item added to the card");
        modal.style.display = "none";
      })
    }
    else if (this.cartItems.length && this.state.isLogin === true) {
      this.cartItems.map((id) => {
        this.tempCartItems.map((item) => {
          if (this.cartItems.includes(item)) {
            this.setState({
              showRemoveButton: true
            })
            // alert("Item already added in cart")
          }
          else {
            this.tempCartItems.map((id) => {
              this.cartItems.push(id);
              this.setState({
                cardTotal: this.state.cardTotal + 1
              })
              alert("Item added to the card");
              modal.style.display = "none";
            })
          }
        })
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Search for..."
          onChange={this.handleInputChange}
        />
        {/* <button onClick={this.searchData}>Search</button> */}

        <select className="mdb-select md-form" onChange={this.sortFunctionality}>
          <option value="" disabled selected>Sort</option>
          <option value="Date" >Date</option>
          <option value="Duration">Duration</option>
        </select>

        {/* <span className="price">Cart <i className="fa fa-shopping-cart"></i> <b>{this.state.cardTotal}</b></span> */}


        {/* {this.state.cardTotal === 0 ? "" :
          <div id="cartModal" className="miniCartModal">
            <div className="modal-content-miniCart">
              <span>Mini Cart <i className="fa fa-shopping-cart"></i> <b>{this.state.cardTotal}</b></span>
              <ul>
                {this.miniCartItems && this.miniCartItems.map((item) => {
                  return (
                    <>
                      <div className="miniCart-image"></div>
                      <img src={item && item.image} alt={item && item.image} />
                      <span>Name - {item && item.name}</span>
                      <span>Author - {item && item.author}</span>
                      <span>Duration - {item && item.duration}</span>
                    </>
                  )
                })}
              </ul>
            </div>
          </div>
        } */}

         <div id="cartModal" className="miniCartModal">
          <div className="modal-content-miniCart">
            <span>Mini Cart <i className="fa fa-shopping-cart"></i> <b>{this.state.cardTotal}</b></span>  
            <ul>
              {this.miniCartItems && this.miniCartItems.map((item) => {
                return (
                  <>
                  <div className="miniCart-image"></div>
                  <img src={item && item.image} alt={item && item.image} />
                  <span>Name - {item && item.name}</span>
                  <span>Author - {item && item.author}</span>
                  <span>Duration - {item && item.duration}</span>
                  </>
                )
              })}
              </ul>
          </div>
        </div> 

        <div className="container">
          <div className="data-container">
            {this.state.showData && this.state.showData.length
              ?
              <>
                {this.state.showData && this.state.showData.map((item, key) => {
                  return (
                    <ShowDetails
                      onSelectLanguage={this.handleLanguage}
                      item={item}
                      openModal={this.openModal}
                      sortedDate={this.state.sortedDate}
                      cartItems={this.cartItems}
                      isLogin={this.state.isLogin}
                      cardTotal={this.state.cardTotal}
                      showRemoveButton={this.state.showRemoveButton}
                      updateCart={this.updateCart}
                      openMiniCartModal={this.openMiniCartModal}
                      miniCartItems={this.miniCartItems}
                    />
                  )
                })}
              </>
              :
              <>
                <ShowDetails
                  onSelectLanguage={this.handleLanguage}
                  item={this.state.showData}
                  openModal={this.openModal}
                  sortedDate={this.state.sortedDate}
                  cartItems={this.cartItems}
                  isLogin={this.state.isLogin}
                  cardTotal={this.state.cardTotal}
                  showRemoveButton={this.state.showRemoveButton}
                  updateCart={this.updateCart}
                  openMiniCartModal={this.openMiniCartModal}
                  miniCartItems={this.miniCartItems}
                />
              </>
            }
          </div>
        </div>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>&times;</span>
            {this.state.showError == true ? <span className="error">Please Enter the User name and Password</span> : ""}<br></br>
            {this.state.itemError == true ? <span className="error">This item is already added in Cart</span> : ""}<br></br>
            <label className="labelClass"><b>Username</b></label>
            <input ref={el => this.inputUserName = el} type="text" placeholder="Enter Username" id="uname" required onChange={this.getUserName} /><br></br>

            <label className="labelClass"><b>Password</b></label>
            <input ref={el => this.inputPassword = el} type="password" placeholder="Enter Password" id="psw" required onChange={this.getPassword} />
            <button onClick={this.loginSubmit} className="loginButton" type="submit">Login</button>
          </div>
        </div>


      </React.Fragment >
    )
  }
}
export default App;