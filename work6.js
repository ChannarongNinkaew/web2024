const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;

// db.collection("students").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} =>`,doc.data());
//   });
// });

function StudentTable({data, app}){
    var rows = [];
    for(var s of data){      
       rows.push(<tr>
        <td>{s.id}</td>
        <td>{s.title}</td>
        <td>{s.fname}</td>
        <td>{s.lname}</td>
        <td>{s.email}</td>
        </tr>);
    }
    return <table className='table'>
    <tr>
        <td>653380193-5</td>
        <td>นาย</td>
        <td>ชาญณรงค์</td>
        <td>นิลแก้ว</td>
        <td>channarong.ni@kkumail.com</td>
        <td><EditButton std={s} app={app}/></td>  
        <td><DeleteButton std={s} app={app}/></td>   
        </tr>
        { rows }
    </table>
  }

  function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }

  function EditButton({std,app}){
    return <button onClick={()=>app.edit(std)}>แก้ไข</button>
   }

   function DeleteButton({std,app}){    
    return <button onClick={()=>app.delete(std)}>ลบ</button>
  }

  function LoginBox(props){
    const u=props.user;
    const app=props.app;
    if(!u){
       return <div><button onClick={()=>app.google_login()}>Login</button></div>
    }else{
       return <div>{u.email}<button onClick={()=>app.google_logout()}>Logout</button></div>
    }
 }
 


class App extends React.Component {
    title = (
      <Alert variant="info">
        <b>Work6 :</b> Firebase
      </Alert>
    );
    footer = (
      <div>
        By xxxxxxxxxx-x xxxxxxxxxxxxx xxxxxxxxxxxxxx <br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
        stdid:"653380334-3",
        stdtitle:"นาย",
        stdfname:"ชาญณรงค์",
        stdlname:"นิลแก้ว",
        stdemail:"channarong.ni@kkumail.com",
        stdphone:"0973272094",
    }      
    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
            <Card>
            <Card.Header>{this.title}</Card.Header>  
            <LoginBox user={this.state.user} app={this}></LoginBox>
            <Card.Body>
              <Button onClick={()=>this.readData()}>Read Data</Button>
              <Button onClick={()=>this.autoRead()}>Auto Read</Button>
              <div>
              <StudentTable data={this.state.students} app={this}/>  
              </div>
            </Card.Body>
            <Card.Footer>
            <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br/>
            <TextInput label="ID" app={this} value="stdid" style={{width:120}}/>  
            <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{width:100}} />
            <TextInput label="ชื่อ" app={this} value="stdfname" style={{width:120}}/>
            <TextInput label="สกุล" app={this} value="stdlname" style={{width:120}}/>
            <TextInput label="Email" app={this} value="stdemail" style={{width:150}} />        
            <TextInput label="Phone" app={this} value="stdphone" style={{width:120}}/>
            <Button onClick={()=>this.insertData()}>Save</Button>
            </Card.Footer>
            <Card.Footer>{this.footer}</Card.Footer>
          </Card>  
      );
    } 

    readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    }

    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
    }

    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           title : this.state.stdtitle,
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           phone : this.state.stdphone,
           email : this.state.stdemail,
        });
    }

    edit(std){      
        this.setState({
         stdid    : std.id,
         stdtitle : std.title,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdphone : std.phone,
        })
     }

     delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
        }
    }

 
  }
  const firebaseConfig = {
    apiKey: "AIzaSyCVZ3CPzUUeKiGvZC2WVHRr9WjbdPL6DHE",
    authDomain: "web2568-89f19.firebaseapp.com",
    projectId: "web2568-89f19",
    storageBucket: "web2568-89f19.firebasestorage.app",
    messagingSenderId: "138718839584",
    appId: "1:138718839584:web:6149fc04f084a11c6e0d45",
    measurementId: "G-Q69CG4EGD0"
  };


  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
