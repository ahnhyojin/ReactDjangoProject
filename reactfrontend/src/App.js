import React from 'react';
import './App.css';
import api from './api'
import PostView from './Components/PostView'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results)
    //_results.data 아무것도 없는 상태
    this.setState({results: _results.data})
  }

  handlingChange = (event) =>{
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async (event) => {
    event.preventDefault()  //event 고유 기능을 막는다. 특히 submit관련한건 event막는게 user차원에서 좋음 
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료됨!", result)
    this.setState({title:'', content:''})
    this.getPosts()
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  render(){
  return (
    <div className="App">
     <Container maxWidth="lg">
        <div className="PostingSection">
        <Paper className = "PostingPaper">
        <div className="title">
            <h2> 메모장 </h2>
            </div>
            <form className = "PostingForm" onSubmit={this.handlingSubmit}>

            <TextField
            size="small"
            id="standard-multiline-flexible"
            name = "title"
            label="제목"
            value={this.state.title}
            onChange={this.handlingChange}
            //variant="outlined"
            margin = "normal"
            />

            <TextField
              id="standard-multiline-flexible"
              name = "content"
              label="내용"
              multiline
              rows="4"
              value={this.state.content}
              onChange={this.handlingChange}
              variant="outlined"
              margin = "normal"
            />
            <Button className = {'button1'} size="small" color="default" type="submit">저장</Button>
            </form>
        </Paper>   
       </div>
        
        <div className = "ViewSection">
          {
            this.state.results.map((post) =>
            <Card className={'card'}>
              <CardContent>
                <Typography className={'card-title'} color="textSecondary" gutterBottom>
                </Typography>
                <Typography> 
                Num.<PostView key={post.id} id ={post.id} title = {post.title} content = {post.content}/>
                
              </Typography>
            
              </CardContent>
                <CardActions>
                <Button className={'Button2'} color = "primary" size="small" onClick = {(event)=> this.handlingDelete(post.id)}>삭제</Button>
              </CardActions>
             </Card>
            )
          }
        </div> 
      </Container>
    </div>
  );
 }
}

export default App;
