import React from 'react'
import {Button, Table} from 'react-bootstrap';

let getId;

class ModalForm extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      name: "",
      email : "",
      contact_number : "",
      dataArr: [],
      created:false,
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.AddDataHandler = this.AddDataHandler.bind(this);
    this.DeleteRow = this.DeleteRow.bind(this);
    this.Edit = this.Edit.bind(this);
    this.UpdateDataHandler = this.UpdateDataHandler.bind(this);
    // this.mySubmitHandler = this.mySubmitHandler.bind(this);

  }

  onChangeHandler(event){
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  AddDataHandler = (event) => {
    let name = this.state.name
    let email = this.state.email
    let contact_number = this.state.contact_number
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (name === "" || email==="" || contact_number==="") {
      alert("Please fill all fields.")
    }
    else if (!name.match(/^[a-zA-Z]+$/)){
      alert("Your name must be a string.");
    }        
    else if (!Number(contact_number) && contact_number !== "" ) {
      alert("Your contact_number must be a number.");
    }
    else if (contact_number.length < 10 ) {
      alert("Contact number must contain 10 digits.")
    }
    else if(!pattern.test(email) || email ==="") {
      alert("email format is not correct.")
    }
    else { 
      var user_dict = {"name":name, "email":email, "contact_number":contact_number}
      var arrInstance = this.state.dataArr;
      arrInstance.push(user_dict)
      this.setState({
        dataArr: arrInstance,
        name: "",
        email: "",
        contact_number: ""
      })
    }
  }

  DeleteRow(event){
    var id = event.target.id;
    var arrInstance = this.state.dataArr;
    arrInstance.splice(id,1)
    this.setState({
      dataArr: arrInstance,
      name: "",
      email:"",
      contact_number:""
    })
    document.getElementById("add").style.display = "block";
    document.getElementById("update").style.display = "none";
  }

  Edit(event){
    getId = event.target.id
    this.setState({
      name: this.state.dataArr[event.target.id].name,
      email: this.state.dataArr[event.target.id].email,
      contact_number: this.state.dataArr[event.target.id].contact_number,
    })
    document.getElementById(getId).style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("update").style.display = "block";
  }


  UpdateDataHandler(event) {
    var arryInstance = this.state.dataArr;
    arryInstance[getId].name = this.state.name;
    arryInstance[getId].email = this.state.email;
    arryInstance[getId].contact_number = this.state.contact_number;
    this.setState({
      dataArr: arryInstance,
      name: "",
      email:"",
      contact_number:""
    })
    document.getElementById("add").style.display = "block";
    document.getElementById("update").style.display = "none";
    document.getElementById(getId).style.display = "block";


  }

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

    var mapDataArr = this.state.dataArr.map((e, i)=> {
      return (
        <tr>
          <td>{i+1}</td>
          <td>{e.name}</td>
          <td>{e.email}</td>
          <td>{e.contact_number}</td>
          <td>
              <Button className="edit_btn" variant="success" id={i} onClick={this.Edit}>Edit</Button>
              <Button className="delete_btn" variant="danger" id={i} onClick={this.DeleteRow}>Delete</Button>
          </td>
        </tr>
        );
    })

    return(
      <div className="main_div">
        <center>
          
          <div className="form_div">
            <form onSubmit={this.mySubmitHandler}>
                <div className="name_div">
                  <label>Name :</label>
                  <input type="text" name='name' id="name_input" placeholder="Enter Name" value={this.state.name}  onChange={this.onChangeHandler} />
                </div>
                <div>
                  <label>Email :</label>
                  <input type="email" name='email' id="email_input" placeholder="Enter Email" value={this.state.email}  onChange={this.onChangeHandler} />
                </div>
                <div>
                  <label>Contact Number :</label>
                  <input type="text" name='contact_number' id="contact_input" placeholder="Enter Contact Number" value={this.state.contact_number}  onChange={this.onChangeHandler} />
                </div>
                <Button variant="primary" id="add" onClick={this.AddDataHandler} >Add Data</Button>
                <Button variant="primary" id="update" onClick={this.UpdateDataHandler} >Update Data</Button>
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
      </div>
    )
  }
}




// 
// function ModalForm() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const mySubmitHandler = (event) => {
//     event.preventDefault();
//     alert("You are submitting ");
//   }

//   const myChangeHandler = (event) => {
//     // let nam = event.target.name;
//     // let val = event.target.value;
//     // this.setState({[nam]: val});
//   }

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Add User
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Fill User Detail</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>        
//           <form onSubmit={mySubmitHandler}>
//             <input type="text"  id='name' placeholder="name" />
//             <input type="text"  id='email_id' placeholder="email_id" />
//             <input type="text"  id='contact_number' placeholder="contact number" />
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <input type='submit' value='Add data'/>
//           </Modal.Footer>  
//           </form>
//         </Modal.Body>


//       </Modal>
//     </>
//   );
// }

export default ModalForm