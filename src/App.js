import React from 'react';
import './App.css';
import ShowDetails from './showDetails';
import 'font-awesome/css/font-awesome.min.css';

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
      showError: false,
      cardTotal: 0,
      cartItems: [],
      isLogin: false,
      itemError: false
    }
    this.query = "";
    this.userName = "";
    this.userPassword = "";
    this.tempCartItems = []
  }

  handleInputChange = event => {
    let tempQuery = event.target.value;
    this.query = tempQuery;
    // if (!this.query && this.state.sortedDate === false) {
    if (!this.query) {
      this.setState({
        showData: data[0].lessons,
      })
    }
  };

  searchData = () => {
    if (this.state.showData && this.state.showData.length) {
      this.state.showData && this.state.showData.map((item) => {
        if (item.name == this.query) {
          this.setState({
            showData: item,

          })
        }
      })
    } else if (!this.query) {
      console.log("when it is blank")
      this.setState({
        showData: data[0].lessons
      })
    }
    else {
      console.log("inside the else")
      this.setState({
        showData: this.state.showData
      })
    }
  }

  sortFunctionality = (event) => {
    let selectedValue = event.target.value;

    if (selectedValue == "Date" && this.state.showData && this.state.showData.length) {
      var yy = [];
      this.state.showData.map((item) => {
        let filteredArr = {};
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
      console.log("sortedActivities", sortedActivities)
      this.setState({
        sortedDate: true,
        showData: sortedActivities
      })
    }
  }

  openModal = (data) => {
    if(this.tempCartItems.length == 0){ 
      this.tempCartItems.push(data);
    } else {
      for(let i =0; i <= this.tempCartItems.length; i++){
 console.log(i)
      }

      }
    
      this.tempCartItems &&  this.tempCartItems.length &&  this.tempCartItems.map((item) => {
      if(item.author == this.state.cartItems.author){
         return false
      } else {
        this.setState({
          cartItems: item
        })
      }
      
    })

    this.setState({
      showError: false,
      itemError: false
    })
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.inputUserName.value = "";
    this.inputPassword.value = "";
  }

  closeModal = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  loginSubmit = () => {
    var modal = document.getElementById("myModal");

    //first time this logic will work
    if (this.inputUserName.value && this.inputPassword.value && this.state.isLogin === false) {
      modal.style.display = "none";
      this.setState({
        cardTotal: this.state.cardTotal + 1,
        isLogin: true,
        cartItems: this.tempCartItems
      })


    } else if (this.inputUserName.value && this.inputPassword.value && this.state.isLogin === true) {
      // if(this.state.cartItems === this.tempCartItems){
        this.setState({
          itemError: true
        })
      // }

    }

    else {
      this.setState({
        showError: true
      })
    }

    // this.tempCartItems = "";
  }

  getUserName = (e) => {
    this.userName = e.target.value;
  }

  getPassword = (e) => {
    this.userPassword = e.target.value;
  }

  render() {
    // console.log("cart", this.state.cartItems)
    // console.log("islogin", this.state.isLogin)

    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Search for..."
          onChange={this.handleInputChange}
        />
        <button onClick={this.searchData}>Search</button>

        <select className="mdb-select md-form" onChange={this.sortFunctionality}>
          <option value="" disabled selected>Sort</option>
          <option value="Date" >Date</option>
        </select>

        <span className="price">Cart <i className="fa fa-shopping-cart"></i> <b>{this.state.cardTotal}</b></span>


        <div className="container">
          <div className="data-container">
            {this.state.showData && this.state.showData.length
              ?
              <>
                {this.state.showData && this.state.showData.map((item, key) => {
                  return (
                    <ShowDetails
                      item={item}
                      openModal={this.openModal}
                      sortedDate={this.state.sortedDate}
                      cartItems={this.state.cartItems}
                    />
                  )
                })}
              </>
              :
              <>
                <ShowDetails
                  item={this.state.showData}
                  openModal={this.openModal}
                  sortedDate={this.state.sortedDate}
                  cartItems={this.state.cartItems}
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