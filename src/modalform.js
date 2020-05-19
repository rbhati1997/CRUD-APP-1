import React from 'react'
import { Button, Table } from 'react-bootstrap';

let getId;

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contact_number: "",
      dataArr: [],
      created: false,
      update: false,
      edit: true,
      edit1: false,
    }

  }

  onChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  AddDataHandler = () => {
    let name = this.state.name
    let email = this.state.email
    let contact_number = this.state.contact_number
    var arryInstance = this.state.dataArr;
    var numbers = /^[0-9]+$/;
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (name === "" || email==="" || contact_number==="") {
      alert("Please fill all fields.")
    }
    else if (!name.match(/^[a-zA-Z ]+$/)){
      alert("name must be a string.");
    }
    else if(!pattern.test(email) || email ==="") {
      alert("email format is not correct.")
    }       
    else if (!numbers.test(contact_number) && contact_number !== "" ) {
      alert("contact_number must be a number.");
    }
    else if (contact_number.length < 10 || contact_number.length >= 11) {
      alert("Contact number must contain 10 digits.")
    }
    else if (this.state.edit1 === true) {
      arryInstance[getId].name = this.state.name;
      arryInstance[getId].email = this.state.email;
      arryInstance[getId].contact_number = this.state.contact_number;
      arryInstance[getId].edit = true
      this.setState({
      dataArr: arryInstance,
      name: "",
      email:"",
      contact_number:"",
      edit1:false,
    })
    }
    else {
      var user_dict = { "name": name, "email": email, "contact_number": contact_number, edit: true,}
      arryInstance.push(user_dict)
      this.setState({
        dataArr: arryInstance,
        name: "",
        email: "",
        contact_number: "",
        
      })
    }
  }

  DeleteRow = event => {
    var id = event.target.id;
    var arrInstance = this.state.dataArr;
    arrInstance.splice(id, 1)
    this.setState({
        update: false,
        name: "",
        email: "",
        contact_number: "",
        edit1:false })
  }

  Edit = event => {
    getId = event.target.id
    let arrInstance = this.state.dataArr;
    arrInstance[getId].edit = false
    this.setState({
      dataArr: arrInstance,
      name: this.state.dataArr[event.target.id].name,
      email: this.state.dataArr[event.target.id].email,
      contact_number: this.state.dataArr[event.target.id].contact_number,
      update: true,
      edit1: true,
    })
  }


  // UpdateDataHandler = event => {
  //   var arryInstance = this.state.dataArr;
  //   arryInstance[getId].name = this.state.name;
  //   arryInstance[getId].email = this.state.email;
  //   arryInstance[getId].contact_number = this.state.contact_number;
  //   arryInstance[getId].edit = true
  //   this.setState({
  //     dataArr: arryInstance,
  //     name: "",
  //     email: "",
  //     contact_number: "",
  //     update: false
  //   })
  // }

  //............I try onSubmit in form but it refreshing page automatically..............//

  // mySubmitHandler = (event) => {
  //   // event.preventDefault();
  //   let name = this.state.name
  //   let email = this.state.email
  //   let contact_number = this.state.contact_number
  //   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  //   if (name === "" || email==="" || contact_number==="") {
  //     alert("Please fill all fields.")
  //   }
  //   else if (!Number(contact_number) && contact_number !== "" ) {
  //     alert("Your contact_number must be a number.");
  //   }
  //   else if (contact_number.length < 10) {
  //     alert("Contact number must contain 10 digits.")
  //   }
  //   else if(!pattern.test(email) || email ==="") {
  //     alert("email format is not correct.")
  //   }
  //   else if(this.state.created === false) { 
  //     var user_dict = {"name":name, "email":email, "contact_number":contact_number}
  //     var arrInstance = this.state.dataArr;
  //     arrInstance.push(user_dict)
  //     this.setState({
  //       dataArr: arrInstance,
  //       name: "",
  //       email: "",
  //       contact_number: "",
  //       created:true
  //     })
  //   }
  //   else {
  //   var arryInstance = this.state.dataArr;
  //   arryInstance[getId].name = this.state.name;
  //   arryInstance[getId].email = this.state.email;
  //   arryInstance[getId].contact_number = this.state.contact_number;
  //   this.setState({
  //     dataArr: arryInstance,
  //     name: "",
  //     email:"",
  //     contact_number:"",
  //     created:false
  //   })
  //   }
  // }


  render() {

    var mapDataArr = this.state.dataArr.map((e, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{e.name}</td>
          <td>{e.email}</td>
          <td>{e.contact_number}</td>
          <td>
            {e.edit && <Button className="edit_btn" variant="success" id={i} onClick={this.Edit}>Edit</Button>}
            <Button className="delete_btn" variant="danger" id={i} onClick={this.DeleteRow}>Delete</Button>
          </td>
        </tr>
      );
    })

    return (
      <div className="main_div">
        <center>

          <div className="form_div">
            <form onSubmit={this.mySubmitHandler}>
              <div className="name_div">
                <label>Name :</label>
                <input type="text" name='name' id="name_input" placeholder="Enter Name" value={this.state.name} onChange={this.onChangeHandler} />
              </div>
              <div>
                <label>Email :</label>
                <input type="email" name='email' id="email_input" placeholder="Enter Email" value={this.state.email} onChange={this.onChangeHandler} />
              </div>
              <div>
                <label>Contact Number :</label>
                <input type="text" name='contact_number' id="contact_input" placeholder="Enter Contact Number" value={this.state.contact_number} onChange={this.onChangeHandler} />
              </div>
              <Button variant="primary" id="add" onClick={this.AddDataHandler} >Submit</Button>

            </form>
          </div>

          <div className="table_div">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mapDataArr}
              </tbody>
            </Table>
          </div>
        </center>
      </div >
    )
  }
}


export default ModalForm