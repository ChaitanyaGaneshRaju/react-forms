import React, { Component } from "react";
import "./Form.css";
import history from "./history";
import currency from "../../currency.json";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      activeForm: "personal",
      isPerosnalFormActive: "active",
      isBusinessFormActive: "",
      formNumber: 1,
      personal: {
        country: "Afganistan",
        currency: "AFN",
      },
      business: {
        country: "Afganistan",
        currency: "AFN",
      },
    };
  }

  personalFormHandler = () => {
    //changing the active state of the form to personal
    this.setState({
      formNumber: 1,
      activeForm: "personal",
      isPerosnalFormActive: "active",
      isBusinessFormActive: "",
    });
  };

  businessFormHandler = () => {
    //changing the active state of the form to business
    document.getElementById("label-one").innerHTML='1'
    document.getElementById("label-two").innerHTML='2'
    this.setState({
      formNumber: 1,
      activeForm: "business",
      isPerosnalFormActive: "",
      isBusinessFormActive: "active",
    });
    //removing the underline for the personal button
  };

  nextForm = (e) => {
    e.preventDefault();
    //empty object to hold the values entered into the form
    let values = {};
    let elements = {};
    if (this.state.activeForm === "personal") {
      values = this.state.personal;
      if (this.state.formNumber === 1) {
        document.getElementById("label-one").innerHTML='<i class="fas fa-check"></i>'
        elements = document.getElementById("personal-form-one").elements;
      } else if (this.state.formNumber === 2) {
        document.getElementById("label-two").innerHTML='<i class="fas fa-check"></i>'
        elements = document.getElementById("personal-form-two").elements;
      } else if (this.state.formNumber === 3) {
        elements = document.getElementById("personal-form-three").elements;
      }
    } else {
      values = this.state.business;
      if (this.state.formNumber === 1) {
        document.getElementById("label-one").innerHTML='<i class="fas fa-check"></i>'
        elements = document.getElementById("business-form-one").elements;
      } else if (this.state.form === 2) {
        document.getElementById("label-two").innerHTML='<i class="fas fa-check"></i>'
        elements = document.getElementById("business-form-two").elements;
      } else if (this.state.form === 3) {
        elements = document.getElementById("business-form-three").elements;
      }
    }
    //entering the form values into the values object
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].placeholder !== undefined){
        values[elements[i].placeholder] = elements[i].value;
      }
    }
    //updating the state personal object with the values
    if (this.state.formNumber !==3) {
      if (this.state.activeForm === "personal") {
        this.setState({
          formNumber: this.state.formNumber + 1,
          personal: values,
        });
      } else {
        this.setState({
          formNumber: this.state.formNumber + 1,
          business: values,
        });
      }
    } else {
      let params = new URLSearchParams();
      params.append("personal", JSON.stringify(this.state.personal));
      var url = "/display?" + params.toString();
      // window.location.href = url;
      this.setState({ displayInfo: true });
      history.push(url);
    }
  };

  displayCurrency = (e) => {
    e.preventDefault();
    //temporary array for personal information of the state
    let array = this.state.personal;
    //assigning the country into the array
    array.country = e.target.value;

    //assigning the currency of that particular country into the array
    array.currency = [...currency]
      .filter((country) => {
        return country.country === e.target.value;
      })
      .map((country) => {
        return country.currency_code;
      });

    //updating the state
    this.setState({ personal: array });
    
  };

  previousForm = (e) => {
    e.preventDefault();
    this.setState({
      formNumber: this.state.formNumber - 1,
    });
  };

  //Intially loading the personal form
  loadForm = () => {
    
    if (this.state.activeForm === "personal") {
      //loading the first form
      if (this.state.formNumber === 1) {
        return (
          <form
            id="personal-form-one"
            className="personal-form"
            onSubmit={(e) => this.nextForm(e)}
          >
            <input type="text" placeholder="First name" name="" id="" defaultValue={this.state.personal["First name"]}/>
            <input type="text" placeholder="Last name" name="" id="" defaultValue={this.state.personal["Last name"]}/>          
            <input type="email" placeholder="Email" name="" id="" defaultValue={this.state.personal["Email"]}/>
            <input type="phone" placeholder="Phone number" name="" id="" defaultValue={this.state.personal["Phone number"]}/>
            <button className="submit-button" type="submit">
              Next
            </button>
          </form>
        );
      }
      //loading the second form
      else if (this.state.formNumber === 2) {
        return (
          <form
            className="personal-form"
            id="personal-form-two"
            onSubmit={(e) => this.nextForm(e)}
          >
            <select
              name=""
              id="countries"
              onChange={(e) => this.displayCurrency(e)}
            >
              {[...currency].map((country) => (
                <option key={country.country} defaultValue={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
            <label htmlFor="">Currency:{this.state.personal.currency}</label>
            <input type="text" name="" id="" placeholder="IFSC code" defaultValue={this.state.personal["IFSC code"]}/>
            <input type="text" name="" id="" placeholder="Account number" defaultValue={this.state.personal["Account number"]}/>
            <div className="previous-next-buttons">
              <button
                className="previous-button"
                onClick={(e) => this.previousForm(e)}
              >
                Previous
              </button>
              <button className="submit-button" type="submit">
                Next
              </button>
            </div>
          </form>
        );
      }
      //loadding the third form
      else {
        return (
          <form
            className="personal-form"
            id="personal-form-three"
            onSubmit={(e) => this.nextForm(e)}
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="Country"
              defaultValue={this.state.personal.country}
            />
            <input type="text" name="" id="" placeholder="City" defaultValue={this.state.personal["City"]}/>
            <input type="text" name="" id="" placeholder="Postal code" defaultValue={this.state.personal["Postal code"]}/>
            <input type="text" name="" id="" placeholder="Address" defaultValue={this.state.personal["Address"]}/>
            <div className="previous-next-buttons">
              <button
                className="previous-button"
                onClick={(e) => this.previousForm(e)}
              >
                Previous
              </button>
              <button className="submit-button" type="submit">
                Next
              </button>
            </div>
          </form>
        );
      }
    } else {
      if (this.state.formNumber === 1) {
        return (
          <form
            id="business-form-one"
            className="business-form"
            onSubmit={(e) => this.nextForm(e)}
          >
            <input type="text" placeholder="Business name" name="" id="" />
            <input type="text" placeholder="Email" name="" id="" />
            <input type="phone" placeholder="Phone number" name="" id="" />
            <button className="submit-button" type="submit">
              Next
            </button>
          </form>
        );
      } //loading the second form
      else if (this.state.formNumber === 2) {
        return (
          <form
            className="business-form"
            id="business-form-two"
            onSubmit={(e) => this.nextForm(e)}
          >
            <select
              name=""
              id="countries"
              onChange={(e) => this.displayCurrency(e)}
            >
              {[...currency].map((country) => (
                <option key={country.country} defaultValue={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
            <label htmlFor="">Currency:{this.state.personal.currency}</label>
            <input type="text" name="" id="" placeholder="IFSC code" />
            <input type="text" name="" id="" placeholder="Account number" />
            <div className="previous-next-buttons">
              <button
                className="previous-button"
                onClick={(e) => this.previousForm(e)}
              >
                Previous
              </button>
              <button className="submit-button" type="submit">
                Next
              </button>
            </div>
          </form>
        );
      }
      //loadding the third form
      else {
        return (
          <form
            className="business-form"
            id="business-form-three"
            onSubmit={(e) => this.nextForm(e)}
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="Country"
              defaultValue={this.state.personal.country}
            />
            <input type="text" name="" id="" placeholder="City" />
            <input type="text" name="" id="" placeholder="Postal code" />
            <input type="text" name="" id="" placeholder="Address" />
            <div className="previous-next-buttons">
              <button
                className="previous-button"
                onClick={(e) => this.previousForm(e)}
              >
                Previous
              </button>
              <button className="submit-button" type="submit">
                Next
              </button>
            </div>
          </form>
        );
      }
    }
  };

  render() {
    return (
      <div id="form">
        {/* For time line   1------2------3 */}
        <div className="timeline">
          <div className="timeline-progress"></div>
          <div className="timeline-items">
            <div className="timeline-item one">
              <div className="timeline-content">Beneficiary</div>
              <label id="label-one">1</label>
            </div>
            <div className="timeline-item two">
              <div className="timeline-content">Bank details</div>
              <label id="label-two">2</label>
            </div>
            <div className="timeline-item three">
              <div className="timeline-content">Address</div>
              <label id="label-three">3</label>
            </div>
          </div>
        </div>

        {/* For switching buttons either perosnal or business */}
        <div className="switching-buttons">
          <button
            id="personal"
            className={this.state.isPerosnalFormActive}
            onClick={() => this.personalFormHandler()}
          >
            Personal
          </button>
          <button
            id="business"
            className={this.state.isBusinessFormActive}
            onClick={() => this.businessFormHandler()}
          >
            Business
          </button>
        </div>
        {this.loadForm()}
      </div>
    );
  }
}

export default Form;
