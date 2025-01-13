import UserList from "./UserComponent";

export default function Root(props) {
  return <section style={{display:"flex", justifyContent:'center', alignItems:'center', flexDirection:'column', width:'100%', height:'50vh'}}>
    <h1 style={{ marginLeft: '0.5rem' }}>List of items on react app two</h1>
    <UserList />

  </section>;
}
